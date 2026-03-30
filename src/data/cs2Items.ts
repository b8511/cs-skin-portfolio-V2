// CS2 Item database for autocomplete
// Image URLs use csgodatabase.com pattern

export interface CS2Item {
  name: string;
  category:
    | "case"
    | "weapon"
    | "knife"
    | "glove"
    | "sticker"
    | "agent"
    | "other";
}

// Helper to generate image URL — routes through our proxy to avoid hotlink protection
export function getItemImageUrl(itemName: string): string {
  return `/api/itemimage?n=${encodeURIComponent(itemName)}`;
}

// Popular CS2 items - curated list of commonly traded items
export const cs2Items: CS2Item[] = [
  // Cases
  { name: "Clutch Case", category: "case" },
  { name: "Prisma Case", category: "case" },
  { name: "Prisma 2 Case", category: "case" },
  { name: "Danger Zone Case", category: "case" },
  { name: "CS:GO Weapon Case", category: "case" },
  { name: "CS:GO Weapon Case 2", category: "case" },
  { name: "CS:GO Weapon Case 3", category: "case" },
  { name: "eSports 2013 Case", category: "case" },
  { name: "eSports 2013 Winter Case", category: "case" },
  { name: "eSports 2014 Summer Case", category: "case" },
  { name: "Operation Bravo Case", category: "case" },
  { name: "Operation Phoenix Case", category: "case" },
  { name: "Operation Breakout Weapon Case", category: "case" },
  { name: "Operation Vanguard Weapon Case", category: "case" },
  { name: "Operation Wildfire Case", category: "case" },
  { name: "Operation Hydra Case", category: "case" },
  { name: "Operation Riptide Case", category: "case" },
  { name: "Huntsman Weapon Case", category: "case" },
  { name: "Falchion Case", category: "case" },
  { name: "Shadow Case", category: "case" },
  { name: "Revolver Case", category: "case" },
  { name: "Chroma Case", category: "case" },
  { name: "Chroma 2 Case", category: "case" },
  { name: "Chroma 3 Case", category: "case" },
  { name: "Gamma Case", category: "case" },
  { name: "Gamma 2 Case", category: "case" },
  { name: "Glove Case", category: "case" },
  { name: "Spectrum Case", category: "case" },
  { name: "Spectrum 2 Case", category: "case" },
  { name: "Fracture Case", category: "case" },
  { name: "Snakebite Case", category: "case" },
  { name: "Dreams & Nightmares Case", category: "case" },
  { name: "Recoil Case", category: "case" },
  { name: "Revolution Case", category: "case" },
  { name: "Kilowatt Case", category: "case" },
  { name: "Gallery Case", category: "case" },
  { name: "Horizon Case", category: "case" },
  { name: "CS20 Case", category: "case" },
  { name: "Shattered Web Case", category: "case" },
  { name: "Broken Fang Case", category: "case" },
  { name: "Fever Case", category: "case" },

  // Souvenir Packages
  { name: "Copenhagen 2024 Mirage Souvenir Package", category: "case" },
  { name: "Copenhagen 2024 Inferno Souvenir Package", category: "case" },
  { name: "Copenhagen 2024 Nuke Souvenir Package", category: "case" },
  { name: "Copenhagen 2024 Ancient Souvenir Package", category: "case" },
  { name: "Copenhagen 2024 Anubis Souvenir Package", category: "case" },
  { name: "Copenhagen 2024 Vertigo Souvenir Package", category: "case" },
  { name: "Paris 2023 Mirage Souvenir Package", category: "case" },
  { name: "Paris 2023 Inferno Souvenir Package", category: "case" },
  { name: "Paris 2023 Nuke Souvenir Package", category: "case" },
  { name: "Paris 2023 Ancient Souvenir Package", category: "case" },
  { name: "Paris 2023 Anubis Souvenir Package", category: "case" },
  { name: "Paris 2023 Vertigo Souvenir Package", category: "case" },
  { name: "Rio 2022 Mirage Souvenir Package", category: "case" },
  { name: "Rio 2022 Inferno Souvenir Package", category: "case" },
  { name: "Rio 2022 Nuke Souvenir Package", category: "case" },
  { name: "Rio 2022 Overpass Souvenir Package", category: "case" },
  { name: "Rio 2022 Ancient Souvenir Package", category: "case" },
  { name: "Rio 2022 Vertigo Souvenir Package", category: "case" },
  { name: "Antwerp 2022 Mirage Souvenir Package", category: "case" },
  { name: "Antwerp 2022 Inferno Souvenir Package", category: "case" },
  { name: "Antwerp 2022 Nuke Souvenir Package", category: "case" },
  { name: "Antwerp 2022 Overpass Souvenir Package", category: "case" },
  { name: "Antwerp 2022 Ancient Souvenir Package", category: "case" },
  { name: "Antwerp 2022 Vertigo Souvenir Package", category: "case" },
  { name: "Stockholm 2021 Mirage Souvenir Package", category: "case" },
  { name: "Stockholm 2021 Inferno Souvenir Package", category: "case" },
  { name: "Stockholm 2021 Nuke Souvenir Package", category: "case" },
  { name: "Stockholm 2021 Overpass Souvenir Package", category: "case" },
  { name: "Stockholm 2021 Ancient Souvenir Package", category: "case" },
  { name: "Stockholm 2021 Vertigo Souvenir Package", category: "case" },

  // Popular AK-47 Skins
  { name: "AK-47 | Redline (Field-Tested)", category: "weapon" },
  { name: "AK-47 | Redline (Minimal Wear)", category: "weapon" },
  { name: "AK-47 | Asiimov (Field-Tested)", category: "weapon" },
  { name: "AK-47 | Asiimov (Battle-Scarred)", category: "weapon" },
  { name: "AK-47 | Vulcan (Factory New)", category: "weapon" },
  { name: "AK-47 | Vulcan (Minimal Wear)", category: "weapon" },
  { name: "AK-47 | Vulcan (Field-Tested)", category: "weapon" },
  { name: "AK-47 | Case Hardened (Factory New)", category: "weapon" },
  { name: "AK-47 | Case Hardened (Minimal Wear)", category: "weapon" },
  { name: "AK-47 | Case Hardened (Field-Tested)", category: "weapon" },
  { name: "AK-47 | Case Hardened (Well-Worn)", category: "weapon" },
  { name: "AK-47 | Case Hardened (Battle-Scarred)", category: "weapon" },
  { name: "AK-47 | Fire Serpent (Factory New)", category: "weapon" },
  { name: "AK-47 | Fire Serpent (Minimal Wear)", category: "weapon" },
  { name: "AK-47 | Fire Serpent (Field-Tested)", category: "weapon" },
  { name: "AK-47 | Neon Rider (Factory New)", category: "weapon" },
  { name: "AK-47 | Neon Rider (Minimal Wear)", category: "weapon" },
  { name: "AK-47 | Bloodsport (Factory New)", category: "weapon" },
  { name: "AK-47 | Bloodsport (Minimal Wear)", category: "weapon" },
  { name: "AK-47 | The Empress (Factory New)", category: "weapon" },
  { name: "AK-47 | The Empress (Minimal Wear)", category: "weapon" },
  { name: "AK-47 | The Empress (Field-Tested)", category: "weapon" },
  { name: "AK-47 | Phantom Disruptor (Factory New)", category: "weapon" },
  { name: "AK-47 | Ice Coaled (Factory New)", category: "weapon" },
  { name: "AK-47 | Slate (Factory New)", category: "weapon" },
  { name: "AK-47 | Slate (Minimal Wear)", category: "weapon" },
  { name: "AK-47 | Hydroponic (Factory New)", category: "weapon" },
  { name: "AK-47 | Hydroponic (Minimal Wear)", category: "weapon" },
  { name: "AK-47 | Wild Lotus (Factory New)", category: "weapon" },
  { name: "AK-47 | Wild Lotus (Minimal Wear)", category: "weapon" },
  { name: "AK-47 | Gold Arabesque (Factory New)", category: "weapon" },
  { name: "AK-47 | Nightwish (Factory New)", category: "weapon" },
  { name: "AK-47 | Legion of Anubis (Factory New)", category: "weapon" },

  // Popular AWP Skins
  { name: "AWP | Asiimov (Factory New)", category: "weapon" },
  { name: "AWP | Asiimov (Minimal Wear)", category: "weapon" },
  { name: "AWP | Asiimov (Field-Tested)", category: "weapon" },
  { name: "AWP | Asiimov (Battle-Scarred)", category: "weapon" },
  { name: "AWP | Dragon Lore (Factory New)", category: "weapon" },
  { name: "AWP | Dragon Lore (Minimal Wear)", category: "weapon" },
  { name: "AWP | Dragon Lore (Field-Tested)", category: "weapon" },
  { name: "AWP | Dragon Lore (Battle-Scarred)", category: "weapon" },
  { name: "AWP | Lightning Strike (Factory New)", category: "weapon" },
  { name: "AWP | Hyper Beast (Factory New)", category: "weapon" },
  { name: "AWP | Hyper Beast (Minimal Wear)", category: "weapon" },
  { name: "AWP | Hyper Beast (Field-Tested)", category: "weapon" },
  { name: "AWP | Medusa (Factory New)", category: "weapon" },
  { name: "AWP | Medusa (Minimal Wear)", category: "weapon" },
  { name: "AWP | Medusa (Field-Tested)", category: "weapon" },
  { name: "AWP | Gungnir (Factory New)", category: "weapon" },
  { name: "AWP | Gungnir (Minimal Wear)", category: "weapon" },
  { name: "AWP | Containment Breach (Factory New)", category: "weapon" },
  { name: "AWP | Containment Breach (Minimal Wear)", category: "weapon" },
  { name: "AWP | Chromatic Aberration (Factory New)", category: "weapon" },
  { name: "AWP | Chromatic Aberration (Minimal Wear)", category: "weapon" },
  { name: "AWP | Neo-Noir (Factory New)", category: "weapon" },
  { name: "AWP | Neo-Noir (Minimal Wear)", category: "weapon" },
  { name: "AWP | Wildfire (Factory New)", category: "weapon" },
  { name: "AWP | Wildfire (Minimal Wear)", category: "weapon" },
  { name: "AWP | Fever Dream (Factory New)", category: "weapon" },
  { name: "AWP | The Prince (Factory New)", category: "weapon" },
  { name: "AWP | Graphite (Factory New)", category: "weapon" },
  { name: "AWP | BOOM (Factory New)", category: "weapon" },
  { name: "AWP | BOOM (Minimal Wear)", category: "weapon" },

  // Popular M4A4 Skins
  { name: "M4A4 | Howl (Factory New)", category: "weapon" },
  { name: "M4A4 | Howl (Minimal Wear)", category: "weapon" },
  { name: "M4A4 | Howl (Field-Tested)", category: "weapon" },
  { name: "M4A4 | Asiimov (Factory New)", category: "weapon" },
  { name: "M4A4 | Asiimov (Field-Tested)", category: "weapon" },
  { name: "M4A4 | Poseidon (Factory New)", category: "weapon" },
  { name: "M4A4 | Poseidon (Minimal Wear)", category: "weapon" },
  { name: "M4A4 | The Emperor (Factory New)", category: "weapon" },
  { name: "M4A4 | The Emperor (Minimal Wear)", category: "weapon" },
  { name: "M4A4 | Neo-Noir (Factory New)", category: "weapon" },
  { name: "M4A4 | Neo-Noir (Minimal Wear)", category: "weapon" },
  { name: "M4A4 | Desolate Space (Factory New)", category: "weapon" },
  { name: "M4A4 | In Living Color (Factory New)", category: "weapon" },
  { name: "M4A4 | Temukau (Factory New)", category: "weapon" },
  { name: "M4A4 | Spider Lily (Factory New)", category: "weapon" },

  // Popular M4A1-S Skins
  { name: "M4A1-S | Hot Rod (Factory New)", category: "weapon" },
  { name: "M4A1-S | Hyper Beast (Factory New)", category: "weapon" },
  { name: "M4A1-S | Hyper Beast (Minimal Wear)", category: "weapon" },
  { name: "M4A1-S | Chantico's Fire (Factory New)", category: "weapon" },
  { name: "M4A1-S | Golden Coil (Factory New)", category: "weapon" },
  { name: "M4A1-S | Decimator (Factory New)", category: "weapon" },
  { name: "M4A1-S | Printstream (Factory New)", category: "weapon" },
  { name: "M4A1-S | Printstream (Minimal Wear)", category: "weapon" },
  { name: "M4A1-S | Welcome to the Jungle (Factory New)", category: "weapon" },
  { name: "M4A1-S | Blue Phosphor (Factory New)", category: "weapon" },
  { name: "M4A1-S | Player Two (Factory New)", category: "weapon" },
  { name: "M4A1-S | Emphorosaur-S (Factory New)", category: "weapon" },

  // Popular Desert Eagle Skins
  { name: "Desert Eagle | Blaze (Factory New)", category: "weapon" },
  { name: "Desert Eagle | Kumicho Dragon (Factory New)", category: "weapon" },
  { name: "Desert Eagle | Printstream (Factory New)", category: "weapon" },
  { name: "Desert Eagle | Code Red (Factory New)", category: "weapon" },
  { name: "Desert Eagle | Mecha Industries (Factory New)", category: "weapon" },
  { name: "Desert Eagle | Golden Koi (Factory New)", category: "weapon" },
  { name: "Desert Eagle | Fennec Fox (Factory New)", category: "weapon" },
  { name: "Desert Eagle | Ocean Drive (Factory New)", category: "weapon" },

  // Popular USP-S Skins
  { name: "USP-S | Kill Confirmed (Factory New)", category: "weapon" },
  { name: "USP-S | Kill Confirmed (Minimal Wear)", category: "weapon" },
  { name: "USP-S | Neo-Noir (Factory New)", category: "weapon" },
  { name: "USP-S | Printstream (Factory New)", category: "weapon" },
  { name: "USP-S | The Traitor (Factory New)", category: "weapon" },
  { name: "USP-S | Cortex (Factory New)", category: "weapon" },
  { name: "USP-S | Caiman (Factory New)", category: "weapon" },
  { name: "USP-S | Cyrex (Factory New)", category: "weapon" },

  // Popular Glock-18 Skins
  { name: "Glock-18 | Fade (Factory New)", category: "weapon" },
  { name: "Glock-18 | Dragon Tattoo (Factory New)", category: "weapon" },
  { name: "Glock-18 | Water Elemental (Factory New)", category: "weapon" },
  { name: "Glock-18 | Bullet Queen (Factory New)", category: "weapon" },
  { name: "Glock-18 | Gamma Doppler (Factory New)", category: "weapon" },
  { name: "Glock-18 | Vogue (Factory New)", category: "weapon" },
  { name: "Glock-18 | Wasteland Rebel (Factory New)", category: "weapon" },

  // Popular Knives
  { name: "★ Karambit | Doppler (Factory New)", category: "knife" },
  { name: "★ Karambit | Fade (Factory New)", category: "knife" },
  { name: "★ Karambit | Tiger Tooth (Factory New)", category: "knife" },
  { name: "★ Karambit | Marble Fade (Factory New)", category: "knife" },
  { name: "★ Karambit | Gamma Doppler (Factory New)", category: "knife" },
  { name: "★ Karambit | Crimson Web (Factory New)", category: "knife" },
  { name: "★ Karambit | Crimson Web (Minimal Wear)", category: "knife" },
  { name: "★ Karambit | Slaughter (Factory New)", category: "knife" },
  { name: "★ Karambit | Case Hardened (Factory New)", category: "knife" },
  { name: "★ Karambit | Autotronic (Factory New)", category: "knife" },
  { name: "★ Karambit | Lore (Factory New)", category: "knife" },
  { name: "★ M9 Bayonet | Doppler (Factory New)", category: "knife" },
  { name: "★ M9 Bayonet | Fade (Factory New)", category: "knife" },
  { name: "★ M9 Bayonet | Tiger Tooth (Factory New)", category: "knife" },
  { name: "★ M9 Bayonet | Marble Fade (Factory New)", category: "knife" },
  { name: "★ M9 Bayonet | Gamma Doppler (Factory New)", category: "knife" },
  { name: "★ M9 Bayonet | Crimson Web (Factory New)", category: "knife" },
  { name: "★ M9 Bayonet | Slaughter (Factory New)", category: "knife" },
  { name: "★ M9 Bayonet | Lore (Factory New)", category: "knife" },
  { name: "★ Butterfly Knife | Doppler (Factory New)", category: "knife" },
  { name: "★ Butterfly Knife | Fade (Factory New)", category: "knife" },
  { name: "★ Butterfly Knife | Tiger Tooth (Factory New)", category: "knife" },
  { name: "★ Butterfly Knife | Marble Fade (Factory New)", category: "knife" },
  {
    name: "★ Butterfly Knife | Gamma Doppler (Factory New)",
    category: "knife",
  },
  { name: "★ Butterfly Knife | Crimson Web (Factory New)", category: "knife" },
  { name: "★ Butterfly Knife | Slaughter (Factory New)", category: "knife" },
  { name: "★ Butterfly Knife | Lore (Factory New)", category: "knife" },
  { name: "★ Talon Knife | Doppler (Factory New)", category: "knife" },
  { name: "★ Talon Knife | Fade (Factory New)", category: "knife" },
  { name: "★ Talon Knife | Tiger Tooth (Factory New)", category: "knife" },
  { name: "★ Talon Knife | Marble Fade (Factory New)", category: "knife" },
  { name: "★ Bayonet | Doppler (Factory New)", category: "knife" },
  { name: "★ Bayonet | Fade (Factory New)", category: "knife" },
  { name: "★ Bayonet | Tiger Tooth (Factory New)", category: "knife" },
  { name: "★ Bayonet | Marble Fade (Factory New)", category: "knife" },
  { name: "★ Flip Knife | Doppler (Factory New)", category: "knife" },
  { name: "★ Flip Knife | Fade (Factory New)", category: "knife" },
  { name: "★ Flip Knife | Tiger Tooth (Factory New)", category: "knife" },
  { name: "★ Flip Knife | Marble Fade (Factory New)", category: "knife" },
  { name: "★ Gut Knife | Doppler (Factory New)", category: "knife" },
  { name: "★ Gut Knife | Fade (Factory New)", category: "knife" },
  { name: "★ Huntsman Knife | Doppler (Factory New)", category: "knife" },
  { name: "★ Huntsman Knife | Fade (Factory New)", category: "knife" },
  { name: "★ Falchion Knife | Doppler (Factory New)", category: "knife" },
  { name: "★ Falchion Knife | Fade (Factory New)", category: "knife" },
  { name: "★ Shadow Daggers | Doppler (Factory New)", category: "knife" },
  { name: "★ Shadow Daggers | Fade (Factory New)", category: "knife" },
  { name: "★ Bowie Knife | Doppler (Factory New)", category: "knife" },
  { name: "★ Bowie Knife | Fade (Factory New)", category: "knife" },
  { name: "★ Ursus Knife | Doppler (Factory New)", category: "knife" },
  { name: "★ Ursus Knife | Fade (Factory New)", category: "knife" },
  { name: "★ Navaja Knife | Doppler (Factory New)", category: "knife" },
  { name: "★ Stiletto Knife | Doppler (Factory New)", category: "knife" },
  { name: "★ Paracord Knife | Fade (Factory New)", category: "knife" },
  { name: "★ Survival Knife | Fade (Factory New)", category: "knife" },
  { name: "★ Nomad Knife | Fade (Factory New)", category: "knife" },
  { name: "★ Skeleton Knife | Fade (Factory New)", category: "knife" },
  { name: "★ Classic Knife | Fade (Factory New)", category: "knife" },
  { name: "★ Kukri Knife | Doppler (Factory New)", category: "knife" },
  { name: "★ Kukri Knife | Fade (Factory New)", category: "knife" },

  // Popular Gloves
  { name: "★ Sport Gloves | Pandora's Box (Factory New)", category: "glove" },
  { name: "★ Sport Gloves | Pandora's Box (Minimal Wear)", category: "glove" },
  { name: "★ Sport Gloves | Pandora's Box (Field-Tested)", category: "glove" },
  { name: "★ Sport Gloves | Superconductor (Factory New)", category: "glove" },
  { name: "★ Sport Gloves | Superconductor (Minimal Wear)", category: "glove" },
  { name: "★ Sport Gloves | Vice (Factory New)", category: "glove" },
  { name: "★ Sport Gloves | Vice (Minimal Wear)", category: "glove" },
  { name: "★ Sport Gloves | Slingshot (Factory New)", category: "glove" },
  { name: "★ Sport Gloves | Slingshot (Minimal Wear)", category: "glove" },
  {
    name: "★ Specialist Gloves | Crimson Kimono (Factory New)",
    category: "glove",
  },
  {
    name: "★ Specialist Gloves | Crimson Kimono (Minimal Wear)",
    category: "glove",
  },
  { name: "★ Specialist Gloves | Fade (Factory New)", category: "glove" },
  { name: "★ Specialist Gloves | Fade (Minimal Wear)", category: "glove" },
  {
    name: "★ Specialist Gloves | Marble Fade (Factory New)",
    category: "glove",
  },
  { name: "★ Driver Gloves | King Snake (Factory New)", category: "glove" },
  { name: "★ Driver Gloves | King Snake (Minimal Wear)", category: "glove" },
  { name: "★ Moto Gloves | Spearmint (Factory New)", category: "glove" },
  { name: "★ Moto Gloves | Spearmint (Minimal Wear)", category: "glove" },
  { name: "★ Hand Wraps | Cobalt Skulls (Factory New)", category: "glove" },
  { name: "★ Hand Wraps | Cobalt Skulls (Minimal Wear)", category: "glove" },
  { name: "★ Hydra Gloves | Case Hardened (Factory New)", category: "glove" },
  { name: "★ Hydra Gloves | Emerald (Factory New)", category: "glove" },

  // Sticker Capsules
  { name: "Copenhagen 2024 Challengers Sticker Capsule", category: "sticker" },
  { name: "Copenhagen 2024 Contenders Sticker Capsule", category: "sticker" },
  { name: "Copenhagen 2024 Legends Sticker Capsule", category: "sticker" },
  { name: "Copenhagen 2024 Champions Autograph Capsule", category: "sticker" },
  { name: "Paris 2023 Challengers Sticker Capsule", category: "sticker" },
  { name: "Paris 2023 Contenders Sticker Capsule", category: "sticker" },
  { name: "Paris 2023 Legends Sticker Capsule", category: "sticker" },
  { name: "Paris 2023 Champions Autograph Capsule", category: "sticker" },
  { name: "Rio 2022 Challengers Sticker Capsule", category: "sticker" },
  { name: "Rio 2022 Contenders Sticker Capsule", category: "sticker" },
  { name: "Rio 2022 Legends Sticker Capsule", category: "sticker" },
  { name: "Rio 2022 Champions Autograph Capsule", category: "sticker" },
  { name: "Antwerp 2022 Challengers Sticker Capsule", category: "sticker" },
  { name: "Antwerp 2022 Contenders Sticker Capsule", category: "sticker" },
  { name: "Antwerp 2022 Legends Sticker Capsule", category: "sticker" },
  { name: "Antwerp 2022 Champions Autograph Capsule", category: "sticker" },
  { name: "Stockholm 2021 Challengers Sticker Capsule", category: "sticker" },
  { name: "Stockholm 2021 Contenders Sticker Capsule", category: "sticker" },
  { name: "Stockholm 2021 Legends Sticker Capsule", category: "sticker" },

  // Other popular items
  { name: "StatTrak™ Music Kit | Austin Wintory, Bachram", category: "other" },
  { name: "Music Kit | Austin Wintory, Bachram", category: "other" },
  { name: "Music Kit | Skog, Metal", category: "other" },
  { name: "Music Kit | Daniel Sadowski, The 8-Bit Kit", category: "other" },
];

// Get all item names for simple autocomplete
export const cs2ItemNames: string[] = cs2Items.map((item) => item.name);

// Search items by partial name match
export function searchItems(query: string, limit: number = 10): CS2Item[] {
  if (!query || query.length < 2) return [];

  const lowerQuery = query.toLowerCase();

  // First, exact prefix matches
  const prefixMatches = cs2Items.filter((item) =>
    item.name.toLowerCase().startsWith(lowerQuery),
  );

  // Then, contains matches
  const containsMatches = cs2Items.filter(
    (item) =>
      !item.name.toLowerCase().startsWith(lowerQuery) &&
      item.name.toLowerCase().includes(lowerQuery),
  );

  // Combine and limit
  return [...prefixMatches, ...containsMatches].slice(0, limit);
}
