import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronRight, ChevronLeft, RotateCcw } from 'lucide-react';

interface CatalogControlsProps {
  selectedBrand: string;
  onSelectBrand: (b: string) => void;
  selectedPriceRange: string;
  onSelectPriceRange: (p: string) => void;
  selectedCertificate: string;
  onSelectCertificate: (c: string) => void;
  selectedSteel: string;
  onSelectSteel: (s: string) => void;
  sortBy: string;
  onSelectSortBy: (sort: string) => void;
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

export const CatalogControls: React.FC<CatalogControlsProps> = ({
  selectedBrand,
  onSelectBrand,
  selectedPriceRange,
  onSelectPriceRange,
  selectedCertificate,
  onSelectCertificate,
  selectedSteel,
  onSelectSteel,
  sortBy,
  onSelectSortBy,
  currentPage,
  totalPages,
  onNextPage,
  onPrevPage,
  onResetFilters,
  hasActiveFilters,
}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
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

  return (
    <section className="border-b border-gray-200 pb-5 mb-8" data-purpose="catalog-controls" ref={containerRef}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left Filters */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 relative">
          <span className="font-cinzel text-base font-semibold text-slate-900 tracking-wide">
            Filters
          </span>

          {/* Filter Item: Brand */}
          <div className="relative">
            <button
              onClick={() => toggleMenu('brand')}
              className={`inline-flex items-center text-xs tracking-wider uppercase font-medium py-1 transition-colors cursor-pointer ${
                selectedBrand !== 'all' ? 'text-[#C5A059] font-bold' : 'text-gray-700 hover:text-[#C5A059]'
              }`}
              type="button"
            >
              {selectedBrand === 'all' ? 'Brand' : `Brand: ${selectedBrand}`}
              <ChevronDown className={`ml-1 w-3.5 h-3.5 text-gray-400 transition-transform ${activeMenu === 'brand' ? 'rotate-180 text-[#C5A059]' : ''}`} />
            </button>

            {activeMenu === 'brand' && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 shadow-xl rounded-sm py-1 z-30 animate-in fade-in">
                {['all', 'Caesars Guild', 'Seki Master Guild', 'Bizen Osafune', 'Hattori Forge', 'Minamoto Heritage'].map((b) => (
                  <button
                    key={b}
                    onClick={() => {
                      onSelectBrand(b);
                      setActiveMenu(null);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs ${
                      selectedBrand === b ? 'bg-[#C5A059]/10 text-[#C5A059] font-semibold' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {b === 'all' ? 'All Brands' : b}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filter Item: Price */}
          <div className="relative">
            <button
              onClick={() => toggleMenu('price')}
              className={`inline-flex items-center text-xs tracking-wider uppercase font-medium py-1 transition-colors cursor-pointer ${
                selectedPriceRange !== 'all' ? 'text-[#C5A059] font-bold' : 'text-gray-700 hover:text-[#C5A059]'
              }`}
              type="button"
            >
              {selectedPriceRange === 'all' ? 'Price' : `Price: ${selectedPriceRange}`}
              <ChevronDown className={`ml-1 w-3.5 h-3.5 text-gray-400 transition-transform ${activeMenu === 'price' ? 'rotate-180 text-[#C5A059]' : ''}`} />
            </button>

            {activeMenu === 'price' && (
              <div className="absolute top-full left-0 mt-2 w-44 bg-white border border-gray-200 shadow-xl rounded-sm py-1 z-30 animate-in fade-in">
                {[
                  { label: 'All Prices', val: 'all' },
                  { label: 'Under $300', val: 'under-300' },
                  { label: '$300 – $600', val: '300-600' },
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
                      selectedPriceRange === p.val ? 'bg-[#C5A059]/10 text-[#C5A059] font-semibold' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* BMC Value Prop Filter: Certificate & Authenticity */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => toggleMenu('cert')}
              className={`inline-flex items-center text-xs tracking-wider uppercase font-medium py-1 transition-colors cursor-pointer ${
                selectedCertificate !== 'all' ? 'text-[#C5A059] font-bold' : 'text-gray-700 hover:text-[#C5A059]'
              }`}
              type="button"
            >
              {selectedCertificate === 'all' ? 'Certificate Level' : selectedCertificate}
              <ChevronDown className={`ml-1 w-3.5 h-3.5 text-gray-400 transition-transform ${activeMenu === 'cert' ? 'rotate-180 text-[#C5A059]' : ''}`} />
            </button>

            {activeMenu === 'cert' && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 shadow-xl rounded-sm py-1 z-30 animate-in fade-in">
                {['all', 'Nihonto Verified', 'NBTHK Eligible', 'Guild Certified', 'Tamahagane Grade', 'Collector Edition'].map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      onSelectCertificate(c);
                      setActiveMenu(null);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs ${
                      selectedCertificate === c ? 'bg-[#C5A059]/10 text-[#C5A059] font-semibold' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {c === 'all' ? 'All Certificates' : c}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* BMC Value Prop Filter: Forged vs Antique */}
          <div className="relative hidden md:block">
            <button
              onClick={() => toggleMenu('steel')}
              className={`inline-flex items-center text-xs tracking-wider uppercase font-medium py-1 transition-colors cursor-pointer ${
                selectedSteel !== 'all' ? 'text-[#C5A059] font-bold' : 'text-gray-700 hover:text-[#C5A059]'
              }`}
              type="button"
            >
              {selectedSteel === 'all' ? 'Steel & Era' : selectedSteel}
              <ChevronDown className={`ml-1 w-3.5 h-3.5 text-gray-400 transition-transform ${activeMenu === 'steel' ? 'rotate-180 text-[#C5A059]' : ''}`} />
            </button>

            {activeMenu === 'steel' && (
              <div className="absolute top-full left-0 mt-2 w-52 bg-white border border-gray-200 shadow-xl rounded-sm py-1 z-30 animate-in fade-in">
                {[
                  { label: 'All Metallurgy & Eras', val: 'all' },
                  { label: 'Clay-Tempered 1095 Carbon', val: '1095' },
                  { label: 'Folded T10 High Tool Steel', val: 'T10' },
                  { label: 'Tatara Tamahagane Iron', val: 'tamahagane' },
                  { label: '1060 Folded Spring Steel', val: '1060' },
                ].map((s) => (
                  <button
                    key={s.val}
                    onClick={() => {
                      onSelectSteel(s.val);
                      setActiveMenu(null);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs ${
                      selectedSteel === s.val ? 'bg-[#C5A059]/10 text-[#C5A059] font-semibold' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Reset button if filters active */}
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center text-[11px] text-amber-700 hover:text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              Reset
            </button>
          )}
        </div>

        {/* Right Side: Sort & View Counter */}
        <div className="flex items-center justify-between md:justify-end gap-5 text-xs text-gray-600">
          <div className="flex items-center space-x-2">
            <label className="font-normal text-gray-500 whitespace-nowrap" htmlFor="sort-dropdown">
              Sort By:
            </label>
            <div className="relative inline-block">
              <select
                id="sort-dropdown"
                value={sortBy}
                onChange={(e) => onSelectSortBy(e.target.value)}
                className="text-xs border-0 py-1 pl-2 pr-6 bg-transparent font-medium text-slate-800 focus:ring-0 cursor-pointer"
              >
                <option value="default">Select</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="antique">Antique & Authenticated First</option>
                <option value="rating">New Nihonto Master Additions</option>
              </select>
            </div>
          </div>

          {/* Items per page & pagination indicator */}
          <div className="flex items-center space-x-4 border-l border-gray-200 pl-4">
            <span className="cursor-pointer font-medium text-slate-700 hover:text-slate-900 flex items-center">
              20
              <ChevronDown className="w-3 h-3 ml-0.5 text-gray-400" />
            </span>
            <span className="text-gray-400">
              {currentPage}/{totalPages}
            </span>
            <div className="flex items-center space-x-1">
              {currentPage > 1 && (
                <button
                  onClick={onPrevPage}
                  aria-label="Previous Page"
                  className="hover:text-slate-900 p-0.5 text-gray-500 hover:text-slate-800"
                  type="button"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={onNextPage}
                disabled={currentPage >= totalPages}
                aria-label="Next Page"
                className={`p-0.5 ${currentPage < totalPages ? 'hover:text-slate-900 text-gray-600' : 'text-gray-300 cursor-not-allowed'}`}
                type="button"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
