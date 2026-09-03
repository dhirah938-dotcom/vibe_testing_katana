import React, { useEffect, useState } from 'react';
import { MessageSquare, ShieldCheck, Mail, Clock, HelpCircle, Sparkles, AlertCircle } from 'lucide-react';

declare global {
  interface Window {
    DISQUS?: {
      reset: (options: {
        reload: boolean;
        config: (this: any) => void;
      }) => void;
    };
    disqus_config?: (this: any) => void;
  }
}

export const TalkToUsView: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Real fixed configuration values for Disqus (replacing placeholders)
    const PAGE_IDENTIFIER = 'katana-guild-talk-to-us';
    const PAGE_URL =
      typeof window !== 'undefined' && window.location.origin && window.location.origin !== 'null'
        ? `${window.location.origin}/talk-to-us`
        : 'https://katana-sword-smu.disqus.com/talk-to-us';

    const configureDisqus = function (this: any) {
      this.page.url = PAGE_URL;
      this.page.identifier = PAGE_IDENTIFIER;
      this.page.title = 'Talk to Us - Caesars Nihonto Guild';
    };

    // Assign global disqus_config
    window.disqus_config = configureDisqus;

    // In a single-page application (SPA), reload Disqus properly when switching tabs
    if (window.DISQUS && typeof window.DISQUS.reset === 'function') {
      try {
        window.DISQUS.reset({
          reload: true,
          config: configureDisqus,
        });
        setIsLoaded(true);
      } catch (err) {
        console.warn('Disqus reset error:', err);
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
        s.onload = () => setIsLoaded(true);
        s.onerror = () => setIsLoaded(true);
        (d.head || d.body).appendChild(s);
      } else {
        // Script is in DOM, attach listener or reset once available
        if (window.DISQUS && typeof window.DISQUS.reset === 'function') {
          window.DISQUS.reset({
            reload: true,
            config: configureDisqus,
          });
          setIsLoaded(true);
        } else {
          existingScript.addEventListener(
            'load',
            () => {
              if (window.DISQUS && typeof window.DISQUS.reset === 'function') {
                window.DISQUS.reset({
                  reload: true,
                  config: configureDisqus,
                });
              }
              setIsLoaded(true);
            },
            { once: true }
          );
        }
      }
    }

    // Ensure count script is registered
    if (!document.getElementById('dsq-count-scr')) {
      const countScript = document.createElement('script');
      countScript.id = 'dsq-count-scr';
      countScript.src = '//katana-sword-smu.disqus.com/count.js';
      countScript.async = true;
      (document.head || document.body).appendChild(countScript);
    }
  }, []);

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
        <div className="border-b border-gray-100 pb-4 mb-6 flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#C5A059]" />
            Public Discussion Forum
          </h3>
          <span className="text-xs text-gray-400">Powered by Disqus</span>
        </div>

        {/* The Disqus Thread Mount */}
        <div id="disqus_thread" className="min-h-[380px] w-full" />

        <noscript>
          Please enable JavaScript to view the{' '}
          <a
            href="https://disqus.com/?ref_noscript"
            rel="noopener noreferrer"
            target="_blank"
            className="text-amber-700 underline"
          >
            comments powered by Disqus.
          </a>
        </noscript>
      </div>
    </div>
  );
};
