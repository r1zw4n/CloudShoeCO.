import React, { useState } from 'react';
import { InventoryItem, ShoeModelId, StoreLocation } from './types';
import { INITIAL_INVENTORY_ITEMS } from './data/inventoryData';
import { Header } from './components/Header';
import { Screen1Showcase } from './components/Screen1Showcase';
import { Screen2Inventory } from './components/Screen2Inventory';

export default function App() {
  // Screen 1: Product Showcase, Screen 2: Inventory & Orders
  const [currentScreen, setCurrentScreen] = useState<1 | 2>(1);

  // Active store manager's location: Bugis, Jewel, or Takashimaya
  const [selectedStore, setSelectedStore] = useState<StoreLocation>('Bugis');

  // Multi-store management mode: manage all three stores together
  const [isAllStores, setIsAllStores] = useState<boolean>(false);

  // Master inventory state initialized from single data file
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY_ITEMS);

  // Optional filter passed when clicking a specific shoe from Screen 1
  const [modelFilterForScreen2, setModelFilterForScreen2] = useState<ShoeModelId | 'ALL'>('ALL');

  // Toggle order checkbox for an inventory item
  const handleToggleOrder = (itemId: string) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const newStatus = !item.isOrdered;
          return {
            ...item,
            isOrdered: newStatus,
            orderedAt: newStatus ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined,
          };
        }
        return item;
      })
    );
  };

  // Quick navigation from Screen 1 to Screen 2 for a specific model
  const handleNavigateToScreen2 = (modelFilter?: ShoeModelId) => {
    if (modelFilter) {
      setModelFilterForScreen2(modelFilter);
    } else {
      setModelFilterForScreen2('ALL');
    }
    setCurrentScreen(2);
  };

  const handleSelectStore = (store: StoreLocation) => {
    setSelectedStore(store);
    setIsAllStores(false);
  };

  const handleToggleAllStores = () => {
    setIsAllStores((prev) => !prev);
    setCurrentScreen(2);
  };

  // Count low stock items (< 5 units) in the currently selected store or across all stores
  const lowStockCount = inventory.filter(
    (item) => (isAllStores ? true : item.store === selectedStore) && item.stock < 5
  ).length;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] font-sans antialiased selection:bg-white selection:text-black">
      {/* Top App Header with Store Switcher and Screen Navigation */}
      <Header
        currentScreen={currentScreen}
        onSelectScreen={setCurrentScreen}
        selectedStore={selectedStore}
        onSelectStore={handleSelectStore}
        lowStockCount={lowStockCount}
        isAllStores={isAllStores}
        onToggleAllStores={handleToggleAllStores}
      />

      {/* Main Screen Content Area */}
      <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
        {currentScreen === 1 ? (
          <Screen1Showcase onNavigateToScreen2={handleNavigateToScreen2} />
        ) : (
          <Screen2Inventory
            inventory={inventory}
            selectedStore={selectedStore}
            isAllStores={isAllStores}
            onToggleOrder={handleToggleOrder}
            initialModelFilter={modelFilterForScreen2}
          />
        )}
      </main>

      {/* Mobile Floating Bottom Bar for Quick Navigation */}
      <div className="fixed bottom-0 inset-x-0 z-20 border-t border-[#2a2a2a] bg-[#111111]/95 px-4 py-2 sm:hidden backdrop-blur-md">
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={() => setCurrentScreen(1)}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg text-center uppercase tracking-wider transition-colors ${
              currentScreen === 1
                ? 'bg-white text-black'
                : 'bg-[#161616] text-[#888] border border-[#262626]'
            }`}
          >
            Manager Overview
          </button>
          <div
            onClick={() => setCurrentScreen(2)}
            className={`flex-1 py-2 px-2 text-xs font-semibold rounded-lg text-center uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
              currentScreen === 2
                ? 'bg-white text-black'
                : 'bg-[#161616] text-[#888] border border-[#262626]'
            }`}
          >
            <span>Stocks & Orders</span>
            {lowStockCount > 0 && (
              <span className="text-[10px]">({lowStockCount} low)</span>
            )}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleToggleAllStores();
              }}
              className={`ml-1 px-1.5 py-0.5 text-[9px] font-black rounded uppercase ${
                isAllStores
                  ? 'bg-amber-400 text-black border border-amber-300 font-extrabold'
                  : currentScreen === 2
                    ? 'bg-[#d8d8d8] text-[#555]'
                    : 'bg-[#2a2a2a] text-[#888]'
              }`}
            >
              ALL STORES
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
