import React, { useState, useEffect, useCallback } from 'react';
import {
  MessageSquare,
  ShieldCheck,
  Mail,
  Clock,
  HelpCircle,
  Sparkles,
  ExternalLink,
  RotateCw,
  AlertTriangle,
  Users,
  CheckCircle2,
} from 'lucide-react';

export const TalkToUsView: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [forumShortname, setForumShortname] = useState<'leon-kwang' | 'katana-sword-smu'>('leon-kwang');

  const threadIdentifier = 'katana-guild-talk-to-us-thread';

  const threadUrl = useCallback(() => {
    try {
      if (typeof window !== 'undefined' && window.location.origin && window.location.origin !== 'null') {
        return `${window.location.origin}/talk-to-us`;
      }
    } catch {}
    return 'https://caesars-nihonto.jp/talk-to-us';
  }, [])();

  const loadDisqus = useCallback(() => {
    setLoadError(false);

    const config = function (this: any) {
      const page = this && typeof this === 'object' ? this : {};
      page.page = page.page || {};
      page.page.url = threadUrl;
      page.page.identifier = threadIdentifier;
      page.page.title = 'Talk to Us - Caesars Nihonto Guild';
    };

    // Global pre-config
    if (typeof window !== 'undefined') {
      window.disqus_shortname = forumShortname;
      window.disqus_identifier = threadIdentifier;
      window.disqus_url = threadUrl;
      window.disqus_title = 'Talk to Us - Caesars Nihonto Guild';
      window.disqus_config = config;
    }

    try {
      if (window.DISQUS && typeof window.DISQUS.reset === 'function') {
        window.DISQUS.reset({
          reload: true,
          config: config,
        });
        setIsLoaded(true);
      } else {
        let script = document.getElementById('disqus-embed-script') as HTMLScriptElement | null;
        if (!script) {
          script = document.createElement('script');
          script.id = 'disqus-embed-script';
          script.src = `https://${forumShortname}.disqus.com/embed.js`;
          script.setAttribute('data-timestamp', String(+new Date()));
          script.async = true;
          script.onload = () => setIsLoaded(true);
          script.onerror = () => {
            setLoadError(true);
            setIsLoaded(true);
          };
          (document.head || document.body).appendChild(script);
        } else {
          // If script tag exists but forum changed or needs reload
          if (script.src.indexOf(forumShortname) === -1) {
            script.remove();
            const newScript = document.createElement('script');
            newScript.id = 'disqus-embed-script';
            newScript.src = `https://${forumShortname}.disqus.com/embed.js`;
            newScript.setAttribute('data-timestamp', String(+new Date()));
            newScript.async = true;
            newScript.onload = () => setIsLoaded(true);
            newScript.onerror = () => {
              setLoadError(true);
              setIsLoaded(true);
            };
            (document.head || document.body).appendChild(newScript);
          } else {
            const timer = setTimeout(() => {
              if (window.DISQUS && typeof window.DISQUS.reset === 'function') {
                window.DISQUS.reset({
                  reload: true,
                  config: config,
                });
                setIsLoaded(true);
              }
            }, 300);
            return () => clearTimeout(timer);
          }
        }
      }
    } catch (err) {
      console.warn('Disqus initialization note:', err);
      setLoadError(true);
    }
  }, [forumShortname, threadIdentifier, threadUrl]);

  // Staggered initialization modeled after job-board-one-rosy (50ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      loadDisqus();
    }, 50);

    // Watchdog check for adblockers / privacy extensions
    const watchdogTimer = setTimeout(() => {
      const container = document.getElementById('disqus_thread');
      if (container && !container.querySelector('iframe')) {
        setLoadError(true);
      }
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(watchdogTimer);
    };
  }, [loadDisqus]);

  const handleOpenInNewTab = () => {
    if (typeof window !== 'undefined') {
      window.open(window.location.href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[#F8FAFC] py-8 px-4 sm:px-6 lg:px-8 animate-in fade-in duration-300">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Hero Section Card modeled after job-board-one-rosy */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E2E8F0] shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EFF6FF] text-[#1E40AF] rounded-full text-xs font-bold tracking-wide">
                <MessageSquare className="w-3.5 h-3.5 text-[#2557a7]" />
                <span>Community &amp; Guild Feedback Hub</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">Talk to Us</h1>
              <p className="text-sm text-[#475569] max-w-2xl leading-relaxed">
                Have questions regarding blade provenance, custom forging commissions, or guild catalog listings? Leave a comment,
                ask our Nihonto curators a question, or share your feedback with the guild community.
              </p>
            </div>

            <div className="flex flex-row md:flex-col gap-3 min-w-[200px] border-t md:border-t-0 md:border-l border-[#E2E8F0] pt-4 md:pt-0 md:pl-6">
              <div className="flex items-center gap-2 text-xs text-[#334155]">
                <Clock className="w-4 h-4 text-[#0F766E] shrink-0" />
                <span>
                  Avg response time: <strong>&lt; 2 hrs</strong>
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#334155]">
                <ShieldCheck className="w-4 h-4 text-[#003f8b] shrink-0" />
                <span>Verified Nihonto Curators</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#334155]">
                <Users className="w-4 h-4 text-[#2557a7] shrink-0" />
                <span>Open Collector Forum</span>
              </div>
            </div>
          </div>

          {/* Quick Guidance Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-[#F1F5F9]">
            <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-4 h-4 text-[#2557a7]" />
                <span className="text-xs font-bold text-[#1E293B]">Blade Authentication</span>
              </div>
              <p className="text-[12px] text-[#64748B]">
                Inquire about NBTHK papers (Hozon, Tokubetsu Hozon, Juyo), mei smith signatures, and historic era attributions.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-[#0F766E]" />
                <span className="text-xs font-bold text-[#1E293B]">Custom Forging Orders</span>
              </div>
              <p className="text-[12px] text-[#64748B]">
                Ask about genuine tamahagane steel smelting, clay-tempered hamon lines, and bespoke koshirae fittings.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="flex items-center gap-2 mb-1">
                <HelpCircle className="w-4 h-4 text-[#EA580C]" />
                <span className="text-xs font-bold text-[#1E293B]">Maintenance &amp; Logistics</span>
              </div>
              <p className="text-[12px] text-[#64748B]">
                Questions regarding international insured shipping, Torokusho export licensing, and traditional uchiko care.
              </p>
            </div>
          </div>
        </section>

        {/* Discussion Section Card modeled after job-board-one-rosy */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E2E8F0] shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-5 border-b border-[#E2E8F0]">
            <div>
              <h2 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
                <span>Join the Discussion</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#F1F5F9] text-[#475569] font-medium">
                  Disqus Community
                </span>
              </h2>
              <div className="flex items-center gap-2 mt-1 text-xs text-[#64748B]">
                <span>Posting to thread:</span>
                <code className="bg-[#F1F5F9] px-1.5 py-0.5 rounded text-[11px] text-[#334155] font-mono">
                  {threadIdentifier}
                </code>
                <span className="text-gray-300">|</span>
                <span className="text-[11px] text-gray-500">Forum:</span>
                <button
                  type="button"
                  onClick={() => setForumShortname(prev => prev === 'leon-kwang' ? 'katana-sword-smu' : 'leon-kwang')}
                  className="font-mono text-[11px] text-[#003f8b] hover:underline font-medium cursor-pointer"
                  title="Click to toggle forum shortname"
                >
                  {forumShortname}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={loadDisqus}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#334155] hover:bg-[#F1F5F9] border border-[#CBD5E1] transition-colors cursor-pointer"
                title="Refresh discussion thread"
                id="reload-disqus-btn"
              >
                <RotateCw className="w-3.5 h-3.5 text-[#64748B]" />
                <span>Reload Thread</span>
              </button>
              <button
                onClick={handleOpenInNewTab}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#1E40AF] hover:bg-[#EFF6FF] border border-[#BFDBFE] transition-colors cursor-pointer"
                title="Open thread in standalone tab"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#1E40AF]" />
                <span>Open in Tab</span>
              </button>
            </div>
          </div>

          {/* Error / Timeout banner modeled after job-board-one-rosy */}
          {loadError && (
            <div className="mb-4 p-4 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-xs text-[#92400E] flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-[#B45309]" />
              <div>
                <p className="font-semibold">Disqus took longer to respond or was blocked by browser privacy settings.</p>
                <p className="mt-1 text-[#A16207]">
                  If comments do not appear below, check if your browser or ad blocker is restricting third-party scripts, or click
                  &quot;Reload Thread&quot; above.
                </p>
              </div>
            </div>
          )}

          {/* The Disqus Thread Mount */}
          <div id="disqus_thread" className="min-h-[280px] w-full" />

          <noscript>
            Please enable JavaScript to view the{' '}
            <a href="https://disqus.com/?ref_noscript" rel="noreferrer" className="text-[#003f8b] underline">
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
              className="text-[#003f8b] font-medium hover:underline inline-flex items-center gap-1"
            >
              Email Guild Concierge &rarr;
            </a>
          </div>
        </section>
      </div>
    </main>
  );
};


