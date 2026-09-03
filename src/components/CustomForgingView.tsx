import React, { useState } from 'react';
import { Hammer, Sparkles, Check, ShoppingBag } from 'lucide-react';
import { Sword } from '../types';

interface CustomForgingViewProps {
  onAddCustomSword: (sword: Sword) => void;
}

export const CustomForgingView: React.FC<CustomForgingViewProps> = ({ onAddCustomSword }) => {
  const [steel, setSteel] = useState('1095 Clay-Tempered');
  const [hamon, setHamon] = useState('Midare Choji (Clove blossom)');
  const [wrap, setWrap] = useState('Black Japanese Silk (Kuro-ito)');
  const [tsuba, setTsuba] = useState('Water Dragon Bronze (Mizuchi)');
  const [engraving, setEngraving] = useState('');
  const [ordered, setOrdered] = useState(false);

  const calculateCustomPrice = () => {
    let base = 350;
    if (steel.includes('Tamahagane')) base += 450;
    if (steel.includes('Folded T10')) base += 220;
    if (engraving.trim()) base += 45;
    return base;
  };

  const handleCreateCommission = () => {
    const customSword: Sword = {
      id: `CUSTOM-${Date.now().toString().slice(-4)}`,
      code: `CS-${Date.now().toString().slice(-4)}`,
      name: `Bespoke Guild Katana (${engraving || 'Master Work'})`,
      japaneseName: '特注 打刀 銘入',
      subtitle: `${steel} blade with ${hamon} and ${tsuba}`,
      price: calculateCustomPrice(),
      status: 'Custom Forge Order • 6-8 Weeks',
      statusType: 'stock',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDiV4pWHtcNzKnxQV3Ns0VVevn-Tf59XsmB_NEiX_vSpgzU8x8dMtswkYj0Bk2ev7iHsWNxUpj_F5phmtlwGZWWTHMsKUlhZen1a2ib43bMFDz6oaNhMpt_EI-PH0ChHc1F4DFZqXMkkXrPPIGwg_5tp1RHrD0BW6BEv3NraZ89Wpvn_u6WFtFmiqpUTu-CC31Zp32k1HZZWyoD2aclWs6HCd5UaavVRsQHwR1SBceuhvBiWOmMz1fwpexCi_y1n7-aLPg',
      category: 'custom',
      steel: steel,
      nagasa: '73 cm (2.41 shaku)',
      sori: '1.9 cm Torii-sori',
      hamon: hamon,
      tsuka: wrap,
      saya: 'Hand-rubbed Kuro-urushi Japanese lacquer',
      tsuba: tsuba,
      smith: 'Seki Master Guild Artisans',
      origin: 'Gifu Prefecture, Japan',
      era: 'Modern Bespoke Commission',
      certificate: 'Guild Certified',
      brand: 'Caesars Guild',
      weight: '1,100g configured',
      balancePoint: '12 cm',
      fullDescription: `Commissioned bespoke blade tailored with ${steel}, authentic clay-tempered ${hamon}, hilt wrapped in ${wrap}, and brass ${tsuba}. ${engraving ? `Tang hand-chiseled with custom kanji: "${engraving}".` : ''}`,
      inStock: true,
    };

    onAddCustomSword(customSword);
    setOrdered(true);
    setTimeout(() => setOrdered(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 animate-in fade-in">
      <div className="text-center mb-8">
        <span className="text-xs uppercase font-mono tracking-widest text-[#C5A059]">
          Artisan Atelier
        </span>
        <h2 className="font-cinzel text-3xl font-bold text-slate-900 mt-1">
          Bespoke Nihonto Commission
        </h2>
        <p className="text-xs text-gray-600 max-w-xl mx-auto mt-2">
          Specify your metallurgy, temper geometry, fittings, and custom tang inscription. Hand-forged by licensed Japanese smiths in Seki City.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white border border-gray-200 p-6 sm:p-8 rounded-sm shadow-sm">
        <div className="space-y-5">
          {/* Steel selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-900 mb-1.5">
              1. Blade Metallurgy (Tamahagane &amp; Steel)
            </label>
            <div className="space-y-2">
              {[
                { name: '1095 Clay-Tempered Carbon', desc: 'Differential clay yakire, razor sharp edge' },
                { name: 'Folded T10 High Tool Steel (1,024 folds)', desc: 'Pronounced hada grain, superb toughness' },
                { name: 'Authentic Tatara Tamahagane Iron Sand', desc: 'Traditional 3-day smelter ore, museum collectible' },
              ].map((s) => (
                <button
                  key={s.name}
                  onClick={() => setSteel(s.name)}
                  className={`w-full text-left p-3 text-xs border rounded transition-all cursor-pointer ${
                    steel === s.name
                      ? 'border-[#C5A059] bg-[#C5A059]/10 text-slate-900 font-semibold'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{s.name}</span>
                    {steel === s.name && <Check className="w-4 h-4 text-[#C5A059]" />}
                  </div>
                  <span className="text-[11px] text-gray-500 block mt-0.5">{s.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Hamon selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-900 mb-1.5">
              2. Temper Wave Pattern (Hamon 刃文)
            </label>
            <select
              value={hamon}
              onChange={(e) => setHamon(e.target.value)}
              className="w-full text-xs border border-gray-300 rounded p-2.5 bg-white text-slate-800"
            >
              <option>Midare Choji (Clove blossom undulating wave)</option>
              <option>Suguha (Crisp classical straight line)</option>
              <option>Sanbonsugi (Iconic Magoroku three-cedar peak wave)</option>
              <option>Notare (Gentle ocean rolling swell)</option>
            </select>
          </div>

          {/* Tsuka wrap */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-900 mb-1.5">
              3. Handle Wrap (Tsuka-Ito 柄糸)
            </label>
            <select
              value={wrap}
              onChange={(e) => setWrap(e.target.value)}
              className="w-full text-xs border border-gray-300 rounded p-2.5 bg-white text-slate-800"
            >
              <option>Black Japanese Silk (Kuro-ito) over white ray skin</option>
              <option>Teal / Azure Raw Silk (Seiryu style)</option>
              <option>Vermillion Crimson Braid (Aki Autumn style)</option>
              <option>Natural Smoked Leather with hishigami paper padding</option>
            </select>
          </div>

          {/* Tsuba guard */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-900 mb-1.5">
              4. Handguard Motif (Tsuba 鍔)
            </label>
            <select
              value={tsuba}
              onChange={(e) => setTsuba(e.target.value)}
              className="w-full text-xs border border-gray-300 rounded p-2.5 bg-white text-slate-800"
            >
              <option>Water Dragon Bronze (Mizuchi)</option>
              <option>Fudo Myo-o Buddhist Wisdom Flames</option>
              <option>Pierced Iron Wave (Tsuchikaze style)</option>
              <option>Hattori Hanzo Engraved Lion Crest</option>
              <option>Gilded Lotus Blossom &amp; Dewdrop</option>
            </select>
          </div>

          {/* Horimono Engraving */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-900 mb-1">
              5. Custom Tang or Blade Engraving (Optional)
            </label>
            <input
              type="text"
              value={engraving}
              onChange={(e) => setEngraving(e.target.value)}
              placeholder="e.g., 武士道 (Bushido) or Clan Mon / Family Name"
              className="w-full text-xs border border-gray-300 rounded p-2.5 text-slate-900"
            />
          </div>
        </div>

        {/* Preview and Order Summary */}
        <div className="bg-stone-50 p-6 rounded border border-stone-200 flex flex-col justify-between">
          <div>
            <h3 className="font-cinzel text-base font-bold text-slate-900 mb-4 pb-2 border-b border-stone-200">
              Commission Specification
            </h3>

            <dl className="space-y-2.5 text-xs text-stone-700 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-500">Core Steel:</span>
                <span className="font-semibold text-right max-w-[60%]">{steel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Hamon Type:</span>
                <span className="font-semibold text-right max-w-[60%]">{hamon}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Hilt Wrap:</span>
                <span className="font-semibold text-right max-w-[60%]">{wrap}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Guard Design:</span>
                <span className="font-semibold text-right max-w-[60%]">{tsuba}</span>
              </div>
              {engraving && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Tang Chisel:</span>
                  <span className="font-mono text-[#9E7D3B] font-bold">{engraving}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-stone-200">
                <span className="text-gray-500">Lead Time:</span>
                <span className="text-stone-800">6–8 Weeks via DHL Air Express</span>
              </div>
            </dl>

            <div className="bg-white p-4 rounded border border-stone-300 mb-6">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-gray-500 uppercase font-mono">Commission Quote:</span>
                <span className="font-cinzel text-2xl font-bold text-slate-900">
                  ${calculateCustomPrice().toFixed(2)} USD
                </span>
              </div>
              <span className="text-[11px] text-[#C5A059] block mt-1">
                Includes Torokusho export papers, silk bag &amp; certificate
              </span>
            </div>
          </div>

          <button
            onClick={handleCreateCommission}
            className="w-full bg-[#1A1D20] hover:bg-[#C5A059] text-white font-medium py-3 px-4 rounded-xs transition-colors flex items-center justify-center gap-2 text-xs tracking-wider uppercase cursor-pointer"
          >
            {ordered ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                Commission Added to Vault!
              </>
            ) : (
              <>
                <Hammer className="w-4 h-4" />
                Submit Forging Order to Vault
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
