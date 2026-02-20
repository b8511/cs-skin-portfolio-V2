import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import handler from "./priceoverview";

// Test data - CS2 items
const TEST_ITEMS = [
  "Clutch Case",
  "Prisma Case",
  "CS20 Case",
  "CS:GO Weapon Case",
  "Chroma 3 Case",
  "Copenhagen 2024 Nuke Souvenir Package",
  "Copenhagen 2024 Overpass Souvenir Package",
  "Danger Zone Case",
  "Fracture Case",
  "Gamma 2 Case",
  "Horizon Case",
  "Kilowatt Case",
  "Operation Breakout Weapon Case",
  "Operation Broken Fang Case",
  "Operation Hydra Case",
  "Operation Phoenix Weapon Case",
  "Operation Riptide Case",
  "Operation Vanguard Weapon Case",
  "Operation Wildfire Case",
  "Paris 2023 Anubis Souvenir Package",
  "Paris 2023 Mirage Souvenir Package",
  "Paris 2023 Vertigo Souvenir Package",
  "Prisma 2 Case",
  "Recoil Case",
  "Revolution Case",
  "Revolver Case",
  "Rio 2022 Ancient Souvenir Package",
  "Rio 2022 Dust II Souvenir Package",
  "Rio 2022 Mirage Souvenir Package",
  "Rio 2022 Overpass Souvenir Package",
  "Shattered Web Case",
  "Snakebite Case",
  "Spectrum 2 Case",
  "Fever Case",
  "Gallary Case",
];

describe("priceoverview endpoint", () => {
  let mockRequest: Partial<VercelRequest>;
  let mockResponse: Partial<VercelResponse>;
  let statusCode: number;
  let responseData: unknown;

  beforeEach(() => {
    statusCode = 200;
    responseData = null;

    mockRequest = {
      method: "GET",
      query: {},
    };

    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockImplementation((data) => {
        responseData = data;
        return mockResponse;
      }),
    };
  });

  it("should reject requests without item name", async () => {
    mockRequest.query = {};

    await handler(mockRequest as VercelRequest, mockResponse as VercelResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(responseData).toEqual({ error: "Missing item name" });
  });

  it("should reject array query parameters", async () => {
    mockRequest.query = { name: ["Clutch Case", "Prisma Case"] };

    await handler(mockRequest as VercelRequest, mockResponse as VercelResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(responseData).toEqual({ error: "Missing item name" });
  });

  it("should reject non-GET requests", async () => {
    mockRequest.method = "POST";
    mockRequest.query = { name: "Clutch Case" };

    await handler(mockRequest as VercelRequest, mockResponse as VercelResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(405);
    expect(responseData).toEqual({ error: "Method not allowed" });
  });

  describe("with valid item names", () => {
    TEST_ITEMS.forEach((itemName) => {
      it(`should attempt to fetch price for "${itemName}"`, async () => {
        mockRequest.query = { name: itemName };

        // Mock fetch to return a valid response
        global.fetch = vi.fn().mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            success: true,
            lowest_price: "$5.00",
            median_price: "$6.50",
            volume: "1000",
          }),
        } as Response);

        await handler(
          mockRequest as VercelRequest,
          mockResponse as VercelResponse,
        );

        // Should have called fetch with encoded item name
        expect(global.fetch).toHaveBeenCalled();
        const fetchUrl = (global.fetch as any).mock.calls[0][0];
        expect(fetchUrl).toContain(encodeURIComponent(itemName));
        expect(fetchUrl).toContain("appid=730");
      });
    });
  });

  it("should handle Steam API success", async () => {
    mockRequest.query = { name: "Clutch Case" };

    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        lowest_price: "$5.00",
        median_price: "$6.50",
        volume: "1000",
      }),
    } as Response);

    await handler(mockRequest as VercelRequest, mockResponse as VercelResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(responseData).toEqual({
      success: true,
      lowest_price: "$5.00",
      median_price: "$6.50",
      volume: "1000",
    });
  });

  it("should handle Steam API 429 with retries", async () => {
    mockRequest.query = { name: "Clutch Case" };

    // Mock 3 failures then success
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({ ok: false, status: 429 } as Response)
      .mockResolvedValueOnce({ ok: false, status: 429 } as Response)
      .mockResolvedValueOnce({ ok: false, status: 429 } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          lowest_price: "$3.00",
        }),
      } as Response);

    vi.useFakeTimers();

    const handlerPromise = handler(
      mockRequest as VercelRequest,
      mockResponse as VercelResponse,
    );

    await vi.runAllTimersAsync();

    await handlerPromise;

    vi.useRealTimers();

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(global.fetch).toHaveBeenCalledTimes(4);
  });

  it("should return 503 when Steam API fails after all retries", async () => {
    mockRequest.query = { name: "Clutch Case" };

    // Mock all Steam attempts fail
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 429,
    } as Response);

    // Mock setTimeout to skip delays
    vi.useFakeTimers();

    const handlerPromise = handler(
      mockRequest as VercelRequest,
      mockResponse as VercelResponse,
    );

    // Fast-forward all timers
    await vi.runAllTimersAsync();

    await handlerPromise;

    vi.useRealTimers();

    // After 4 attempts (1 initial + 3 retries), should return 503
    expect(mockResponse.status).toHaveBeenCalledWith(503);
    expect(responseData).toEqual({
      error: "Unable to fetch price data from Steam",
    });
  }, 1000);

  it("should URL-encode item names with special characters", async () => {
    const specialItem = "Copenhagen 2024 Nuke Souvenir Package";
    mockRequest.query = { name: specialItem };

    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    } as Response);

    await handler(mockRequest as VercelRequest, mockResponse as VercelResponse);

    const fetchUrl = (global.fetch as any).mock.calls[0][0];
    expect(fetchUrl).toContain(encodeURIComponent(specialItem));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
});
