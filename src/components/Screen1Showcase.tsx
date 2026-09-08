import React, { useState } from 'react';
import { ShoeModelId } from '../types';
import { SHOE_MODELS, STORE_MANAGERS } from '../data/inventoryData';
import { ShoeIllustration } from './ShoeIllustration';
import { Tag, ArrowRight, Eye, Calendar, Clock, Phone, Factory, Store } from 'lucide-react';

interface Screen1ShowcaseProps {
  onNavigateToScreen2: (modelFilter?: ShoeModelId) => void;
}

export const Screen1Showcase: React.FC<Screen1ShowcaseProps> = ({ onNavigateToScreen2 }) => {
  // Track which shoe photo has been clicked to reveal its product category
  const [revealedCategories, setRevealedCategories] = useState<Record<ShoeModelId, boolean>>({
    CloudWALK: false,
    CloudRUN: false,
  });

  const toggleCategoryReveal = (modelId: ShoeModelId) => {
    setRevealedCategories((prev) => ({
      ...prev,
      [modelId]: !prev[modelId],
    }));
  };

  return (
    <section className="space-y-6 pb-12">
      {/* Company Description banner */}
      <div className="rounded-2xl border border-[#2a2a2a] bg-[#111111] p-5 sm:p-6 shadow-xs">
        <div className="space-y-2">
          <div>
            <h2 className="text-xl font-serif italic tracking-wide text-white sm:text-2xl">
              Cloud Shoe Co.
            </h2>
            <p className="mt-1 text-sm text-[#bbb] sm:text-base leading-relaxed italic font-serif">
              “Step into the Clouds — Engineered for Everyday Comfort and Elevated Performance.”
            </p>
          </div>

          <div className="border-t border-[#222] pt-2">
            <p className="text-xs sm:text-sm text-[#888] leading-relaxed">
              <strong className="text-white uppercase tracking-wider text-[11px] mr-1.5">Mission:</strong>
              To empower every step through revolutionary comfort, ergonomic support, and accessible modern craftsmanship for all lifestyles.
            </p>
          </div>
        </div>
      </div>

      {/* The 2 Shoes Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {SHOE_MODELS.map((shoe) => {
          const isRevealed = revealedCategories[shoe.id];

          return (
            <div
              key={shoe.id}
              id={`shoe-card-${shoe.id.toLowerCase()}`}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#222222] bg-[#111111] p-5 shadow-sm transition-all hover:border-[#444]"
            >
              <div>
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#666]">
                    Model Line
                  </span>
                  <span className="text-sm font-bold font-mono text-[#e0e0e0]">
                    {shoe.price}
                  </span>
                </div>

                <h3 className="mt-1 text-2xl font-serif italic tracking-wide text-white">
                  {shoe.name}
                </h3>
                <p className="mt-1 text-xs text-[#888]">
                  {shoe.tagline}
                </p>

                {/* Clickable Shoe Photo / Visual */}
                <div className="mt-4">
                  <button
                    id={`photo-btn-${shoe.id.toLowerCase()}`}
                    type="button"
                    onClick={() => toggleCategoryReveal(shoe.id)}
                    className="group/photo relative w-full cursor-pointer text-left focus:outline-hidden focus:ring-2 focus:ring-[#555] rounded-xl"
                    aria-label={`Click photo to reveal product category for ${shoe.name}`}
                  >
                    <ShoeIllustration model={shoe.id} isRevealed={isRevealed} />

                    {/* Overlay hint banner */}
                    <div className="absolute inset-x-2 bottom-2 flex items-center justify-center gap-1.5 rounded-lg border border-[#333] bg-[#0a0a0a]/90 px-3 py-2 text-xs font-semibold text-[#ddd] backdrop-blur-xs transition-opacity group-hover/photo:border-white">
                      <Eye className="h-3.5 w-3.5" />
                      <span>{isRevealed ? 'Tap photo to hide category' : '👆 Tap photo to reveal category'}</span>
                    </div>
                  </button>
                </div>

                {/* Category Reveal Section */}
                {isRevealed && (
                  <div
                    id={`category-revealed-${shoe.id.toLowerCase()}`}
                    className="mt-4 rounded-xl border border-[#333333] bg-[#161616] p-4 transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <Tag className="h-3.5 w-3.5 text-[#aaa]" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#aaa]">
                        Product Category
                      </span>
                    </div>
                    <p className="mt-1 text-lg font-serif italic text-white sm:text-xl">
                      {shoe.category}
                    </p>
                    <p className="mt-1 text-xs text-[#888] leading-relaxed">
                      {shoe.description}
                    </p>
                  </div>
                )}

                {/* Technical specs summary */}
                <div className="mt-4 border-t border-[#222222] pt-3">
                  <div className="flex items-center justify-between text-xs font-medium text-[#666]">
                    <span className="uppercase tracking-wider text-[10px]">Available Sizes:</span>
                    <span className="font-mono font-bold text-[#e0e0e0]">US 8, US 10, US 12</span>
                  </div>
                </div>
              </div>

              {/* Action Button to Screen 2 */}
              <div className="mt-6 pt-2">
                <button
                  id={`btn-check-stock-${shoe.id.toLowerCase()}`}
                  onClick={() => onNavigateToScreen2(shoe.id)}
                  className="flex w-full items-center justify-center gap-2 min-h-[46px] rounded-xl bg-white px-4 py-3 text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-[#e6e6e6] active:scale-[0.98]"
                >
                  <span>Check {shoe.name} Inventory</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Maintenance & Contacts Section */}
      <div
        id="tab-operational-update"
        className="rounded-2xl border border-[#2a2a2a] bg-[#111111] p-5 sm:p-6 shadow-xs"
      >
        {/* Scheduled Maintenance Card */}
        <div className="rounded-xl border border-[#262626] bg-[#0d0d0d] p-4">
          <div className="flex items-center gap-2 text-white">
            <Calendar className="h-4 w-4 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-white">
              Scheduled Maintenance
            </span>
          </div>
          <div className="mt-2 grid grid-cols-1 gap-2.5 sm:grid-cols-2 text-xs">
            <div className="flex items-center gap-2 text-[#ccc]">
              <Clock className="h-3.5 w-3.5 text-[#888]" />
              <span>
                <strong className="text-white">Day & Time:</strong> Sunday, September 13, 2026 | 02:00 AM – 05:00 AM SGT
              </span>
            </div>
            <div className="text-[#888]">
              <span className="text-amber-400/90 font-medium">System Impact:</span> Database sync & cloud optimization. Store terminals will run in cached local mode.
            </div>
          </div>
        </div>

        {/* Store & Factory Contacts Grid */}
        <div className="mt-5">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#888] mb-3">
            Operational Contacts (Stores & Factory)
          </h4>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {/* Store Contacts */}
            {STORE_MANAGERS.map((mgr) => (
              <div
                key={mgr.store}
                id={`contact-store-${mgr.store.toLowerCase()}`}
                className="rounded-xl border border-[#222] bg-[#161616] p-3.5 transition-all hover:border-[#333]"
              >
                <div className="flex items-center gap-2 text-white">
                  <Store className="h-3.5 w-3.5 text-[#aaa]" />
                  <span className="text-xs font-serif italic font-bold">{mgr.store} Store</span>
                </div>
                <p className="mt-1 text-xs text-[#bbb] font-medium">{mgr.name}</p>
                <p className="text-[10px] uppercase tracking-wider text-[#666]">{mgr.role}</p>
                <div className="mt-2.5 flex items-center gap-1.5 text-xs text-white">
                  <Phone className="h-3 w-3 text-[#888]" />
                  <span className="text-[#ddd]">
                    {mgr.contactNumber}
                  </span>
                </div>
              </div>
            ))}

            {/* Factory Contact */}
            <div
              id="contact-factory-jurong"
              className="rounded-xl border border-[#222] bg-[#161616] p-3.5 transition-all hover:border-[#333]"
            >
              <div className="flex items-center gap-2 text-white">
                <Factory className="h-3.5 w-3.5 text-blue-400" />
                <span className="text-xs font-serif italic font-bold">Jurong Factory</span>
              </div>
              <p className="mt-1 text-xs text-[#bbb] font-medium">David Koh</p>
              <p className="text-[10px] uppercase tracking-wider text-[#666]">Production & Logistics Hub</p>
              <div className="mt-2.5 flex items-center gap-1.5 text-xs text-white">
                <Phone className="h-3 w-3 text-[#888]" />
                <span className="text-[#ddd]">
                  +65 6899 xxxx
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
