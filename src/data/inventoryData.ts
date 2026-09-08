import { ShoeModelInfo, StoreManager, InventoryItem, ShoeSize, StoreLocation } from '../types';

export const STORES: StoreLocation[] = ['Bugis', 'Jewel', 'Takashimaya'];

export const SHOE_SIZES: ShoeSize[] = ['US 8', 'US 10', 'US 12'];

export const STORE_MANAGERS: StoreManager[] = [
  {
    store: 'Bugis',
    name: 'Marcus Chen',
    role: 'Store Manager – Bugis Junction',
    contactNumber: '+65 6338 xxxx',
  },
  {
    store: 'Jewel',
    name: 'Sarah Tan',
    role: 'Store Manager – Jewel Changi',
    contactNumber: '+65 6214 xxxx',
  },
  {
    store: 'Takashimaya',
    name: 'Priya Sharma',
    role: 'Store Manager – Ngee Ann City',
    contactNumber: '+65 6735 xxxx',
  },
];

export const SHOE_MODELS: ShoeModelInfo[] = [
  {
    id: 'CloudWALK',
    name: 'CloudWALK',
    category: 'LifeStyle and Walking',
    tagline: 'Engineered for all-day urban comfort and lightweight stride',
    description: 'Featuring adaptive cloud-pod foam cushioning and breathable recycled mesh designed specifically for city commuting and daily lifestyle walking.',
    accentColor: '#2563eb', // royal blue
    badgeBg: 'bg-blue-50',
    badgeText: 'text-blue-700 border-blue-200',
    price: '$189 SGD',
  },
  {
    id: 'CloudRUN',
    name: 'CloudRUN',
    category: 'Running and Sports',
    tagline: 'High-rebound propulsion and structural support for distance runners',
    description: 'Equipped with dual-density energy return pods, carbon-reinforced speedboard, and reinforced heel lockdown for athletic endurance and daily runs.',
    accentColor: '#ea580c', // athletic orange
    badgeBg: 'bg-orange-50',
    badgeText: 'text-orange-700 border-orange-200',
    price: '$229 SGD',
  },
];

// Single source of invented inventory records across 3 stores, 2 models, and 3 sizes
export const INITIAL_INVENTORY_ITEMS: InventoryItem[] = [
  // --- Bugis Store ---
  { id: 'BUG-CW-8', store: 'Bugis', model: 'CloudWALK', size: 'US 8', stock: 12, isOrdered: false },
  { id: 'BUG-CW-10', store: 'Bugis', model: 'CloudWALK', size: 'US 10', stock: 3, isOrdered: false },  // < 5 (Yellow)
  { id: 'BUG-CW-12', store: 'Bugis', model: 'CloudWALK', size: 'US 12', stock: 0, isOrdered: false },  // 0 (Red)
  { id: 'BUG-CR-8', store: 'Bugis', model: 'CloudRUN', size: 'US 8', stock: 2, isOrdered: false },   // < 5 (Yellow)
  { id: 'BUG-CR-10', store: 'Bugis', model: 'CloudRUN', size: 'US 10', stock: 7, isOrdered: false },  // > 5 (Green)
  { id: 'BUG-CR-12', store: 'Bugis', model: 'CloudRUN', size: 'US 12', stock: 1, isOrdered: false },  // < 5 (Yellow)

  // --- Jewel Store ---
  { id: 'JWL-CW-8', store: 'Jewel', model: 'CloudWALK', size: 'US 8', stock: 4, isOrdered: false },   // < 5 (Yellow)
  { id: 'JWL-CW-10', store: 'Jewel', model: 'CloudWALK', size: 'US 10', stock: 9, isOrdered: false },  // > 5 (Green)
  { id: 'JWL-CW-12', store: 'Jewel', model: 'CloudWALK', size: 'US 12', stock: 2, isOrdered: false },  // < 5 (Yellow)
  { id: 'JWL-CR-8', store: 'Jewel', model: 'CloudRUN', size: 'US 8', stock: 0, isOrdered: false },   // 0 (Red)
  { id: 'JWL-CR-10', store: 'Jewel', model: 'CloudRUN', size: 'US 10', stock: 4, isOrdered: false },  // < 5 (Yellow)
  { id: 'JWL-CR-12', store: 'Jewel', model: 'CloudRUN', size: 'US 12', stock: 8, isOrdered: false },  // > 5 (Green)

  // --- Takashimaya Store ---
  { id: 'TAK-CW-8', store: 'Takashimaya', model: 'CloudWALK', size: 'US 8', stock: 0, isOrdered: false },  // 0 (Red)
  { id: 'TAK-CW-10', store: 'Takashimaya', model: 'CloudWALK', size: 'US 10', stock: 6, isOrdered: false }, // > 5 (Green)
  { id: 'TAK-CW-12', store: 'Takashimaya', model: 'CloudWALK', size: 'US 12', stock: 11, isOrdered: false },// > 5 (Green)
  { id: 'TAK-CR-8', store: 'Takashimaya', model: 'CloudRUN', size: 'US 8', stock: 3, isOrdered: false },  // < 5 (Yellow)
  { id: 'TAK-CR-10', store: 'Takashimaya', model: 'CloudRUN', size: 'US 10', stock: 0, isOrdered: false }, // 0 (Red)
  { id: 'TAK-CR-12', store: 'Takashimaya', model: 'CloudRUN', size: 'US 12', stock: 5, isOrdered: false }, // 5 pairs (Yellow/threshold)
];
