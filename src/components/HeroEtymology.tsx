import React from 'react';
import { FilterCategory } from '../types';

interface HeroEtymologyProps {
  currentCategory: FilterCategory;
  onSelectCategory: (cat: FilterCategory) => void;
}

const CATEGORY_INFO: Record<
  FilterCategory,
  { title: string; subtitle: React.ReactNode; breadcrumb: string }
> = {
  all: {
    title: 'Nihonto Gallery',
    subtitle: (
      <>
        Authentic Japanese master swords forged in strict compliance with the Society for the
        Preservation of Japanese Art Swords (NBTHK) standards.
      </>
    ),
    breadcrumb: 'All Blades',
  },
  katana: {
    title: 'Katana',
    subtitle: (
      <>
        A compound of <em>kata</em> (“one-sided”) + <em>na</em> (“blade”).
        <br className="hidden sm:inline" />
        {' '}Used by the samurai in feudal Japan and worn with the edge faced upwards. The exact term
        for it in Japan is <em>uchigatana</em> (打刀). It is defined as the standard sized Japanese
        sword with blade length of more than 60cm.
      </>
    ),
    breadcrumb: 'Katana',
  },
  wakizashi: {
    title: 'Wakizashi & Tanto',
    subtitle: (
      <>
        The companion sidearm worn alongside the katana, forming the classic <em>Daisho</em> pair.
        <br className="hidden sm:inline" />
        Blade length ranges from 30cm to 60cm for Wakizashi, while Tanto daggers feature compact
        blades designed for close-quarter tactical defense and ceremonial honor.
      </>
    ),
    breadcrumb: 'Wakizashi & Tanto',
  },
  iaito: {
    title: 'Iaito & Shinken',
    subtitle: (
      <>
        Dedicated practice and live-cutting blades tuned for martial artists in Iaido, Kendo, and
        Battojutsu.
        <br className="hidden sm:inline" />
        Features precision point of balance, custom tsuka ergonomics, and authentic audible tachikaze
        grooves.
      </>
    ),
    breadcrumb: 'Iaito & Shinken',
  },
  antique: {
    title: 'Antique Heirlooms',
    subtitle: (
      <>
        Historic Muromachi, Edo, and Meiji period Nihonto registered under the Japanese Agency for
        Cultural Affairs (Torokusho).
        <br className="hidden sm:inline" />
        Preserved in pristine shirasaya wood mounts with original signatures (Mei) and NBTHK appraisal
        papers.
      </>
    ),
    breadcrumb: 'Antique Heirlooms',
  },
  custom: {
    title: 'Custom Forging',
    subtitle: (
      <>
        Commission a bespoke samurai sword hand-forged by licensed guild smiths in Seki and Bizen.
        <br className="hidden sm:inline" />
        Select your steel metallurgy, clay-tempered hamon wave, genuine ray skin colors, and hand-cast
        tsuba guard motifs.
      </>
    ),
    breadcrumb: 'Custom Forging',
  },
  authentication: {
    title: 'Provenance & Authentication',
    subtitle: (
      <>
        Verify the provenance, registration certificates, and metallurgical authenticity of swords
        within the Caesars Nihonto Guild database.
      </>
    ),
    breadcrumb: 'Authentication',
  },
};

export const HeroEtymology: React.FC<HeroEtymologyProps> = ({
  currentCategory,
  onSelectCategory,
}) => {
  const info = CATEGORY_INFO[currentCategory] || CATEGORY_INFO.katana;

  return (
    <section
      className="pt-10 pb-8 text-center bg-gradient-to-b from-[#FAF9F6] to-white border-b border-gray-200"
      data-purpose="category-intro"
    >
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="font-cinzel text-4xl sm:text-5xl font-normal text-[#1A1D20] tracking-wide mb-3 uppercase">
          {info.title}
        </h1>

        {/* Linguistic & Historic Etymology definition from catalog reference */}
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-2xl mx-auto mb-5 font-light">
          {info.subtitle}
        </p>

        {/* Breadcrumbs navigation */}
        <nav
          aria-label="Breadcrumb"
          className="text-xs tracking-wider uppercase text-gray-400 font-medium"
        >
          <ol className="inline-flex items-center space-x-2">
            <li>
              <button
                onClick={() => onSelectCategory('katana')}
                className="hover:text-[#C5A059] transition-colors cursor-pointer"
              >
                Home
              </button>
            </li>
            <li className="text-gray-300">/</li>
            <li>
              <button
                onClick={() => onSelectCategory('katana')}
                className="hover:text-[#C5A059] transition-colors cursor-pointer"
              >
                Shop Now
              </button>
            </li>
            <li className="text-gray-300">/</li>
            <li>
              <span className="text-gray-400">Japanese</span>
            </li>
            <li className="text-gray-300">/</li>
            <li aria-current="page" className="text-slate-800 font-semibold">
              {info.breadcrumb}
            </li>
          </ol>
        </nav>
      </div>
    </section>
  );
};
