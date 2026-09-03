import React from 'react';
import { FilterCategory } from '../types';

interface FooterProps {
  onSelectCategory: (cat: FilterCategory) => void;
  onOpenRestoration: () => void;
  onOpenProvenanceFaq: () => void;
  onOpenAuthentication: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenRestoration,
  onOpenProvenanceFaq,
  onOpenAuthentication,
}) => {
  return (
    <footer className="bg-[#121416] text-gray-400 text-xs border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h5 className="font-cinzel text-white text-sm font-semibold tracking-wider mb-3">
              CAESARS / NIHONTO
            </h5>
            <p className="text-stone-400 leading-relaxed text-[11px]">
              Official purveyor of authentic Japanese swords, licensed antique uchigatana, and
              hand-forged ceremonial blades direct from Japanese guild smiths.
            </p>
          </div>

          <div>
            <h5 className="text-white font-medium uppercase tracking-wider text-[11px] mb-3">
              Community Channels
            </h5>
            <ul className="space-y-2 text-[11px]">
              <li>
                <a
                  href="#reddit-community"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open('https://reddit.com/r/iaido', '_blank');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Reddit Sword Collector Community
                </a>
              </li>
              <li>
                <a
                  href="#instagram"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open('https://instagram.com', '_blank');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Instagram Artisan Highlights
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenProvenanceFaq}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Monthly Knowledge Newsletter
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAuthentication}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Heirloom Liquidation Registry
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-medium uppercase tracking-wider text-[11px] mb-3">
              Collector Services
            </h5>
            <ul className="space-y-2 text-[11px]">
              <li>
                <button
                  onClick={onOpenAuthentication}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  NBTHK Paper Authentication
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenRestoration}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Traditional Polishing (Togi)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAuthentication}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Sell or Consign Your Sword
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenProvenanceFaq}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Member Loyalty Rewards
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-medium uppercase tracking-wider text-[11px] mb-3">
              Legal &amp; Compliance
            </h5>
            <p className="text-[11px] text-stone-400 mb-3 leading-relaxed">
              All authentic blades adhere to the Japanese Torokusho fire and sword registration act
              and global customs guidelines.
            </p>
            <span className="text-[10px] text-stone-500 block">
              © 2024 Caesars Nihonto Guild. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
