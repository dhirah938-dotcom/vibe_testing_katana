import React from 'react';
import { Sword } from '../types';

interface ProductCardProps {
  sword: Sword;
  onSelect: (sword: Sword) => void;
  onAddToCart: (sword: Sword, e: React.MouseEvent) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ sword, onSelect, onAddToCart }) => {
  return (
    <article
      onClick={() => onSelect(sword)}
      className="bg-white border border-gray-200 flex flex-col group cursor-pointer transition-all duration-200 hover:border-gray-300"
    >
      {/* Square Image Box matching reference gallery */}
      <div className="aspect-square w-full bg-[#f6f6f6] overflow-hidden relative border-b border-gray-200 flex items-center justify-center">
        <img
          alt={`${sword.code} ${sword.name}`}
          className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
          src={sword.imageUrl}
          loading="lazy"
        />

        {/* Subtle quick add on hover for enhanced utility */}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => onAddToCart(sword, e)}
            className="px-2.5 py-1 bg-white/95 hover:bg-white text-xs text-gray-800 font-medium rounded-sm border border-gray-200 shadow-sm transition-colors"
            title="Add to order"
          >
            + Add
          </button>
        </div>
      </div>

      {/* Product Details Box matching reference image */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 bg-white">
        <div>
          {/* Product Code */}
          <span className="text-xs text-gray-500 font-normal tracking-normal block mb-1">
            {sword.code}
          </span>

          {/* Product Title */}
          <h3 className="font-bold text-sm text-gray-900 leading-snug group-hover:text-amber-800 transition-colors line-clamp-2">
            {sword.name}
          </h3>
        </div>

        {/* Price */}
        <div className="mt-4 pt-1">
          <span className="text-sm font-normal text-gray-800">
            ${sword.price.toFixed(2)}
          </span>
        </div>
      </div>
    </article>
  );
};

