import React from 'react';
import { X, Sparkles, CheckCircle2, Shield } from 'lucide-react';

interface RestorationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RestorationModal: React.FC<RestorationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white max-w-2xl w-full rounded-sm shadow-2xl border border-gray-200 overflow-hidden relative animate-in zoom-in-95 duration-200">
        <div className="bg-[#1A1D20] text-white p-5 flex justify-between items-center border-b border-[#C5A059]/40">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#C5A059]" />
            <h3 className="font-cinzel text-lg font-bold">Certified Sword Restoration (Togi)</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 text-xs text-gray-700 space-y-4 max-h-[75vh] overflow-y-auto custom-scroll">
          <p className="leading-relaxed text-sm text-slate-800">
            Caesars Nihonto Guild partners directly with licensed Togishi (sword polishers) certified
            by the All Japan Swordsmith Association. We provide conservation-grade restoration for
            heirloom blades, Edo-period antiques, and shinsakuto.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
            <div className="border border-stone-200 bg-stone-50 p-3.5 rounded-sm">
              <h4 className="font-semibold text-slate-900 font-cinzel text-xs flex items-center gap-1.5 mb-1 text-[#9E7D3B]">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                Traditional Shitaji-Togi (Foundation)
              </h4>
              <p className="text-[11px] text-gray-600">
                Correction of edge nicks, rust pitting, and geometric leveling using Omura, Binsui,
                and Kaisei water stones.
              </p>
            </div>

            <div className="border border-stone-200 bg-stone-50 p-3.5 rounded-sm">
              <h4 className="font-semibold text-slate-900 font-cinzel text-xs flex items-center gap-1.5 mb-1 text-[#9E7D3B]">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                Shiage-Togi (Finishing & Hamon)
              </h4>
              <p className="text-[11px] text-gray-600">
                Hazuya and Jizuya wafer stones to bring out the nie, nioi, and delicate clouds of the
                temper line without removing excess steel.
              </p>
            </div>

            <div className="border border-stone-200 bg-stone-50 p-3.5 rounded-sm">
              <h4 className="font-semibold text-slate-900 font-cinzel text-xs flex items-center gap-1.5 mb-1 text-[#9E7D3B]">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                Tsuka-Ito Rewrapping & Same
              </h4>
              <p className="text-[11px] text-gray-600">
                Authentic silk or deerskin braid with hishigami paper folds over unbleached Japanese
                ray skin.
              </p>
            </div>

            <div className="border border-stone-200 bg-stone-50 p-3.5 rounded-sm">
              <h4 className="font-semibold text-slate-900 font-cinzel text-xs flex items-center gap-1.5 mb-1 text-[#9E7D3B]">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                Shirasaya Magnolia Wood Carving
              </h4>
              <p className="text-[11px] text-gray-600">
                Bespoke untreated Honoki wood resting mounts tailored to your blade’s exact sori and
                motohaba to safeguard against humidity.
              </p>
            </div>
          </div>

          <div className="bg-stone-100 p-3.5 rounded border border-stone-300 flex items-center gap-3">
            <Shield className="w-5 h-5 text-[#9E7D3B] flex-shrink-0" />
            <span className="text-[11px] text-stone-700">
              Every sword submitted receives a photographic inspection report and condition rating
              prior to touch-up work.
            </span>
          </div>
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#1A1D20] hover:bg-[#C5A059] text-white text-xs font-semibold uppercase tracking-wider rounded-xs cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
