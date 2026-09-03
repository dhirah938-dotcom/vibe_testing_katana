import React, { useState } from 'react';
import { ShieldCheck, Search, Award, FileCheck, CheckCircle2 } from 'lucide-react';
import { SWORDS_DATABASE } from '../data/swords';
import { Sword } from '../types';

interface AuthenticationViewProps {
  onSelectSword: (sword: Sword) => void;
}

export const AuthenticationView: React.FC<AuthenticationViewProps> = ({ onSelectSword }) => {
  const [query, setQuery] = useState('Z9505');
  const [matchedBlade, setMatchedBlade] = useState<Sword | null>(
    SWORDS_DATABASE.find((s) => s.code === 'Z9505') || null
  );
  const [searched, setSearched] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const q = query.trim().toUpperCase();
    const found = SWORDS_DATABASE.find(
      (s) => s.code.toUpperCase() === q || s.id.toUpperCase() === q || s.name.toUpperCase().includes(q)
    );
    setMatchedBlade(found || null);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 animate-in fade-in">
      <div className="text-center mb-8">
        <span className="text-xs uppercase font-mono tracking-widest text-[#C5A059]">
          Provenance Registry
        </span>
        <h2 className="font-cinzel text-3xl font-bold text-slate-900 mt-1">
          Nihonto Serial &amp; Torokusho Verification
        </h2>
        <p className="text-xs text-gray-600 max-w-xl mx-auto mt-2">
          Verify registered serial numbers, NBTHK papers, and smith guild provenance across the Caesars Nihonto Registry.
        </p>
      </div>

      {/* Verification Lookup Input */}
      <form
        onSubmit={handleSearch}
        className="max-w-xl mx-auto mb-8 flex gap-2 bg-white p-2 rounded border border-gray-300 shadow-xs"
      >
        <div className="flex-1 flex items-center pl-2">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter Blade Code (e.g. Z9505, HBC0613, CA104, ZBYNK55)..."
            className="w-full text-xs sm:text-sm text-slate-900 placeholder-gray-400 border-0 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="bg-[#1A1D20] hover:bg-[#C5A059] text-white text-xs font-semibold py-2 px-5 rounded-xs transition-colors tracking-wider uppercase cursor-pointer"
        >
          Verify
        </button>
      </form>

      {/* Verification Certificate Result */}
      {matchedBlade ? (
        <div className="bg-[#FAF9F6] border-2 border-[#C5A059]/50 p-6 sm:p-8 rounded-sm shadow-md relative">
          <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-800 text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Active Guild Registered
          </div>

          <div className="flex items-center gap-2 text-[#C5A059] font-cinzel text-xs uppercase tracking-widest mb-1">
            <ShieldCheck className="w-4 h-4" />
            Official Certificate of Provenance
          </div>

          <h3 className="font-cinzel text-2xl font-bold text-slate-900 mb-1">
            {matchedBlade.name}
          </h3>
          <p className="text-xs font-mono text-gray-500 mb-6">
            Registry Code: <span className="text-slate-900 font-bold">{matchedBlade.code}</span> • Prefecture Registration: #TOK-2024-{matchedBlade.id}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs mb-6">
            <div className="bg-white p-3 border border-stone-200 rounded">
              <span className="text-gray-400 block text-[10px] uppercase font-mono">Master Smith &amp; Forge</span>
              <span className="font-semibold text-slate-900 block mt-0.5">{matchedBlade.smith}</span>
              <span className="text-gray-500 text-[11px]">{matchedBlade.origin}</span>
            </div>

            <div className="bg-white p-3 border border-stone-200 rounded">
              <span className="text-gray-400 block text-[10px] uppercase font-mono">Steel Metallurgy</span>
              <span className="font-semibold text-slate-900 block mt-0.5">{matchedBlade.steel}</span>
              <span className="text-gray-500 text-[11px]">{matchedBlade.era}</span>
            </div>

            <div className="bg-white p-3 border border-stone-200 rounded">
              <span className="text-gray-400 block text-[10px] uppercase font-mono">Guild Appraisal Tier</span>
              <span className="font-semibold text-[#9E7D3B] block mt-0.5">{matchedBlade.certificate}</span>
              <span className="text-emerald-700 text-[11px]">Torokusho Cleared</span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-stone-200">
            <span className="text-xs text-gray-500">
              Verified by Caesars Nihonto Guild Archive, Seki Swordsmith Bureau.
            </span>
            <button
              onClick={() => onSelectSword(matchedBlade)}
              className="text-xs font-semibold text-[#9E7D3B] hover:text-[#C5A059] border border-[#C5A059] px-4 py-2 rounded-xs transition-colors"
            >
              Inspect Blade Dossier →
            </button>
          </div>
        </div>
      ) : searched ? (
        <div className="text-center p-8 bg-white border border-gray-200 rounded-sm">
          <p className="text-slate-700 font-medium text-sm mb-1">No registration found for "{query}"</p>
          <p className="text-xs text-gray-500 mb-4">
            Try searching standard codes such as Z9505, CA104, CA101, SW-320DX, or HBC0613.
          </p>
          <div className="flex justify-center gap-2">
            {['Z9505', 'CA104', 'HBC0613', 'ZBYNK55'].map((code) => (
              <button
                key={code}
                onClick={() => {
                  setQuery(code);
                  setMatchedBlade(SWORDS_DATABASE.find((s) => s.code === code) || null);
                }}
                className="px-2.5 py-1 text-xs bg-stone-100 hover:bg-stone-200 rounded text-stone-700 font-mono"
              >
                {code}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};
