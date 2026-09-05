export type StoreLocation = 'Bugis' | 'Jewel' | 'Takashimaya';

export type ShoeModelId = 'CloudWALK' | 'CloudRUN';

export type ShoeSize = 'US 8' | 'US 10' | 'US 12';

export interface ShoeModelInfo {
  id: ShoeModelId;
  name: string;
  category: string; // "LifeStyle and Walking" or "Running and Sports"
  tagline: string;
  description: string;
  accentColor: string;
  badgeBg: string;
  badgeText: string;
  price: string;
}

export interface InventoryItem {
  id: string;
  store: StoreLocation;
  model: ShoeModelId;
  size: ShoeSize;
  stock: number;
  isOrdered: boolean;
  orderedAt?: string;
}

export interface StoreManager {
  store: StoreLocation;
  name: string;
  role: string;
  contactNumber: string;
}
