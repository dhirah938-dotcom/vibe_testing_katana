import React from 'react';
import { Sword } from '../types';
import { X, ShieldCheck, Truck, Award, Sparkles, ShoppingBag, MessageSquare } from 'lucide-react';

interface ProductDetailModalProps {
  sword: Sword | null;
  onClose: () => void;
  onAddToCart: (sword: Sword) => void;
  onAskSenseiAboutSword: (sword: Sword) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  sword,
  onClose,
  onAddToCart,
  onAskSenseiAboutSword,
}) => {
  if (!sword) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-4xl rounded-sm shadow-2xl border border-gray-200 overflow-hidden my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/90 hover:bg-gray-100 rounded-full text-gray-600 transition-colors border border-gray-200"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Image & Stand View */}
          <div className="bg-[#0E1012] p-6 flex flex-col justify-between items-center relative border-b md:border-b-0 md:border-r border-gray-800">
            <div className="w-full flex justify-between items-center text-xs text-stone-400 font-mono">
              <span>{sword.code}</span>
              <span className="text-[#C5A059] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                {sword.certificate}
              </span>
            </div>

            <div className="my-6 relative w-full aspect-[4/5] flex items-center justify-center overflow-hidden rounded">
              <img
                src={sword.imageUrl}
                alt={sword.name}
                className="w-full h-full object-contain filter contrast-105"
              />
              {sword.badge && (
                <span className="absolute top-3 left-3 bg-[#C5A059] text-slate-950 text-[11px] font-bold px-2.5 py-1 uppercase tracking-wider rounded-xs shadow-md">
                  {sword.badge.text}
                </span>
              )}
            </div>

            <div className="w-full text-center text-stone-400 text-xs py-2 bg-stone-900/60 rounded border border-stone-800">
              <span className="text-stone-300 font-medium">{sword.origin}</span> • {sword.smith}
            </div>
          </div>

          {/* Right Column: Spec & Collector Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto custom-scroll">
            <div>
              {/* Header */}
              <div className="mb-4">
                <span className="text-xs font-mono text-[#C5A059] tracking-widest uppercase">
                  {sword.category.toUpperCase()} • {sword.era}
                </span>
                <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                  {sword.name}
                </h2>
                {sword.japaneseName && (
                  <p className="text-sm text-stone-500 font-serif mt-0.5">{sword.japaneseName}</p>
                )}
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">{sword.subtitle}</p>
              </div>

              {/* Price & Status */}
              <div className="bg-stone-50 border border-gray-200 rounded p-4 mb-5 flex items-baseline justify-between">
                <div>
                  <span className="text-2xl font-bold text-slate-900 font-cinzel">
                    ${sword.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">USD (Tax & Transit Included)</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-emerald-700 block">
                    {sword.status}
                  </span>
                  <span className="text-[11px] text-[#C5A059]">
                    +{(sword.price * 0.05).toFixed(0)} loyalty points
                  </span>
                </div>
              </div>

              {/* Curator Description */}
              <div className="mb-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                  Curator Provenance Notes
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">{sword.fullDescription}</p>
              </div>

              {/* Specifications Matrix */}
              <div className="mb-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-2">
                  Technical Specifications
                </h4>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs border border-gray-200 rounded p-3 bg-gray-50/50">
                  <div>
                    <dt className="text-gray-400 font-medium">Steel Metallurgy</dt>
                    <dd className="text-slate-800 font-semibold">{sword.steel}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400 font-medium">Nagasa (Blade Length)</dt>
                    <dd className="text-slate-800 font-semibold">{sword.nagasa}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400 font-medium">Sori (Curvature)</dt>
                    <dd className="text-slate-800 font-semibold">{sword.sori}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400 font-medium">Hamon (Temper Line)</dt>
                    <dd className="text-slate-800 font-semibold">{sword.hamon}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400 font-medium">Tsuka (Hilt Wrap)</dt>
                    <dd className="text-slate-800">{sword.tsuka}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400 font-medium">Saya (Scabbard)</dt>
                    <dd className="text-slate-800">{sword.saya}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400 font-medium">Tsuba (Guard)</dt>
                    <dd className="text-slate-800">{sword.tsuba}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400 font-medium">Weight & Balance</dt>
                    <dd className="text-slate-800">
                      {sword.weight} • {sword.balancePoint}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-600 mb-6">
                <div className="flex items-center gap-1.5 p-2 bg-stone-100 rounded">
                  <Truck className="w-4 h-4 text-slate-700" />
                  <span>Insured FedEx/DHL Air Express</span>
                </div>
                <div className="flex items-center gap-1.5 p-2 bg-stone-100 rounded">
                  <Award className="w-4 h-4 text-[#C5A059]" />
                  <span>Torokusho Registration Copy</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  onAddToCart(sword);
                  onClose();
                }}
                className="w-full bg-[#1A1D20] text-white hover:bg-[#C5A059] font-medium py-3 px-4 rounded-xs transition-colors flex items-center justify-center gap-2 text-xs tracking-wider uppercase cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                Acquire Blade • ${sword.price.toFixed(2)}
              </button>

              <button
                onClick={() => {
                  onAskSenseiAboutSword(sword);
                  onClose();
                }}
                className="w-full border border-[#C5A059] text-[#9E7D3B] hover:bg-[#C5A059]/10 font-medium py-2.5 px-4 rounded-xs transition-colors flex items-center justify-center gap-2 text-xs tracking-wider cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                Ask AI Katana Sensei about this blade
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
