import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  MessageSquare,
  ShieldCheck,
  Mail,
  Clock,
  HelpCircle,
  Sparkles,
  ExternalLink,
  RefreshCw,
  Info,
  CheckCircle2,
} from 'lucide-react';

declare global {
  interface Window {
    DISQUS?: {
      reset: (options: {
        reload: boolean;
        config: (this: any) => void;
      }) => void;
    };
    disqus_config?: (this: any) => void;
    disqus_shortname?: string;
  }
}

export const TalkToUsView: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
  const [hasAdblockWarning, setHasAdblockWarning] = useState(false);
  const checkMountTimerRef = useRef<number | null>(null);

  // Derive canonical page URL and unique forum identifier
  const getPageUrl = useCallback(() => {
    if (typeof window !== 'undefined' && window.location) {
      try {
        const origin = window.location.origin;
        if (origin && origin !== 'null') {
          return `${origin}/talk-to-us`;
        }
      } catch {
        // fallback
      }
    }
    return 'https://katana-sword-smu.disqus.com';
  }, []);

  const configureDisqus = useCallback(
    function (this: any) {
      const target = this && typeof this === 'object' ? this : {};
      if (!target.page) {
        target.page = {};
      }
      target.page.url = getPageUrl();
      target.page.identifier = 'talk-to-us';
      target.page.title = 'Talk to Us & Guild Discussion - Caesars Nihonto Guild';
    },
    [getPageUrl]
  );

  const initOrReloadDisqus = useCallback(() => {
    setIsReloading(true);
    window.disqus_shortname = 'katana-sword-smu';
    window.disqus_config = configureDisqus;

    if (window.DISQUS && typeof window.DISQUS.reset === 'function') {
      try {
        window.DISQUS.reset({
          reload: true,
          config: configureDisqus,
        });
        setIsLoaded(true);
        setIsReloading(false);
      } catch (err) {
        console.warn('Disqus reset notice:', err);
        setIsReloading(false);
      }
    } else {
      // Check if script is already present in DOM
      let script = document.getElementById('dsq-embed-scr') as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement('script');
        script.id = 'dsq-embed-scr';
        script.src = 'https://katana-sword-smu.disqus.com/embed.js';
        script.setAttribute('data-timestamp', String(+new Date()));
        script.async = true;
        script.onload = () => {
          setIsLoaded(true);
          setIsReloading(false);
        };
        script.onerror = () => {
          setIsLoaded(true);
          setIsReloading(false);
        };
        (document.head || document.body).appendChild(script);
      } else {
        // Script exists but DISQUS object is still initializing; poll briefly
        let attempts = 0;
        const pollInterval = window.setInterval(() => {
          attempts++;
          if (window.DISQUS && typeof window.DISQUS.reset === 'function') {
            window.clearInterval(pollInterval);
            try {
              window.DISQUS.reset({
                reload: true,
                config: configureDisqus,
              });
            } catch (e) {
              console.warn('Disqus polling reset notice:', e);
            }
            setIsLoaded(true);
            setIsReloading(false);
          } else if (attempts > 30) {
            window.clearInterval(pollInterval);
            setIsLoaded(true);
            setIsReloading(false);
          }
        }, 100);
      }
    }

    // Ensure count widget script is present
    if (!document.getElementById('dsq-count-scr')) {
      const countScript = document.createElement('script');
      countScript.id = 'dsq-count-scr';
      countScript.src = '//katana-sword-smu.disqus.com/count.js';
      countScript.async = true;
      (document.head || document.body).appendChild(countScript);
    }
  }, [configureDisqus]);

  useEffect(() => {
    // Initial mount with tiny timeout to ensure #disqus_thread is fully committed to the DOM
    const initialTimer = window.setTimeout(() => {
      initOrReloadDisqus();
    }, 60);

    // Watchdog check: If after 5 seconds the thread has no iframe, warn about adblockers
    checkMountTimerRef.current = window.setTimeout(() => {
      const container = document.getElementById('disqus_thread');
      if (container && !container.querySelector('iframe')) {
        setHasAdblockWarning(true);
      }
    }, 5500);

    return () => {
      window.clearTimeout(initialTimer);
      if (checkMountTimerRef.current) {
        window.clearTimeout(checkMountTimerRef.current);
      }
    };
  }, [initOrReloadDisqus]);

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
            <span className="text-xs text-gray-400">Forum Shortname: katana-sword-smu</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={initOrReloadDisqus}
              disabled={isReloading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded transition-colors cursor-pointer disabled:opacity-50"
              title="Reload discussion thread"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isReloading ? 'animate-spin text-[#C5A059]' : ''}`} />
              <span>Reload Thread</span>
            </button>
            <button
              onClick={handleOpenInNewTab}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-800 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 rounded transition-colors cursor-pointer"
              title="Open full page in standalone tab to prevent third-party cookie blocks"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open in New Tab</span>
            </button>
          </div>
        </div>

        {/* Commenting Instructions & Guidelines Card */}
        <div className="mb-6 p-4 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-700 space-y-2">
          <div className="flex items-center gap-2 font-medium text-slate-900">
            <Info className="w-4 h-4 text-[#C5A059] shrink-0" />
            <span>How to post your comment or inquiry:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-6 text-[12px] leading-relaxed text-slate-600">
            <div className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong className="text-slate-800 font-semibold">Post as a Guest:</strong> You do not need an account. Type your comment, click the Name field below, and check <em>&quot;I&apos;d rather post as a guest&quot;</em>.
              </span>
            </div>
            <div className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong className="text-slate-800 font-semibold">Social / Disqus Login:</strong> Sign in with your Disqus profile, Google, or social accounts to track replies.
              </span>
            </div>
          </div>
        </div>

        {/* Adblock Warning (if detected) */}
        {hasAdblockWarning && (
          <div className="mb-6 p-4 bg-amber-50/80 border border-amber-200 rounded-md text-xs text-amber-900 flex items-start gap-3">
            <HelpCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-amber-900">Cannot see the comments box?</p>
              <p className="text-amber-800 leading-relaxed">
                Ad blockers, Brave Shields, or strict privacy extensions often block third-party Disqus widgets. If the comment box does not load, try temporarily pausing your ad blocker for this site or clicking <strong>&quot;Open in New Tab&quot;</strong> above.
              </p>
            </div>
          </div>
        )}

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

