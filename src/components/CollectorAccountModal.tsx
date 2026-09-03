import React from 'react';
import { X, Award, ShieldCheck, Clock, UserCheck } from 'lucide-react';

interface CollectorAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  earnedPoints: number;
}

export const CollectorAccountModal: React.FC<CollectorAccountModalProps> = ({
  isOpen,
  onClose,
  earnedPoints,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white max-w-lg w-full rounded-sm shadow-2xl border border-gray-200 overflow-hidden relative animate-in zoom-in-95 duration-200">
        <div className="bg-[#1A1D20] text-white p-5 flex justify-between items-center border-b border-[#C5A059]/40">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-[#C5A059]" />
            <h3 className="font-cinzel text-lg font-bold">Guild Collector Dossier</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 text-xs text-gray-700 space-y-4">
          <div className="flex items-center gap-3 p-3 bg-stone-50 border border-stone-200 rounded">
            <div className="w-12 h-12 bg-[#1A1D20] text-[#C5A059] rounded-full flex items-center justify-center font-cinzel text-lg font-bold border border-[#C5A059]/50">
              刀
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 text-sm">Honored Patron Collector</h4>
              <p className="text-[11px] text-gray-500">Member ID: CN-9824-TOK • Verified Tier</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="border border-stone-200 p-3 rounded bg-stone-50/50">
              <span className="text-gray-400 block text-[10px] uppercase font-mono">
                Loyalty Points Balance
              </span>
              <span className="font-cinzel text-xl font-bold text-[#C5A059]">
                {140 + earnedPoints} pts
              </span>
              <span className="text-[10px] text-gray-500 block mt-0.5">
                (${( (140 + earnedPoints) * 0.5 ).toFixed(2)} USD value)
              </span>
            </div>
            <div className="border border-stone-200 p-3 rounded bg-stone-50/50">
              <span className="text-gray-400 block text-[10px] uppercase font-mono">
                Vault Status
              </span>
              <span className="font-semibold text-slate-900 text-sm block">NBTHK Registered</span>
              <span className="text-[10px] text-emerald-700 block mt-0.5">VIP DHL Courier Tier</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <h5 className="font-semibold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
              Registered Authentication Documents
            </h5>
            <div className="border border-gray-200 rounded p-2.5 text-xs flex justify-between items-center bg-white">
              <div>
                <span className="font-medium text-slate-900 block">Torokusho 銃砲刀剣類登録証 #48102</span>
                <span className="text-[10px] text-gray-500">Mino Province • Nobuhiro Tang Inscription</span>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium">
                Active
              </span>
            </div>
          </div>

          <div className="bg-amber-50/80 border border-amber-200 rounded p-3 text-[11px] text-amber-900 flex items-start gap-2">
            <Award className="w-4 h-4 text-[#9E7D3B] mt-0.5 flex-shrink-0" />
            <span>
              As a Guild Collector, you receive complimentary annual tsuba re-patination and
              concierge inspection from our Seki craftsmen.
            </span>
          </div>
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#1A1D20] hover:bg-[#C5A059] text-white text-xs font-semibold uppercase tracking-wider rounded-xs cursor-pointer transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
