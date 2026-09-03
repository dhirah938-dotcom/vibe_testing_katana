import React, { useState } from 'react';
import { ShieldCheck, Package, Search, User, ShoppingBag, X } from 'lucide-react';
import { FilterCategory } from '../types';

interface HeaderProps {
  currentCategory: FilterCategory;
  onSelectCategory: (cat: FilterCategory) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenRestoration: () => void;
  onOpenProvenanceFaq: () => void;
  onOpenAccount: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  cartCount,
  onOpenCart,
  onOpenRestoration,
  onOpenProvenanceFaq,
  onOpenAccount,
  searchQuery,
  onSearchChange,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      {/* Announcement Bar */}
      <aside
        className="bg-[#121416] text-slate-300 text-xs py-2 px-4 border-b border-[#C5A059]/30"
        data-purpose="global-announcement"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-[#C5A059] font-medium tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-[#C5A059]" />
              Direct Nihonto Craftsmen Guild Certified
            </span>
            <span className="hidden sm:inline text-gray-500">|</span>
            <span className="hidden sm:inline-flex items-center text-gray-300">
              <Package className="w-3.5 h-3.5 mr-1 text-gray-400" />
              Insured Worldwide Express via DHL / FedEx
            </span>
          </div>

          <div className="flex items-center space-x-5 text-[11px] tracking-wide">
            <span className="text-amber-300 font-medium">Earn 5% Back in Member Loyalty Points</span>
            <button
              onClick={onOpenRestoration}
              className="hover:text-[#C5A059] transition-colors cursor-pointer text-slate-300"
            >
              Certified Sword Restoration
            </button>
            <button
              onClick={onOpenProvenanceFaq}
              className="hover:text-[#C5A059] transition-colors cursor-pointer text-slate-300"
            >
              Provenance FAQs
            </button>
          </div>
        </div>
      </aside>

      {/* Main Sticky Header */}
      <header className="bg-white sticky top-0 z-40 border-b border-gray-200/90 shadow-sm backdrop-blur-md bg-white/95 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Brand identity */}
            <div className="flex items-center space-x-6">
              <button
                onClick={() => onSelectCategory('katana')}
                className="group flex flex-col text-left focus:outline-none"
              >
                <span className="font-cinzel text-2xl font-bold tracking-[0.22em] text-[#1A1D20] group-hover:text-[#C5A059] transition-colors flex items-baseline">
                  CAESARS
                </span>
                <span className="text-[10px] text-[#C5A059] font-normal tracking-[0.25em] block -mt-1 font-mono">
                  NIHONTO GUILD
                </span>
              </button>
            </div>

            {/* Primary Navigation */}
            <nav className="hidden lg:flex items-center space-x-5 xl:space-x-6 text-xs xl:text-[13px] tracking-widest font-medium uppercase text-gray-700">
              <button
                onClick={() => onSelectCategory('katana')}
                className={`py-1 transition-all cursor-pointer ${
                  currentCategory === 'katana'
                    ? 'text-[#C5A059] border-b-2 border-[#C5A059] font-semibold'
                    : 'hover:text-[#C5A059]'
                }`}
              >
                Katana (刀)
              </button>
              <button
                onClick={() => onSelectCategory('wakizashi')}
                className={`py-1 transition-all cursor-pointer ${
                  currentCategory === 'wakizashi'
                    ? 'text-[#C5A059] border-b-2 border-[#C5A059] font-semibold'
                    : 'hover:text-[#C5A059]'
                }`}
              >
                Wakizashi & Tanto
              </button>
              <button
                onClick={() => onSelectCategory('iaito')}
                className={`py-1 transition-all cursor-pointer ${
                  currentCategory === 'iaito'
                    ? 'text-[#C5A059] border-b-2 border-[#C5A059] font-semibold'
                    : 'hover:text-[#C5A059]'
                }`}
              >
                Iaito & Shinken
              </button>
              <button
                onClick={() => onSelectCategory('antique')}
                className={`py-1 transition-all cursor-pointer ${
                  currentCategory === 'antique'
                    ? 'text-[#C5A059] border-b-2 border-[#C5A059] font-semibold'
                    : 'hover:text-[#C5A059]'
                }`}
              >
                Antique Heirlooms
              </button>
              <button
                onClick={() => onSelectCategory('custom')}
                className={`py-1 transition-all cursor-pointer ${
                  currentCategory === 'custom'
                    ? 'text-[#C5A059] border-b-2 border-[#C5A059] font-semibold'
                    : 'hover:text-[#C5A059]'
                }`}
              >
                Custom Forging
              </button>
              <button
                onClick={() => onSelectCategory('authentication')}
                className={`py-1 transition-all cursor-pointer ${
                  currentCategory === 'authentication'
                    ? 'text-[#C5A059] border-b-2 border-[#C5A059] font-semibold'
                    : 'hover:text-[#C5A059]'
                }`}
              >
                Authentication
              </button>
              <button
                onClick={() => onSelectCategory('talk-to-us')}
                className={`py-1 transition-all cursor-pointer ${
                  currentCategory === 'talk-to-us'
                    ? 'text-[#C5A059] border-b-2 border-[#C5A059] font-semibold'
                    : 'hover:text-[#C5A059]'
                }`}
              >
                Talk to Us
              </button>
            </nav>

            {/* Right Utility Actions */}
            <div className="flex items-center space-x-3 sm:space-x-5 text-gray-700">
              {/* Search Toggle */}
              <button
                aria-label="Search Collection"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-2 transition-colors rounded-full ${
                  isSearchOpen || searchQuery
                    ? 'text-[#C5A059] bg-[#C5A059]/10'
                    : 'hover:text-[#C5A059]'
                }`}
                type="button"
              >
                <Search className="w-5 h-5" strokeWidth={1.75} />
              </button>

              {/* Member Account */}
              <button
                aria-label="Member Account"
                onClick={onOpenAccount}
                className="p-2 hover:text-[#C5A059] transition-colors"
                type="button"
              >
                <User className="w-5 h-5" strokeWidth={1.75} />
              </button>

              {/* Cart button */}
              <button
                aria-label="Open Shopping Cart"
                onClick={onOpenCart}
                className="relative p-2 hover:text-[#C5A059] transition-colors flex items-center cursor-pointer"
                type="button"
              >
                <ShoppingBag className="w-5 h-5" strokeWidth={1.75} />
                <span className="ml-1 text-[10px] font-semibold bg-[#1A1D20] text-white px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>

          {/* Search Dropdown / Bar if active */}
          {isSearchOpen && (
            <div className="py-3 px-4 bg-gray-50 border-t border-gray-200 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search by sword code (e.g. Z9505), blade name, steel, or smith..."
                className="flex-1 bg-transparent border-0 text-xs sm:text-sm text-slate-800 placeholder-gray-400 focus:outline-none focus:ring-0"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1"
                >
                  Clear
                </button>
              )}
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Mobile & Tablet Horizontal Category Navigation */}
          <nav className="lg:hidden flex items-center space-x-4 overflow-x-auto py-2.5 border-t border-gray-100 text-xs tracking-wider uppercase font-medium text-gray-600 no-scrollbar">
            <button
              onClick={() => onSelectCategory('katana')}
              className={`whitespace-nowrap px-1 py-1 transition-colors ${
                currentCategory === 'katana'
                  ? 'text-[#C5A059] border-b-2 border-[#C5A059] font-semibold'
                  : 'hover:text-gray-900'
              }`}
            >
              Katana
            </button>
            <button
              onClick={() => onSelectCategory('wakizashi')}
              className={`whitespace-nowrap px-1 py-1 transition-colors ${
                currentCategory === 'wakizashi'
                  ? 'text-[#C5A059] border-b-2 border-[#C5A059] font-semibold'
                  : 'hover:text-gray-900'
              }`}
            >
              Wakizashi
            </button>
            <button
              onClick={() => onSelectCategory('iaito')}
              className={`whitespace-nowrap px-1 py-1 transition-colors ${
                currentCategory === 'iaito'
                  ? 'text-[#C5A059] border-b-2 border-[#C5A059] font-semibold'
                  : 'hover:text-gray-900'
              }`}
            >
              Iaito
            </button>
            <button
              onClick={() => onSelectCategory('antique')}
              className={`whitespace-nowrap px-1 py-1 transition-colors ${
                currentCategory === 'antique'
                  ? 'text-[#C5A059] border-b-2 border-[#C5A059] font-semibold'
                  : 'hover:text-gray-900'
              }`}
            >
              Antique
            </button>
            <button
              onClick={() => onSelectCategory('custom')}
              className={`whitespace-nowrap px-1 py-1 transition-colors ${
                currentCategory === 'custom'
                  ? 'text-[#C5A059] border-b-2 border-[#C5A059] font-semibold'
                  : 'hover:text-gray-900'
              }`}
            >
              Custom
            </button>
            <button
              onClick={() => onSelectCategory('authentication')}
              className={`whitespace-nowrap px-1 py-1 transition-colors ${
                currentCategory === 'authentication'
                  ? 'text-[#C5A059] border-b-2 border-[#C5A059] font-semibold'
                  : 'hover:text-gray-900'
              }`}
            >
              Auth
            </button>
            <button
              onClick={() => onSelectCategory('talk-to-us')}
              className={`whitespace-nowrap px-1 py-1 transition-colors ${
                currentCategory === 'talk-to-us'
                  ? 'text-[#C5A059] border-b-2 border-[#C5A059] font-semibold'
                  : 'hover:text-gray-900'
              }`}
            >
              Talk to Us
            </button>
          </nav>
        </div>
      </header>
    </>
  );
};
