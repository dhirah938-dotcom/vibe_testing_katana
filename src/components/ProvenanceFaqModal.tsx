import React, { useState } from 'react';
import { X, HelpCircle, ChevronDown } from 'lucide-react';

interface ProvenanceFaqModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FAQS = [
  {
    q: 'What is Torokusho (銃砲刀剣類登録証) and why does it matter?',
    a: 'Torokusho is the official registration card issued by the Japanese Prefectural Education Board under the Agency for Cultural Affairs. In Japan, authentic Nihonto are registered as precious cultural works of art. Before a registered sword can be exported, our guild submits the Torokusho to the government to obtain a formal Kokuhou/Bijutsuhin export license, ensuring legal export and unassailable pedigree.',
  },
  {
    q: 'Are these swords legal to own in the United States, Europe, and Australia?',
    a: 'Yes. In the United States and European Union, authentic samurai swords and collectible blades are completely legal for adult private collectors to purchase, display, and possess. We ship via DHL Express with complete documentation and customs pre-clearance. For the UK, swords hand-forged via traditional methods are exempt from curved blade restrictions.',
  },
  {
    q: 'What distinguishes NBTHK papers (Hozon, Tokubetsu Hozon, Juyo)?',
    a: 'The NBTHK (The Society for the Preservation of Japanese Art Swords) in Tokyo holds periodic appraisal sessions. Hozon ("Worthy of Preservation") verifies that the sword is authentic and without major flaws. Tokubetsu Hozon signifies high artistic merit, while Juyo Token denotes cultural significance of museum caliber.',
  },
  {
    q: 'How does Caesars Nihonto Guild calculate the 5% Loyalty Points?',
    a: 'Registered members receive 5% back on every verified blade purchase. Points can be directly redeemed on subsequent acquisitions, custom tsuka-ito rewinding, togi stone polishing services, or museum display stands.',
  },
  {
    q: 'How are antique heirloom swords inspected before dispatch?',
    a: 'Each antique sword is stripped to the bare tang (nakago) to inspect the signature (mei), chisel marks (yasurime), and age patina. The blade is ultrasonically examined for internal flaws (hagire), certified, and coated with micro-filtered Choji oil before vacuum sealing in silk.',
  },
];

export const ProvenanceFaqModal: React.FC<ProvenanceFaqModalProps> = ({ isOpen, onClose }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white max-w-2xl w-full rounded-sm shadow-2xl border border-gray-200 overflow-hidden relative animate-in zoom-in-95 duration-200">
        <div className="bg-[#1A1D20] text-white p-5 flex justify-between items-center border-b border-[#C5A059]/40">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#C5A059]" />
            <h3 className="font-cinzel text-lg font-bold">Provenance &amp; Regulatory FAQs</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 text-xs text-gray-700 space-y-3 max-h-[75vh] overflow-y-auto custom-scroll">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="border border-stone-200 rounded-sm overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full text-left p-3.5 bg-stone-50 hover:bg-stone-100 flex justify-between items-center transition-colors font-semibold text-slate-900 text-xs"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-stone-400 transition-transform ${
                    openIndex === idx ? 'rotate-180 text-[#C5A059]' : ''
                  }`}
                />
              </button>
              {openIndex === idx && (
                <div className="p-3.5 bg-white text-gray-600 leading-relaxed text-xs border-t border-stone-100">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
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
