import React, { useEffect, useState, useCallback } from 'react';
import {
  MessageSquare,
  ShieldCheck,
  Mail,
  Clock,
  HelpCircle,
  Sparkles,
  ExternalLink,
  RotateCw,
  Info,
  CheckCircle2,
} from 'lucide-react';

declare global {
  interface Window {
    DISQUS?: {
      reset: (options: {
        reload: boolean;
        config?: (this: any) => void;
      }) => void;
    };
    disqus_config?: (this: any) => void;
    disqus_shortname?: string;
    disqus_identifier?: string;
    disqus_url?: string;
    disqus_title?: string;
  }
}

export const TalkToUsView: React.FC = () => {
  const [isReloading, setIsReloading] = useState(false);

  // Real fixed values for page.url and page.identifier (replacing placeholders)
  const PAGE_IDENTIFIER = 'katana-sword-smu-talk-to-us';
  const PAGE_URL =
    typeof window !== 'undefined' && window.location.origin && window.location.origin !== 'null'
      ? `${window.location.origin}/talk-to-us`
      : 'https://caesars-nihonto.jp/talk-to-us';

  const configureDisqus = useCallback(() => {
    return function (this: any) {
      this.page.url = PAGE_URL;
      this.page.identifier = PAGE_IDENTIFIER;
      this.page.title = 'Talk to Us - Caesars Nihonto Guild';
    };
  }, [PAGE_URL, PAGE_IDENTIFIER]);

  const loadOrResetDisqus = useCallback(() => {
    const disqusConfig = configureDisqus();

    // Set global variables as required by Disqus Universal Code
    if (typeof window !== 'undefined') {
      window.disqus_shortname = 'katana-sword-smu';
      window.disqus_config = disqusConfig;
      window.disqus_identifier = PAGE_IDENTIFIER;
      window.disqus_url = PAGE_URL;
      window.disqus_title = 'Talk to Us - Caesars Nihonto Guild';
    }

    const container = document.getElementById('disqus_thread');
    if (!container) {
      return;
    }

    // In a single-page app (SPA), reload Disqus using window.DISQUS.reset when switching tabs
    if (window.DISQUS && typeof window.DISQUS.reset === 'function') {
      try {
        window.DISQUS.reset({
          reload: true,
          config: disqusConfig,
        });
      } catch (err) {
        console.warn('Disqus reset note:', err);
      }
    } else {
      // First-time script injection
      const existingScript = document.querySelector<HTMLScriptElement>(
        'script[src="https://katana-sword-smu.disqus.com/embed.js"]'
      );

      if (!existingScript) {
        const d = document;
        const s = d.createElement('script');
        s.src = 'https://katana-sword-smu.disqus.com/embed.js';
        s.setAttribute('data-timestamp', String(+new Date()));
        s.async = true;
        (d.head || d.body).appendChild(s);
      } else {
        // If script tag exists but window.DISQUS is not ready yet, poll briefly
        let attempts = 0;
        const pollInterval = setInterval(() => {
          attempts++;
          if (window.DISQUS && typeof window.DISQUS.reset === 'function') {
            clearInterval(pollInterval);
            try {
              window.DISQUS.reset({
                reload: true,
                config: disqusConfig,
              });
            } catch (err) {
              console.warn('Disqus reset note:', err);
            }
          } else if (attempts > 30) {
            clearInterval(pollInterval);
          }
        }, 100);
      }
    }

    // Ensure Disqus count script is also loaded
    if (!document.getElementById('dsq-count-scr')) {
      const d = document;
      const s = d.createElement('script');
      s.id = 'dsq-count-scr';
      s.src = '//katana-sword-smu.disqus.com/count.js';
      s.async = true;
      (d.head || d.body).appendChild(s);
    }
  }, [PAGE_IDENTIFIER, PAGE_URL, configureDisqus]);

  // Handle SPA tab switching: when user switches to 'Talk to Us' tab, initialize or reset Disqus
  useEffect(() => {
    // 50ms buffer allows React DOM reconciliation to mount <div id="disqus_thread">
    const timer = setTimeout(() => {
      loadOrResetDisqus();
    }, 50);

    return () => {
      clearTimeout(timer);
    };
  }, [loadOrResetDisqus]);

  const handleManualReload = () => {
    setIsReloading(true);
    loadOrResetDisqus();
    setTimeout(() => {
      setIsReloading(false);
    }, 600);
  };

  const handleOpenInNewTab = () => {
    if (typeof window !== 'undefined') {
      window.open(window.location.href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Informational Hero Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-200/80 rounded-full text-xs font-medium mb-3">
              <MessageSquare className="w-3.5 h-3.5 text-amber-700" />
              Community &amp; Guild Inquiries
            </div>
            <h2 className="text-2xl font-cinzel font-bold text-gray-900 tracking-tight">
              Guild Concierge &amp; Collector Discussions
            </h2>
            <p className="text-sm text-gray-600 mt-2 max-w-2xl leading-relaxed">
              Connect directly with master swordsmiths, certified polishers (togishi), and international
              Nihonto collectors. Ask questions regarding sword history, custom forging, or leave your
              feedback below.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 min-w-[220px]">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md border border-gray-100 text-xs">
              <Clock className="w-4 h-4 text-[#C5A059] shrink-0" />
              <div>
                <p className="font-semibold text-gray-800">Response Window</p>
                <p className="text-gray-500 text-[11px]">Within 24 business hours</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md border border-gray-100 text-xs">
              <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0" />
              <div>
                <p className="font-semibold text-gray-800">Verified Advice</p>
                <p className="text-gray-500 text-[11px]">NBTHK standards compliant</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Topic Guidelines */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-xs text-gray-600">
          <div className="flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-medium text-gray-800 block mb-0.5">Custom Commissions</span>
              <span>Guidance on steel selection (Tamahagane, 1095, T10) and sori curves.</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-medium text-gray-800 block mb-0.5">Provenance &amp; Papers</span>
              <span>Identification of mei signatures, smith schools, and Edo era fittings.</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-medium text-gray-800 block mb-0.5">Maintenance &amp; Care</span>
              <span>Uchiko powder cleaning, choji clove oiling, and tsuka-ito re-wrapping.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Disqus Embed Container */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 shadow-xs">
        <div className="border-b border-gray-100 pb-4 mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#C5A059]" />
              Public Discussion Forum
            </h3>
            <span className="text-xs text-gray-400">
              Forum: <code className="font-mono text-[11px] text-gray-600">katana-sword-smu</code> • Thread ID:{' '}
              <code className="font-mono text-[11px] text-gray-600">{PAGE_IDENTIFIER}</code>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleManualReload}
              disabled={isReloading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded transition-colors cursor-pointer disabled:opacity-50"
              title="Reload discussion thread"
              id="reload-disqus-btn"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isReloading ? 'animate-spin text-[#C5A059]' : 'text-gray-500'}`} />
              <span>Reload Thread</span>
            </button>
            <button
              onClick={handleOpenInNewTab}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-800 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 rounded transition-colors cursor-pointer"
              title="Open thread in standalone tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open in New Tab</span>
            </button>
          </div>
        </div>

        {/* Commenting Instructions Card */}
        <div className="mb-6 p-4 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-700 space-y-2">
          <div className="flex items-center gap-2 font-medium text-slate-900">
            <Info className="w-4 h-4 text-[#C5A059] shrink-0" />
            <span>Posting Options:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-6 text-[12px] leading-relaxed text-slate-600">
            <div className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong className="text-slate-800 font-semibold">Post as a Guest:</strong> You can post without a password. Type your comment, click the Name field, and check <em>&quot;I&apos;d rather post as a guest&quot;</em>.
              </span>
            </div>
            <div className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong className="text-slate-800 font-semibold">Social / Disqus Login:</strong> Sign in via your Disqus profile, Google, or social accounts to track replies.
              </span>
            </div>
          </div>
        </div>

        {/* The Disqus Thread Mount */}
        <div id="disqus_thread" className="min-h-[380px] w-full" />

        <noscript>
          Please enable JavaScript to view the{' '}
          <a
            href="https://disqus.com/?ref_noscript"
            rel="noopener noreferrer"
            target="_blank"
            className="text-[#C5A059] underline font-medium"
          >
            comments powered by Disqus.
          </a>
        </noscript>

        {/* Direct Concierge Contact Footer */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-400" />
            <span>Prefer a private appraisal or confidential commission?</span>
          </div>
          <a
            href="mailto:concierge@caesars-nihonto.jp?subject=Private%20Nihonto%20Inquiry"
            className="text-[#C5A059] font-medium hover:underline inline-flex items-center gap-1"
          >
            Email Guild Concierge &rarr;
          </a>
        </div>
      </div>
    </div>
  );
};


