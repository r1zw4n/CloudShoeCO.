import React, { useState } from 'react';
import { ShoeModelId } from '../types';
import { SHOE_MODELS } from '../data/inventoryData';
import { ShoeIllustration } from './ShoeIllustration';
import { Tag, Sparkles, ArrowRight, Eye, Info } from 'lucide-react';

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
      {/* Introduction banner */}
      <div className="rounded-2xl border border-[#2a2a2a] bg-[#111111] p-5 shadow-xs">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#333] bg-[#161616] text-white">
            <Info className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-serif italic tracking-wide text-white sm:text-2xl">
              Screen 1: Product Showcase
            </h2>
            <p className="mt-1 text-sm text-[#888] sm:text-base">
              Two core footwear lines for CLOUDShoeCo. <strong className="text-[#ccc]">Click or tap on any shoe photo</strong> below to reveal its product category.
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
                <div className="mt-4 min-h-[90px]">
                  {isRevealed ? (
                    <div
                      id={`category-revealed-${shoe.id.toLowerCase()}`}
                      className="rounded-xl border border-[#333333] bg-[#161616] p-4 transition-all"
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
                  ) : (
                    <div
                      id={`category-prompt-${shoe.id.toLowerCase()}`}
                      onClick={() => toggleCategoryReveal(shoe.id)}
                      className="cursor-pointer rounded-xl border border-dashed border-[#262626] bg-[#0d0d0d] p-4 text-center transition-colors hover:border-[#444]"
                    >
                      <Sparkles className="mx-auto h-5 w-5 text-[#555]" />
                      <p className="mt-1 text-xs font-semibold text-[#aaa]">
                        Category hidden
                      </p>
                      <p className="text-[11px] text-[#666]">
                        Tap the photo above to view category details
                      </p>
                    </div>
                  )}
                </div>

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
    </section>
  );
};
