import React from 'react';
import { ShieldCheck, Coins, Sparkles, Globe } from 'lucide-react';

interface StrategicValuePillarsProps {
  onOpenRestoration: () => void;
  onOpenAuthentication: () => void;
}

export const StrategicValuePillars: React.FC<StrategicValuePillarsProps> = ({
  onOpenRestoration,
  onOpenAuthentication,
}) => {
  return (
    <section
      className="bg-stone-900 text-stone-200 py-16 border-t border-[#C5A059]/40 mt-16"
      data-purpose="bmc-value-propositions"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-mono tracking-widest text-[#C5A059]">
            Guild Integrity &amp; Standard
          </span>
          <h3 className="font-cinzel text-2xl sm:text-3xl text-white mt-1 uppercase">
            Sourced Directly From Japanese Artisans
          </h3>
          <p className="text-xs text-stone-400 mt-2 leading-relaxed">
            Connecting traditional swordsmiths in Japan with passionate worldwide collectors, backed
            by official provenance paperwork.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-8">
          {/* Pillar 1: Nihonto Craftsmen Direct */}
          <div
            onClick={onOpenAuthentication}
            className="border border-stone-800 p-6 bg-stone-950/60 rounded-xs hover:border-[#C5A059]/50 transition-colors cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-[#C5A059]/20 flex items-center justify-center text-[#C5A059] mb-4 group-hover:bg-[#C5A059] group-hover:text-stone-950 transition-colors">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-cinzel text-sm font-semibold text-stone-100 tracking-wider group-hover:text-[#C5A059] transition-colors">
              Proper Authentication
            </h4>
            <p className="text-xs text-stone-400 mt-2 leading-relaxed font-light">
              Every sword comes with verified certification of maker origin, steel composition
              analysis, and registered serial stamping.
            </p>
          </div>

          {/* Pillar 2: Liquidation & Direct Buying */}
          <div className="border border-stone-800 p-6 bg-stone-950/60 rounded-xs hover:border-[#C5A059]/50 transition-colors cursor-pointer group">
            <div className="w-10 h-10 rounded-full bg-[#C5A059]/20 flex items-center justify-center text-[#C5A059] mb-4 group-hover:bg-[#C5A059] group-hover:text-stone-950 transition-colors">
              <Coins className="w-5 h-5" />
            </div>
            <h4 className="font-cinzel text-sm font-semibold text-stone-100 tracking-wider group-hover:text-[#C5A059] transition-colors">
              Fair Acquisition &amp; Pricing
            </h4>
            <p className="text-xs text-stone-400 mt-2 leading-relaxed font-light">
              Offering the best price to buy over finances from collectors looking to liquidate
              heirlooms, ensuring competitive prices for buyers.
            </p>
          </div>

          {/* Pillar 3: Professional Restoration */}
          <div
            onClick={onOpenRestoration}
            className="border border-stone-800 p-6 bg-stone-950/60 rounded-xs hover:border-[#C5A059]/50 transition-colors cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-[#C5A059]/20 flex items-center justify-center text-[#C5A059] mb-4 group-hover:bg-[#C5A059] group-hover:text-stone-950 transition-colors">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-cinzel text-sm font-semibold text-stone-100 tracking-wider group-hover:text-[#C5A059] transition-colors">
              Certified Restoration
            </h4>
            <p className="text-xs text-stone-400 mt-2 leading-relaxed font-light">
              Full traditional togi (stone polishing), tsuka-ito rewinding, shirasaya crafting, and
              rust remediation by certified artisans.
            </p>
          </div>

          {/* Pillar 4: Logistics & Concierge */}
          <div className="border border-stone-800 p-6 bg-stone-950/60 rounded-xs hover:border-[#C5A059]/50 transition-colors cursor-pointer group">
            <div className="w-10 h-10 rounded-full bg-[#C5A059]/20 flex items-center justify-center text-[#C5A059] mb-4 group-hover:bg-[#C5A059] group-hover:text-stone-950 transition-colors">
              <Globe className="w-5 h-5" />
            </div>
            <h4 className="font-cinzel text-sm font-semibold text-stone-100 tracking-wider group-hover:text-[#C5A059] transition-colors">
              Global Customs &amp; Transit
            </h4>
            <p className="text-xs text-stone-400 mt-2 leading-relaxed font-light">
              Specialized courier handling with DHL/FedEx, legal export documentation, and customs
              clearance pre-approval included.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
