import React from 'react';
import { StoreLocation } from '../types';
import { STORE_MANAGERS, STORES } from '../data/inventoryData';
import { Store, Layers, ClipboardList } from 'lucide-react';

interface HeaderProps {
  currentScreen: 1 | 2;
  onSelectScreen: (screen: 1 | 2) => void;
  selectedStore: StoreLocation;
  onSelectStore: (store: StoreLocation) => void;
  lowStockCount: number;
  isAllStores: boolean;
  onToggleAllStores: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onSelectScreen,
  selectedStore,
  onSelectStore,
  lowStockCount,
  isAllStores,
  onToggleAllStores,
}) => {
  const currentManager = STORE_MANAGERS.find((m) => m.store === selectedStore) || STORE_MANAGERS[0];

  return (
    <header className="sticky top-0 z-30 border-b border-[#2a2a2a] bg-[#111111]/95 backdrop-blur-md">
      <div className="mx-auto max-w-4xl px-4 py-3 sm:px-6">
        {/* Brand and Manager Bar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src="/cloudshoe-logo.svg"
                alt="CloudShoeCO. Logo"
                className="h-10 w-10 object-contain shrink-0 select-none"
                referrerPolicy="no-referrer"
              />
              <div>
                <h1 className="text-xl sm:text-2xl font-light tracking-widest text-white uppercase italic font-serif">
                  CloudShoeCo.
                </h1>
                <p className="text-[10px] text-[#888] tracking-[0.2em] uppercase">
                  INVENTORY MANAGEMENT SYSTEM • <span className="text-[#bbb]">{currentManager.name}</span>
                </p>
              </div>
            </div>

            {/* Mobile Store Selector Quick Badge */}
            <div className="sm:hidden">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#333] bg-[#161616] px-3 py-1 text-xs font-medium text-[#ccc]">
                <Store className="h-3 w-3 text-[#888]" />
                {isAllStores ? 'All Stores' : selectedStore}
              </span>
            </div>
          </div>

          {/* Store Location Selector - 3 Store Managers */}
          <div className="flex items-center justify-between gap-1 rounded-lg border border-[#2a2a2a] bg-[#0d0d0d] p-1">
            <span className="hidden px-2 text-[10px] uppercase tracking-wider text-[#666] sm:inline-block">
              Store:
            </span>
            {STORES.map((store) => {
              const isSelected = !isAllStores && selectedStore === store;
              return (
                <button
                  key={store}
                  id={`store-btn-${store.toLowerCase()}`}
                  onClick={() => onSelectStore(store)}
                  className={`flex-1 min-h-[38px] px-3 py-1 text-xs font-medium rounded-md transition-all ${
                    isSelected
                      ? 'bg-[#222222] text-white border border-[#444] font-semibold shadow-xs'
                      : 'text-[#777] hover:text-[#ddd] hover:bg-[#161616]'
                  }`}
                  aria-pressed={isSelected}
                >
                  {store}
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation Tabs between Screen 1 and Screen 2 */}
        <div className="mt-3 flex gap-2 border-t border-[#222] pt-2.5">
          <button
            id="nav-screen-1-btn"
            onClick={() => onSelectScreen(1)}
            className={`flex flex-1 items-center justify-center gap-2 min-h-[44px] rounded-lg px-4 py-2 text-xs sm:text-sm uppercase tracking-wider font-semibold transition-all ${
              currentScreen === 1
                ? 'bg-white text-black shadow-sm'
                : 'bg-[#161616] text-[#888] border border-[#262626] hover:text-white hover:border-[#333]'
            }`}
          >
            <Layers className="h-4 w-4" />
            <span>Manager Overview</span>
          </button>

          <div
            id="nav-screen-2-tab"
            onClick={() => onSelectScreen(2)}
            className={`flex flex-1 items-center justify-center gap-2 min-h-[44px] rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm uppercase tracking-wider font-semibold transition-all cursor-pointer select-none ${
              currentScreen === 2
                ? 'bg-white text-black shadow-sm'
                : 'bg-[#161616] text-[#888] border border-[#262626] hover:text-white hover:border-[#333]'
            }`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') onSelectScreen(2);
            }}
          >
            <ClipboardList className="h-4 w-4 shrink-0" />
            <span className="whitespace-nowrap">Stocks & Orders</span>
            {lowStockCount > 0 && (
              <span
                className={`ml-1 rounded-full px-2 py-0.5 text-[10px] font-bold tracking-normal shrink-0 ${
                  currentScreen === 2
                    ? 'bg-black text-amber-400'
                    : 'bg-amber-500/20 text-yellow-400 border border-yellow-500/30'
                }`}
              >
                {lowStockCount} low
              </span>
            )}
            <button
              type="button"
              id="btn-all-stores"
              onClick={(e) => {
                e.stopPropagation();
                onToggleAllStores();
                onSelectScreen(2);
              }}
              className={`ml-1.5 sm:ml-2 rounded-md px-2 sm:px-2.5 py-1 text-[10px] sm:text-[11px] font-extrabold tracking-wider uppercase transition-all shadow-xs ${
                isAllStores
                  ? 'bg-amber-400 text-black border border-amber-300 ring-2 ring-amber-400/60 shadow-md brightness-110'
                  : currentScreen === 2
                    ? 'bg-[#d8d8d8] text-[#555] border border-[#bfbfbf] hover:bg-[#cecece] hover:text-black'
                    : 'bg-[#2a2a2a] text-[#888] border border-[#3a3a3a] hover:bg-[#333] hover:text-[#bbb]'
              }`}
              title="Manage inventory for all three stores together"
            >
              ALL STORES
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
