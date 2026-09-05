import React, { useState, useMemo } from 'react';
import { InventoryItem, ShoeModelId, ShoeSize, StoreLocation } from '../types';
import { SHOE_MODELS, SHOE_SIZES } from '../data/inventoryData';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  PackageCheck, 
  Filter, 
  ShoppingBag,
  RotateCcw
} from 'lucide-react';

interface Screen2InventoryProps {
  inventory: InventoryItem[];
  selectedStore: StoreLocation;
  onToggleOrder: (itemId: string) => void;
  onResetOrders?: () => void;
  initialModelFilter?: ShoeModelId | 'ALL';
}

export const Screen2Inventory: React.FC<Screen2InventoryProps> = ({
  inventory,
  selectedStore,
  onToggleOrder,
  initialModelFilter = 'ALL',
}) => {
  const [modelFilter, setModelFilter] = useState<ShoeModelId | 'ALL'>(initialModelFilter);
  const [sizeFilter, setSizeFilter] = useState<ShoeSize | 'ALL'>('ALL');
  const [stockStatusFilter, setStockStatusFilter] = useState<'ALL' | 'LOW_ONLY' | 'ORDERED_ONLY'>('ALL');

  // Filter items based on active store, model, size, and status
  const filteredItems = useMemo(() => {
    return inventory.filter((item) => {
      // Must match active store
      if (item.store !== selectedStore) return false;

      // Filter by model
      if (modelFilter !== 'ALL' && item.model !== modelFilter) return false;

      // Filter by size
      if (sizeFilter !== 'ALL' && item.size !== sizeFilter) return false;

      // Filter by status
      if (stockStatusFilter === 'LOW_ONLY') {
        return item.stock < 5; // both yellow (<5) and red (0)
      }
      if (stockStatusFilter === 'ORDERED_ONLY') {
        return item.isOrdered;
      }

      return true;
    });
  }, [inventory, selectedStore, modelFilter, sizeFilter, stockStatusFilter]);

  // Statistics for the current store
  const storeItems = useMemo(() => {
    return inventory.filter((item) => item.store === selectedStore);
  }, [inventory, selectedStore]);

  const stats = useMemo(() => {
    let greenCount = 0; // > 5
    let yellowCount = 0; // < 5 and > 0
    let redCount = 0; // 0
    let orderedCount = 0;

    storeItems.forEach((item) => {
      if (item.stock === 0) {
        redCount++;
      } else if (item.stock < 5) {
        yellowCount++;
      } else {
        greenCount++;
      }

      if (item.isOrdered) {
        orderedCount++;
      }
    });

    return { greenCount, yellowCount, redCount, orderedCount, total: storeItems.length };
  }, [storeItems]);

  // Helper for color coding tabs strictly according to Sophisticated Dark specifications:
  // > 5: Green
  // < 5 and > 0: Yellow
  // 0: Red
  const getTabStyle = (stock: number) => {
    if (stock === 0) {
      return {
        headerBg: 'bg-red-600/10 border-b border-[#222]',
        badge: 'bg-red-600/20 text-red-500 border border-red-500/30 font-bold',
        label: '0 IN STOCK',
        statusType: 'red',
        alertText: 'Out of Stock – Order Required',
        alertColor: 'text-red-400',
        icon: <XCircle className="h-4 w-4 text-red-500 shrink-0" />,
      };
    }
    if (stock < 5) {
      return {
        headerBg: 'bg-yellow-500/10 border-b border-[#222]',
        badge: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 font-bold',
        label: `${stock} IN STOCK (LOW)`,
        statusType: 'yellow',
        alertText: 'Low Stock (<5) – Reorder Needed',
        alertColor: 'text-yellow-400',
        icon: <AlertTriangle className="h-4 w-4 text-yellow-400 shrink-0" />,
      };
    }
    return {
      headerBg: 'bg-green-500/10 border-b border-[#222]',
      badge: 'bg-green-500/20 text-green-400 border border-green-500/30 font-bold',
      label: `${stock} IN STOCK`,
      statusType: 'green',
      alertText: 'Optimal Stock (>5)',
      alertColor: 'text-green-400',
      icon: <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0" />,
    };
  };

  return (
    <section className="space-y-6 pb-12">
      {/* Overview & Header Bar */}
      <div className="rounded-2xl border border-[#2a2a2a] bg-[#111111] p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif italic text-white">
              Inventory Matrix
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#888]">
              Real-time stock availability for <span className="text-white underline underline-offset-4">{selectedStore} Store</span>
            </p>
          </div>

          {/* Legend dots */}
          <div className="flex flex-wrap gap-4 text-[10px] sm:text-[11px] uppercase tracking-widest text-[#aaa]">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-green-500 shadow-xs shadow-green-500/50" />
              <span>Optimal (&gt;5)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-yellow-500 shadow-xs shadow-yellow-500/50" />
              <span>Low (&lt;5)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-red-600 shadow-xs shadow-red-600/50" />
              <span>Out (0)</span>
            </div>
          </div>
        </div>

        {/* Metric Overview Counters */}
        <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          <div className="rounded-xl border border-[#222] bg-[#161616] p-3 sm:p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#888]">
              Optimal (&gt;5)
            </p>
            <p className="mt-1 text-xl font-serif italic font-bold text-green-400">
              {stats.greenCount}
            </p>
          </div>

          <div className="rounded-xl border border-[#222] bg-[#161616] p-3 sm:p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#888]">
              Low Stock (&lt;5)
            </p>
            <p className="mt-1 text-xl font-serif italic font-bold text-yellow-400">
              {stats.yellowCount}
            </p>
          </div>

          <div className="rounded-xl border border-[#222] bg-[#161616] p-3 sm:p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#888]">
              Out of Stock (0)
            </p>
            <p className="mt-1 text-xl font-serif italic font-bold text-red-500">
              {stats.redCount}
            </p>
          </div>

          <div className="rounded-xl border border-[#222] bg-[#161616] p-3 sm:p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#888]">
              Orders Placed
            </p>
            <p className="mt-1 text-xl font-serif italic font-bold text-white">
              {stats.orderedCount} <span className="text-xs font-sans text-[#666]">/ {stats.total}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Quick Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#262626] bg-[#111111] p-3.5 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#666] mr-1">
            <Filter className="h-3 w-3" />
            <span>Filters:</span>
          </div>

          {/* Model Filter */}
          <div className="flex rounded-lg border border-[#222] bg-[#0d0d0d] p-0.5">
            <button
              id="filter-model-all"
              onClick={() => setModelFilter('ALL')}
              className={`px-2.5 py-1 text-xs rounded transition-all ${
                modelFilter === 'ALL' ? 'bg-[#262626] text-white font-semibold' : 'text-[#777] hover:text-white'
              }`}
            >
              All Shoes
            </button>
            <button
              id="filter-model-cloudwalk"
              onClick={() => setModelFilter('CloudWALK')}
              className={`px-2.5 py-1 text-xs rounded transition-all ${
                modelFilter === 'CloudWALK' ? 'bg-[#262626] text-white font-semibold' : 'text-[#777] hover:text-white'
              }`}
            >
              CloudWALK
            </button>
            <button
              id="filter-model-cloudrun"
              onClick={() => setModelFilter('CloudRUN')}
              className={`px-2.5 py-1 text-xs rounded transition-all ${
                modelFilter === 'CloudRUN' ? 'bg-[#262626] text-white font-semibold' : 'text-[#777] hover:text-white'
              }`}
            >
              CloudRUN
            </button>
          </div>

          {/* Size Filter */}
          <div className="flex rounded-lg border border-[#222] bg-[#0d0d0d] p-0.5">
            <button
              id="filter-size-all"
              onClick={() => setSizeFilter('ALL')}
              className={`px-2 py-1 text-xs rounded transition-all ${
                sizeFilter === 'ALL' ? 'bg-[#262626] text-white font-semibold' : 'text-[#777] hover:text-white'
              }`}
            >
              All Sizes
            </button>
            {SHOE_SIZES.map((sz) => (
              <button
                key={sz}
                id={`filter-size-${sz.replace(/\s+/g, '-').toLowerCase()}`}
                onClick={() => setSizeFilter(sz)}
                className={`px-2 py-1 text-xs rounded transition-all ${
                  sizeFilter === sz ? 'bg-[#262626] text-white font-semibold' : 'text-[#777] hover:text-white'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>

          {/* Stock Condition Filter */}
          <div className="flex rounded-lg border border-[#222] bg-[#0d0d0d] p-0.5">
            <button
              id="filter-stock-all"
              onClick={() => setStockStatusFilter('ALL')}
              className={`px-2.5 py-1 text-xs rounded transition-all ${
                stockStatusFilter === 'ALL' ? 'bg-[#262626] text-white font-semibold' : 'text-[#777] hover:text-white'
              }`}
            >
              All Stock
            </button>
            <button
              id="filter-stock-low"
              onClick={() => setStockStatusFilter('LOW_ONLY')}
              className={`px-2.5 py-1 text-xs rounded transition-all ${
                stockStatusFilter === 'LOW_ONLY' ? 'bg-yellow-500/20 text-yellow-300 font-semibold' : 'text-[#777] hover:text-white'
              }`}
            >
              ⚠️ Low/Zero (&lt;5)
            </button>
            <button
              id="filter-stock-ordered"
              onClick={() => setStockStatusFilter('ORDERED_ONLY')}
              className={`px-2.5 py-1 text-xs rounded transition-all ${
                stockStatusFilter === 'ORDERED_ONLY' ? 'bg-white text-black font-semibold' : 'text-[#777] hover:text-white'
              }`}
            >
              ✓ Ordered
            </button>
          </div>
        </div>

        {/* Reset / Clear filters */}
        {(modelFilter !== 'ALL' || sizeFilter !== 'ALL' || stockStatusFilter !== 'ALL') && (
          <button
            onClick={() => {
              setModelFilter('ALL');
              setSizeFilter('ALL');
              setStockStatusFilter('ALL');
            }}
            className="flex items-center gap-1 text-[11px] text-[#777] hover:text-white"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      {/* Inventory Item List with Tabs and Order Checkboxes */}
      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#2a2a2a] bg-[#111111] p-12 text-center">
            <ShoppingBag className="mx-auto h-10 w-10 text-[#555]" />
            <h3 className="mt-3 text-base font-serif italic text-white">
              No inventory records match your filter
            </h3>
            <p className="mt-1 text-xs text-[#777]">
              Try resetting your shoe model, size, or stock status filters.
            </p>
            <button
              onClick={() => {
                setModelFilter('ALL');
                setSizeFilter('ALL');
                setStockStatusFilter('ALL');
              }}
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-black shadow-xs"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset all filters
            </button>
          </div>
        ) : (
          filteredItems.map((item) => {
            const shoeMeta = SHOE_MODELS.find((m) => m.id === item.model);
            const style = getTabStyle(item.stock);
            const isLowStock = item.stock < 5;

            return (
              <div
                key={item.id}
                id={`inventory-card-${item.id.toLowerCase()}`}
                className={`overflow-hidden rounded-xl border bg-[#111111] transition-all hover:border-[#3a3a3a] ${
                  item.isOrdered
                    ? 'border-[#444] ring-1 ring-white/10'
                    : 'border-[#222]'
                }`}
              >
                {/* Card Header Banner with Stock Tint and Model/Size Details */}
                <div className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${style.headerBg}`}>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-2xl font-serif italic text-white">
                      {item.size}
                    </span>
                    <span className="text-sm font-semibold text-[#e0e0e0]">
                      {item.model}
                    </span>
                    <span className="rounded border border-[#333] bg-[#161616] px-2 py-0.5 text-[10px] uppercase tracking-wider text-[#888]">
                      {shoeMeta?.category}
                    </span>
                  </div>

                  {/* Stock Tab Badge */}
                  <div
                    id={`tab-${item.id.toLowerCase()}`}
                    className={`inline-flex items-center self-start sm:self-auto rounded px-2.5 py-1 text-xs tracking-wider uppercase ${style.badge}`}
                  >
                    <span>{style.label}</span>
                  </div>
                </div>

                {/* Card Lower Controls: Status Message, Order Checkbox, Side Status */}
                <div className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  item.isOrdered ? 'bg-[#161616]' : 'bg-[#0d0d0d]'
                }`}>
                  {/* Stock Alert Description */}
                  <div className="flex items-center gap-2">
                    {style.icon}
                    <span className={`text-xs font-medium ${style.alertColor}`}>
                      {style.alertText}
                    </span>
                  </div>

                  {/* Right side: Checkbox & Status: Ordered */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 border-t border-[#222] pt-3 sm:border-t-0 sm:pt-0">
                    <label
                      htmlFor={`checkbox-${item.id}`}
                      className="flex items-center gap-3 cursor-pointer select-none group"
                    >
                      <input
                        type="checkbox"
                        id={`checkbox-${item.id}`}
                        checked={item.isOrdered}
                        onChange={() => onToggleOrder(item.id)}
                        className="w-5 h-5 rounded border-[#555] bg-transparent text-white focus:ring-0 cursor-pointer accent-white"
                      />
                      <span className="text-xs uppercase tracking-wider text-[#888] group-hover:text-white transition-colors">
                        {item.isOrdered ? 'Reorder Flagged' : 'Place Reorder'}
                      </span>
                    </label>

                    {/* Status Badge on the Side */}
                    <div
                      id={`status-badge-${item.id.toLowerCase()}`}
                      className="min-w-[110px] text-right"
                    >
                      {item.isOrdered ? (
                        <div className="inline-flex items-center gap-1.5 rounded border border-green-500/30 bg-green-500/10 px-2.5 py-1">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                          <span className="text-[11px] text-green-400 font-bold uppercase tracking-widest">
                            Ordered
                          </span>
                        </div>
                      ) : (
                        <span className="text-[10px] uppercase tracking-widest text-[#555]">
                          Pending
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer System Status Bar */}
      <footer className="mt-8 pt-6 border-t border-[#2a2a2a] flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-[#666]">
        <div className="flex items-center gap-4 tracking-[0.2em] uppercase">
          <span>STORE: {selectedStore}</span>
          <span>SYSTEM: OPERATIONAL</span>
          <span>MODE: SOPHISTICATED DARK</span>
        </div>
        <div className="text-[#888]">
          CLOUDShoeCo. Inventory Control System
        </div>
      </footer>
    </section>
  );
};
