import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronRight, ChevronLeft, RotateCcw } from 'lucide-react';

interface CatalogControlsProps {
  selectedBrand: string;
  onSelectBrand: (b: string) => void;
  selectedBladeShape: string;
  onSelectBladeShape: (bs: string) => void;
  selectedLockingMechanism: string;
  onSelectLockingMechanism: (lm: string) => void;
  selectedPriceRange: string;
  onSelectPriceRange: (p: string) => void;
  selectedSteel: string;
  onSelectSteel: (s: string) => void;
  selectedHandleMaterial: string;
  onSelectHandleMaterial: (hm: string) => void;
  sortBy: string;
  onSelectSortBy: (sort: string) => void;
  itemsPerPage: number;
  onSelectItemsPerPage: (n: number) => void;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

export const CatalogControls: React.FC<CatalogControlsProps> = ({
  selectedBrand,
  onSelectBrand,
  selectedBladeShape,
  onSelectBladeShape,
  selectedLockingMechanism,
  onSelectLockingMechanism,
  selectedPriceRange,
  onSelectPriceRange,
  selectedSteel,
  onSelectSteel,
  selectedHandleMaterial,
  onSelectHandleMaterial,
  sortBy,
  onSelectSortBy,
  itemsPerPage,
  onSelectItemsPerPage,
  currentPage,
  totalPages,
  totalItems,
  onNextPage,
  onPrevPage,
  onResetFilters,
  hasActiveFilters,
}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = (name: string) => {
    setActiveMenu(activeMenu === name ? null : name);
  };

  const getSortLabel = (val: string) => {
    switch (val) {
      case 'price-asc':
        return 'Price: Low to High';
      case 'price-desc':
        return 'Price: High to Low';
      case 'name-asc':
        return 'Alphabetical: A-Z';
      case 'code-asc':
        return 'Code: A-Z';
      default:
        return 'Select';
    }
  };

  return (
    <section className="mb-6 select-none" data-purpose="catalog-controls" ref={containerRef}>
      {/* Top Row: Filters Label and Filter Dropdown Triggers */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1 pb-2">
        {/* Filters Header with underline accent */}
        <div className="border-b-2 border-gray-900 pb-0.5">
          <span className="text-base sm:text-lg font-normal text-gray-900 tracking-tight">
            Filters
          </span>
        </div>

        {/* 1. Brand Dropdown */}
        <div className="relative">
          <button
            onClick={() => toggleMenu('brand')}
            type="button"
            className={`inline-flex items-center text-sm font-normal transition-colors cursor-pointer py-1 ${
              selectedBrand !== 'all' ? 'text-black font-semibold' : 'text-gray-700 hover:text-black'
            }`}
          >
            <span>{selectedBrand === 'all' ? 'Brand' : `Brand: ${selectedBrand}`}</span>
            <ChevronDown className="ml-1 w-3.5 h-3.5 text-gray-500" />
          </button>

          {activeMenu === 'brand' && (
            <div className="absolute top-full left-0 mt-1.5 w-52 bg-white border border-gray-200 shadow-lg py-1.5 z-40">
              {[
                { label: 'All Brands', val: 'all' },
                { label: 'Black Myth Studio', val: 'Black Myth Studio' },
                { label: 'Boker Magnum', val: 'Boker Magnum' },
                { label: 'Valyrian Steel', val: 'Valyrian Steel' },
                { label: 'United Cutlery', val: 'United Cutlery' },
                { label: 'Caesars Guild', val: 'Caesars Guild' },
                { label: 'Seki Master Guild', val: 'Seki Master Guild' },
                { label: 'Hattori Forge', val: 'Hattori Forge' },
              ].map((b) => (
                <button
                  key={b.val}
                  onClick={() => {
                    onSelectBrand(b.val);
                    setActiveMenu(null);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs ${
                    selectedBrand === b.val ? 'bg-gray-100 font-bold text-black' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 2. Blade Shape Dropdown */}
        <div className="relative">
          <button
            onClick={() => toggleMenu('bladeShape')}
            type="button"
            className={`inline-flex items-center text-sm font-normal transition-colors cursor-pointer py-1 ${
              selectedBladeShape !== 'all' ? 'text-black font-semibold' : 'text-gray-700 hover:text-black'
            }`}
          >
            <span>{selectedBladeShape === 'all' ? 'Blade Shape' : `Shape: ${selectedBladeShape}`}</span>
            <ChevronDown className="ml-1 w-3.5 h-3.5 text-gray-500" />
          </button>

          {activeMenu === 'bladeShape' && (
            <div className="absolute top-full left-0 mt-1.5 w-52 bg-white border border-gray-200 shadow-lg py-1.5 z-40">
              {[
                { label: 'All Blade Shapes', val: 'all' },
                { label: 'Staff / Polearm', val: 'Staff / Polearm' },
                { label: 'Drop Point', val: 'Drop Point' },
                { label: 'Curved Dagger', val: 'Curved Dagger' },
                { label: 'Broadsword', val: 'Broadsword' },
                { label: 'Shinogi-Zukuri (Katana)', val: 'Shinogi-Zukuri' },
                { label: 'Chokuto (Straight)', val: 'Chokuto' },
              ].map((shape) => (
                <button
                  key={shape.val}
                  onClick={() => {
                    onSelectBladeShape(shape.val);
                    setActiveMenu(null);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs ${
                    selectedBladeShape === shape.val ? 'bg-gray-100 font-bold text-black' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {shape.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 3. Locking Mechanism Dropdown */}
        <div className="relative">
          <button
            onClick={() => toggleMenu('lockingMechanism')}
            type="button"
            className={`inline-flex items-center text-sm font-normal transition-colors cursor-pointer py-1 ${
              selectedLockingMechanism !== 'all' ? 'text-black font-semibold' : 'text-gray-700 hover:text-black'
            }`}
          >
            <span>{selectedLockingMechanism === 'all' ? 'Locking Mechanism' : `Lock: ${selectedLockingMechanism}`}</span>
            <ChevronDown className="ml-1 w-3.5 h-3.5 text-gray-500" />
          </button>

          {activeMenu === 'lockingMechanism' && (
            <div className="absolute top-full left-0 mt-1.5 w-52 bg-white border border-gray-200 shadow-lg py-1.5 z-40">
              {[
                { label: 'All Mechanisms', val: 'all' },
                { label: 'Fixed Blade / One-Piece', val: 'Fixed' },
                { label: 'Linerlock', val: 'Linerlock' },
                { label: 'Traditional Habaki Friction', val: 'Habaki' },
              ].map((mech) => (
                <button
                  key={mech.val}
                  onClick={() => {
                    onSelectLockingMechanism(mech.val);
                    setActiveMenu(null);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs ${
                    selectedLockingMechanism === mech.val ? 'bg-gray-100 font-bold text-black' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {mech.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 4. Price Dropdown */}
        <div className="relative">
          <button
            onClick={() => toggleMenu('price')}
            type="button"
            className={`inline-flex items-center text-sm font-normal transition-colors cursor-pointer py-1 ${
              selectedPriceRange !== 'all' ? 'text-black font-semibold' : 'text-gray-700 hover:text-black'
            }`}
          >
            <span>{selectedPriceRange === 'all' ? 'Price' : `Price: ${selectedPriceRange}`}</span>
            <ChevronDown className="ml-1 w-3.5 h-3.5 text-gray-500" />
          </button>

          {activeMenu === 'price' && (
            <div className="absolute top-full left-0 mt-1.5 w-48 bg-white border border-gray-200 shadow-lg py-1.5 z-40">
              {[
                { label: 'All Prices', val: 'all' },
                { label: 'Under $100', val: 'under-100' },
                { label: '$100 – $350', val: '100-350' },
                { label: '$350 – $600', val: '350-600' },
                { label: '$600 – $800', val: '600-800' },
                { label: 'Over $800', val: 'over-800' },
              ].map((p) => (
                <button
                  key={p.val}
                  onClick={() => {
                    onSelectPriceRange(p.val);
                    setActiveMenu(null);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs ${
                    selectedPriceRange === p.val ? 'bg-gray-100 font-bold text-black' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 5. Blade Steel Dropdown */}
        <div className="relative">
          <button
            onClick={() => toggleMenu('steel')}
            type="button"
            className={`inline-flex items-center text-sm font-normal transition-colors cursor-pointer py-1 ${
              selectedSteel !== 'all' ? 'text-black font-semibold' : 'text-gray-700 hover:text-black'
            }`}
          >
            <span>{selectedSteel === 'all' ? 'Blade Steel' : `Steel: ${selectedSteel}`}</span>
            <ChevronDown className="ml-1 w-3.5 h-3.5 text-gray-500" />
          </button>

          {activeMenu === 'steel' && (
            <div className="absolute top-full left-0 mt-1.5 w-56 bg-white border border-gray-200 shadow-lg py-1.5 z-40">
              {[
                { label: 'All Blade Steels', val: 'all' },
                { label: 'Polymer-Enhanced Steel', val: 'polymer' },
                { label: '440A Stainless Steel', val: '440A' },
                { label: 'High Carbon Damascus', val: 'damascus' },
                { label: '1060 Battle Forged Carbon', val: '1060' },
                { label: '1095 Clay-Tempered Carbon', val: '1095' },
                { label: 'Folded T10 High Tool Steel', val: 'T10' },
                { label: 'Tatara Tamahagane Iron', val: 'tamahagane' },
              ].map((s) => (
                <button
                  key={s.val}
                  onClick={() => {
                    onSelectSteel(s.val);
                    setActiveMenu(null);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs ${
                    selectedSteel === s.val ? 'bg-gray-100 font-bold text-black' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 6. Handle Material Dropdown */}
        <div className="relative">
          <button
            onClick={() => toggleMenu('handleMaterial')}
            type="button"
            className={`inline-flex items-center text-sm font-normal transition-colors cursor-pointer py-1 ${
              selectedHandleMaterial !== 'all' ? 'text-black font-semibold' : 'text-gray-700 hover:text-black'
            }`}
          >
            <span>{selectedHandleMaterial === 'all' ? 'Handle Material' : `Handle: ${selectedHandleMaterial}`}</span>
            <ChevronDown className="ml-1 w-3.5 h-3.5 text-gray-500" />
          </button>

          {activeMenu === 'handleMaterial' && (
            <div className="absolute top-full left-0 mt-1.5 w-56 bg-white border border-gray-200 shadow-lg py-1.5 z-40">
              {[
                { label: 'All Handle Materials', val: 'all' },
                { label: 'Carved Bronze & Gold', val: 'Bronze' },
                { label: 'Milled Aluminum', val: 'Aluminum' },
                { label: 'Dragonbone & 24k Gold', val: 'Dragonbone' },
                { label: 'Wood & Cast Brass', val: 'Brass' },
                { label: 'Ray Skin & Silk Wrap', val: 'Ray skin' },
                { label: 'Ebony African Hardwood', val: 'Ebony' },
              ].map((hm) => (
                <button
                  key={hm.val}
                  onClick={() => {
                    onSelectHandleMaterial(hm.val);
                    setActiveMenu(null);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs ${
                    selectedHandleMaterial === hm.val ? 'bg-gray-100 font-bold text-black' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {hm.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Reset button if any filter is active */}
        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            type="button"
            className="inline-flex items-center text-xs text-amber-800 hover:text-amber-950 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 cursor-pointer ml-auto"
          >
            <RotateCcw className="w-3 h-3 mr-1" />
            Reset Filters
          </button>
        )}
      </div>

      {/* Full-width Divider Line as in reference image */}
      <div className="w-full border-b border-gray-200 mt-1.5 mb-3" />

      {/* Second Line: Sort By (Left) and Items Per Page & Pagination (Right) */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-gray-700 py-1">
        {/* Left: Sort By: Select ⌵ */}
        <div className="relative flex items-center">
          <span className="text-gray-600 font-normal mr-1.5">Sort By:</span>
          <button
            onClick={() => toggleMenu('sort')}
            type="button"
            className="font-bold text-gray-900 hover:text-black inline-flex items-center cursor-pointer"
          >
            <span>{getSortLabel(sortBy)}</span>
            <ChevronDown className="ml-1 w-3.5 h-3.5 text-gray-600" />
          </button>

          {activeMenu === 'sort' && (
            <div className="absolute top-full left-0 mt-1.5 w-48 bg-white border border-gray-200 shadow-lg py-1.5 z-40">
              {[
                { label: 'Select (Default)', val: 'default' },
                { label: 'Price: Low to High', val: 'price-asc' },
                { label: 'Price: High to Low', val: 'price-desc' },
                { label: 'Alphabetical: A-Z', val: 'name-asc' },
                { label: 'Code: A-Z', val: 'code-asc' },
              ].map((s) => (
                <button
                  key={s.val}
                  onClick={() => {
                    onSelectSortBy(s.val);
                    setActiveMenu(null);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs ${
                    sortBy === s.val ? 'bg-gray-100 font-bold text-black' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Items Per Page (e.g., 20 ⌵) + Page Counter (e.g., 1/97) + Arrow Nav Buttons */}
        <div className="flex items-center gap-4 text-xs sm:text-sm">
          {/* Items per page dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleMenu('itemsPerPage')}
              type="button"
              className="inline-flex items-center text-gray-800 font-normal hover:text-black cursor-pointer"
            >
              <span>{itemsPerPage}</span>
              <ChevronDown className="ml-1 w-3.5 h-3.5 text-gray-500" />
            </button>

            {activeMenu === 'itemsPerPage' && (
              <div className="absolute top-full right-0 mt-1.5 w-24 bg-white border border-gray-200 shadow-lg py-1 z-40">
                {[12, 20, 48, 97].map((num) => (
                  <button
                    key={num}
                    onClick={() => {
                      onSelectItemsPerPage(num);
                      setActiveMenu(null);
                    }}
                    className={`w-full text-left px-3 py-1 text-xs ${
                      itemsPerPage === num ? 'bg-gray-100 font-bold text-black' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Pagination count e.g. 1/97 */}
          <span className="text-gray-400 font-normal">
            {currentPage}/{totalItems > 0 ? (totalItems >= 97 ? '97' : totalPages) : '1'}
          </span>

          {/* Left / Right arrows */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={onPrevPage}
              disabled={currentPage <= 1}
              aria-label="Previous page"
              type="button"
              className={`p-0.5 transition-colors ${
                currentPage > 1 ? 'text-gray-700 hover:text-black cursor-pointer' : 'text-gray-300 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-4 h-4 stroke-[2]" />
            </button>

            <button
              onClick={onNextPage}
              disabled={currentPage >= totalPages}
              aria-label="Next page"
              type="button"
              className={`p-0.5 transition-colors ${
                currentPage < totalPages ? 'text-gray-700 hover:text-black cursor-pointer' : 'text-gray-300 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-4 h-4 stroke-[2]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
