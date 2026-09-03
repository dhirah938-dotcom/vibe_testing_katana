import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, BookOpen, ShieldCheck, HelpCircle } from 'lucide-react';
import { Sword } from '../types';

interface Message {
  id: string;
  sender: 'user' | 'sensei';
  text: string;
  timestamp: string;
}

interface SenseiChatbotProps {
  initialQuestion?: string | null;
  onClearInitialQuestion?: () => void;
  swords: Sword[];
  onSelectSword: (sword: Sword) => void;
}

const KNOWLEDGE_RESPONSES: { keywords: string[]; answer: string }[] = [
  {
    keywords: ['legal', 'import', 'customs', 'law', 'usa', 'uk', 'europe', 'australia', 'ship'],
    answer:
      '🥋 Hai. Regarding international legalities and customs: Under the Japanese Firearm and Sword Possession Control Law (Juho-to), authentic Nihonto are legally classified as traditional works of art (Bijutsu-hin), not restricted weapons. Caesars Nihonto Guild prepares official Torokusho deregistration permits and Ministry of Cultural Affairs export licenses prior to dispatch. For the USA and EU, traditional swords are 100% legal for adult collectors and shipped via insured DHL/FedEx Express with customs pre-clearance.',
  },
  {
    keywords: ['tamahagane', 'steel', '1095', 't10', 'folded', 'metal'],
    answer:
      '🗡️ Excellent inquiry. Tatara Tamahagane (玉鋼, "jewel steel") is the legendary iron sand smelted over three days and nights in traditional clay furnaces (Tatara) in Shimane. It possesses unique carbon gradient variations and crystalline nie/nioi particles. In contrast, modern high-carbon steels like 1095 and T10 offer incredible resilience and edge retention at an accessible price point, differentially clay-tempered to replicate ancient hamon lines.',
  },
  {
    keywords: ['clean', 'oil', 'care', 'maintenance', 'rust', 'choji', 'uchiko'],
    answer:
      '🌸 Traditional blade maintenance (Token-Togi & Teire): A Nihonto blade must never be touched with bare skin, as skin acidity oxidizes the steel. Apply mineral Choji (clove) oil sparingly every 3–6 months. Use natural unbleached washi paper to wipe clean, and gently apply the uchiko powder ball only when removing dried old oil. Never use commercial metal polishes, as they destroy the microscopic hamon grain.',
  },
  {
    keywords: ['nbthk', 'paper', 'certificate', 'registration', 'torokusho', 'verify'],
    answer:
      '📜 The NBTHK (Nihon Bijutsu Token Hozon Kyokai - Society for the Preservation of Japanese Art Swords) is the paramount certifying authority in Tokyo. Papers range from Hozon (Worthy of Preservation) to Tokubetsu Juyo (Special Important). Every antique sword in our vault comes with its verified prefecture Torokusho registration card number and guild provenance documentation.',
  },
  {
    keywords: ['recommend', 'beginner', 'first', 'start', 'which', 'practice'],
    answer:
      '⚔️ For dedicated martial practice (Iaido / Battojutsu), I strongly recommend the Kihon Kiyo (CA101) or the Dojo Iaito (IA-405) due to their neutral balance and forgiving clay-tempered edge. For display and artistic reverence, the Black Zatoichi (Z9505) or the hand-lacquered Kujaku Katana (Z9231) represent pinnacle craftsmanship.',
  },
  {
    keywords: ['zatoichi', 'z9505', 'shirasaya'],
    answer:
      '⚔️ The Black Zatoichi (Z9505) features an ebony hardwood Shirasaya (resting scabbard) build. Originally used by samurai to rest blades safely without decorative fittings, its concealed seamless joinery makes it an iconic collector piece. Clay-tempered 1095 carbon steel with genuine suguha temper.',
  },
  {
    keywords: ['kill bill', 'bride', 'sw-320dx', 'hattori', 'hanzo'],
    answer:
      '🗡️ The Bride Sword (SW-320DX) is hand-forged from 1095 carbon steel with the iconic Hattori Hanzo lion emblem deeply carved into the blade collar and scabbard. It includes a traditional silk storage bag and gold-foil lion crest.',
  },
];

export const SenseiChatbot: React.FC<SenseiChatbotProps> = ({
  initialQuestion,
  onClearInitialQuestion,
  swords,
  onSelectSword,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'sensei',
      text: 'Kon’nichiwa, honored collector. I am your AI Katana Sensei. Ask me about blade metallurgy (Tamahagane vs 1095), international import laws, sword anatomy, or proper maintenance.',
      timestamp: 'Now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Handle external inquiry trigger (e.g. from product detail modal)
  useEffect(() => {
    if (initialQuestion) {
      setIsOpen(true);
      handleSendMessage(initialQuestion);
      onClearInitialQuestion?.();
    }
  }, [initialQuestion]);

  const handleSendMessage = (textToSend?: string) => {
    const userText = (textToSend || input).trim();
    if (!userText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      // Find matching knowledge response or intelligent fallback
      const lower = userText.toLowerCase();
      let matchedAnswer = '';

      for (const item of KNOWLEDGE_RESPONSES) {
        if (item.keywords.some((k) => lower.includes(k))) {
          matchedAnswer = item.answer;
          break;
        }
      }

      // Check if user is asking about a specific sword code or name
      if (!matchedAnswer) {
        const foundSword = swords.find(
          (s) =>
            lower.includes(s.code.toLowerCase()) ||
            lower.includes(s.name.toLowerCase()) ||
            s.name.toLowerCase().includes(lower)
        );
        if (foundSword) {
          matchedAnswer = `⚔️ Regarding the ${foundSword.name} (${foundSword.code}): It is forged from ${foundSword.steel} with a ${foundSword.nagasa} blade and ${foundSword.hamon}. It comes with ${foundSword.certificate} paperwork and is currently priced at $${foundSword.price.toFixed(2)}. Sourced from ${foundSword.origin} by ${foundSword.smith}.`;
        }
      }

      if (!matchedAnswer) {
        matchedAnswer = `🥋 Hai. In traditional Japanese swordcraft, every detail reflects centuries of samurai heritage—from the differential clay yakire hardening that creates the crystalline hamon, to the sacred magnolia wood of the saya. Could you specify if you are curious about blade steels (Tamahagane), customs paperwork, or specific swords from our guild catalog?`;
      }

      const senseiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'sensei',
        text: matchedAnswer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, senseiMessage]);
      setIsTyping(false);
    }, 600);
  };

  const handlePromptChip = (chipText: string) => {
    handleSendMessage(chipText);
  };

  return (
    <>
      {/* Floating Widget (Matches Screenshot) */}
      <aside className="fixed bottom-6 right-6 z-50" data-purpose="ai-katana-concierge">
        {!isOpen && (
          <div
            id="concierge-box"
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-3 bg-white border border-[#C5A059]/50 shadow-2xl rounded-full pl-2 pr-5 py-2 hover:border-[#C5A059] transition-all duration-300 cursor-pointer group hover:scale-102"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-[#1A1D20] text-amber-300 flex items-center justify-center font-cinzel font-bold text-sm border border-[#C5A059]/60 group-hover:bg-[#C5A059] group-hover:text-slate-900 transition-colors">
                侍
              </div>
              <span className="absolute top-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-slate-900 leading-tight">
                Ask AI Katana Sensei
              </p>
              <p className="text-[10px] text-gray-500">Blade steel, legality & FAQs</p>
            </div>
            <button
              aria-label="Open AI Concierge Chat"
              className="ml-2 text-[#9E7D3B] group-hover:text-[#C5A059] transition-colors"
              type="button"
            >
              <MessageSquare className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Expanded Chat Drawer / Popover */}
        {isOpen && (
          <div className="bg-white border border-stone-300 rounded-lg shadow-2xl w-[92vw] sm:w-96 flex flex-col overflow-hidden max-h-[560px] animate-in fade-in slide-in-from-bottom-5 duration-200">
            {/* Chat Header */}
            <div className="bg-[#1A1D20] text-white p-3.5 flex items-center justify-between border-b border-[#C5A059]/40">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#C5A059] text-slate-950 flex items-center justify-center font-cinzel font-bold text-xs">
                  侍
                </div>
                <div>
                  <h3 className="text-xs font-cinzel font-bold text-white tracking-wider flex items-center gap-1.5">
                    AI Katana Sensei
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                  </h3>
                  <span className="text-[10px] text-stone-300 block -mt-0.5">
                    Curator & Metallurgy Expert
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-stone-400 hover:text-white p-1 rounded transition-colors"
                aria-label="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Prompt Chips */}
            <div className="p-2 bg-stone-50 border-b border-stone-200 flex gap-1.5 overflow-x-auto custom-scroll text-[10px]">
              <button
                onClick={() => handlePromptChip('Can I legally import a Katana to my country?')}
                className="whitespace-nowrap px-2.5 py-1 bg-white hover:bg-[#C5A059]/10 border border-stone-300 rounded-full text-stone-700 font-medium cursor-pointer transition-colors"
              >
                🌍 Legal Import & DHL
              </button>
              <button
                onClick={() => handlePromptChip('Difference between 1095 steel and Tamahagane?')}
                className="whitespace-nowrap px-2.5 py-1 bg-white hover:bg-[#C5A059]/10 border border-stone-300 rounded-full text-stone-700 font-medium cursor-pointer transition-colors"
              >
                ⚔️ Tamahagane vs 1095
              </button>
              <button
                onClick={() => handlePromptChip('How do I properly clean and oil a Nihonto blade?')}
                className="whitespace-nowrap px-2.5 py-1 bg-white hover:bg-[#C5A059]/10 border border-stone-300 rounded-full text-stone-700 font-medium cursor-pointer transition-colors"
              >
                🌸 Maintenance & Choji
              </button>
              <button
                onClick={() => handlePromptChip('What are NBTHK papers and Torokusho permits?')}
                className="whitespace-nowrap px-2.5 py-1 bg-white hover:bg-[#C5A059]/10 border border-stone-300 rounded-full text-stone-700 font-medium cursor-pointer transition-colors"
              >
                📜 NBTHK Papers
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-3.5 space-y-3 overflow-y-auto max-h-[320px] custom-scroll bg-[#FAF9F6]">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg p-2.5 text-xs leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-[#1A1D20] text-white rounded-br-none'
                        : 'bg-white text-slate-800 border border-stone-200 shadow-xs rounded-bl-none'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{m.text}</p>
                    <span
                      className={`text-[9px] mt-1 block text-right ${
                        m.sender === 'user' ? 'text-stone-400' : 'text-stone-400'
                      }`}
                    >
                      {m.timestamp}
                    </span>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white text-stone-500 border border-stone-200 rounded-lg p-2.5 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-2.5 bg-white border-t border-stone-200 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Sensei about steels, laws, blades..."
                className="flex-1 bg-stone-50 border border-stone-300 rounded px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-[#C5A059]"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="bg-[#C5A059] hover:bg-[#9E7D3B] disabled:opacity-50 text-white p-2 rounded transition-colors cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}
      </aside>
    </>
  );
};
