import React from 'react';
import { Sword } from '../types';
import { Eye, Plus } from 'lucide-react';

interface ProductCardProps {
  sword: Sword;
  onSelect: (sword: Sword) => void;
  onAddToCart: (sword: Sword, e: React.MouseEvent) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ sword, onSelect, onAddToCart }) => {
  const getBadgeClasses = (variant: string) => {
    switch (variant) {
      case 'verified':
        return 'bg-slate-900/85 text-amber-300 text-[10px] tracking-widest px-2 py-0.5 uppercase font-medium';
      case 'inset':
        return 'bg-black/80 text-gray-200 text-[10px] px-1.5 py-0.5 rounded border border-gray-700 backdrop-blur-sm';
      case 'amber':
        return 'bg-amber-500 text-slate-950 font-bold text-[10px] px-2 py-0.5 uppercase tracking-wide';
      case 'crimson':
        return 'bg-red-900/90 text-rose-100 text-[10px] px-2 py-0.5 rounded';
      case 'azure':
        return 'bg-teal-950/80 text-teal-200 text-[10px] tracking-wider px-2 py-0.5';
      case 'purple':
        return 'bg-purple-900/90 text-purple-200 text-[10px] tracking-wide px-2 py-0.5 uppercase';
      case 'cinematic':
        return 'bg-slate-800 text-yellow-400 text-[10px] px-2 py-0.5 font-medium';
      case 'tamahagane':
        return 'bg-slate-950 text-[#C5A059] text-[10px] font-medium px-2 py-0.5 border border-[#C5A059]/40';
      case 'gold':
      default:
        return 'bg-[#C5A059] text-slate-950 text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider';
    }
  };

  const getBadgePositionClasses = (pos: string) => {
    switch (pos) {
      case 'top-right':
        return 'absolute top-2 right-2';
      case 'bottom-left':
        return 'absolute bottom-2 left-2';
      case 'bottom-right':
        return 'absolute bottom-2 right-2';
      case 'top-left':
      default:
        return 'absolute top-2 left-2';
    }
  };

  const getStatusClasses = (statusType: string) => {
    switch (statusType) {
      case 'loyalty':
        return 'text-[10px] text-[#C5A059] font-medium';
      case 'warning':
        return 'text-[10px] text-amber-700 font-medium';
      case 'dispatch':
        return 'text-[10px] text-emerald-700 font-medium';
      case 'stock':
      default:
        return 'text-[10px] text-emerald-700 font-medium';
    }
  };

  return (
    <article
      onClick={() => onSelect(sword)}
      className="sword-card bg-white border border-gray-200 flex flex-col group relative cursor-pointer shadow-xs hover:border-[#C5A059]/40"
    >
      {/* Stand Display Image Box */}
      <div className="aspect-[4/5] bg-[#0E1012] overflow-hidden relative flex items-center justify-center p-3">
        <img
          alt={`${sword.code} ${sword.name}`}
          className="w-full h-full object-cover object-center filter brightness-95 contrast-105 group-hover:scale-105 transition duration-500"
          src={sword.imageUrl}
          loading="lazy"
        />

        {/* Badge if present */}
        {sword.badge && (
          <span
            className={`${getBadgePositionClasses(sword.badge.position)} ${getBadgeClasses(
              sword.badge.variant
            )}`}
          >
            {sword.badge.text}
          </span>
        )}

        {/* Quick Hover Actions Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 pointer-events-none group-hover:pointer-events-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(sword);
            }}
            className="px-3 py-1.5 bg-white text-slate-900 text-xs font-medium rounded-sm flex items-center gap-1.5 shadow-lg hover:bg-amber-50 hover:text-[#9E7D3B] transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            Inspect
          </button>
          <button
            onClick={(e) => onAddToCart(sword, e)}
            className="px-3 py-1.5 bg-[#C5A059] text-white text-xs font-medium rounded-sm flex items-center gap-1.5 shadow-lg hover:bg-[#9E7D3B] transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add
          </button>
        </div>
      </div>

      {/* Card Info Box */}
      <div className="p-4 flex-1 flex flex-col justify-between bg-white border-t border-gray-100">
        <div>
          <span className="text-[11px] font-mono text-gray-400 tracking-wider block mb-0.5">
            {sword.code}
          </span>
          <h2 className="font-sans font-semibold text-sm text-slate-900 leading-snug group-hover:text-[#C5A059] transition-colors">
            {sword.name}
          </h2>
          <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">
            {sword.subtitle}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 flex items-baseline justify-between">
          <span className="text-sm font-semibold text-slate-900">
            ${sword.price.toFixed(2)}
          </span>
          <span className={getStatusClasses(sword.statusType)}>
            {sword.status}
          </span>
        </div>
      </div>
    </article>
  );
};
