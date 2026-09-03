import React, { useEffect, useRef, useState } from 'react';

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
    disqus_category_id?: string;
  }
}

export interface DisqusCommentProps {
  /**
   * The shortname of the Disqus forum (e.g. 'leon-kwang' or 'katana-sword-smu')
   */
  shortname?: string;
  /**
   * Unique identifier for the page or thread
   */
  identifier?: string;
  /**
   * Canonical URL of the page
   */
  url?: string;
  /**
   * Optional title of the page/thread
   */
  title?: string;
  /**
   * Optional Disqus category ID
   */
  categoryId?: string;
  /**
   * Optional CSS classes for the container
   */
  className?: string;
  /**
   * Optional container ID (defaults to 'disqus_thread')
   */
  containerId?: string;
  /**
   * Optional callback when comments are loaded or reset
   */
  onLoaded?: () => void;
  /**
   * Optional callback on script error or timeout
   */
  onError?: (error: Error | Event | null) => void;
}

/**
 * Robust DisqusComment component modeled after https://job-board-one-rosy.vercel.app/:
 * - Uses dynamic script injection with 'disqus-embed-script' ID
 * - Handles window.DISQUS.reset({ reload: true, config })
 * - Synchronizes window.disqus_config before script loading
 * - Manages script error and timeout fallbacks
 */
export const DisqusComment: React.FC<DisqusCommentProps> = ({
  shortname = 'leon-kwang',
  identifier = 'katana-guild-talk-to-us-thread',
  url,
  title = 'Talk to Us - Caesars Nihonto Guild',
  categoryId,
  className = 'min-h-[280px] w-full',
  containerId = 'disqus_thread',
  onLoaded,
  onError,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const pageUrl = url || (() => {
    try {
      if (typeof window !== 'undefined' && window.location.origin && window.location.origin !== 'null') {
        return `${window.location.origin}/talk-to-us`;
      }
    } catch {}
    return 'https://caesars-nihonto.jp/talk-to-us';
  })();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const container = document.getElementById(containerId);
    if (!container) {
      console.warn(`[DisqusComment] Container #${containerId} not found in DOM.`);
      return;
    }

    // Set globals prior to loading or resetting
    window.disqus_shortname = shortname;
    window.disqus_identifier = identifier;
    window.disqus_url = pageUrl;
    if (title) window.disqus_title = title;
    if (categoryId) window.disqus_category_id = categoryId;

    const configureDisqus = function (this: any) {
      const page = this && typeof this === 'object' ? this : {};
      page.page = page.page || {};
      page.page.identifier = identifier;
      page.page.url = pageUrl;
      if (title) page.page.title = title;
      if (categoryId) page.page.category_id = categoryId;
    };

    window.disqus_config = configureDisqus;

    let timer: NodeJS.Timeout | null = null;
    let initialTimer: NodeJS.Timeout | null = null;

    const loadDisqus = () => {
      try {
        if (window.DISQUS && typeof window.DISQUS.reset === 'function') {
          window.DISQUS.reset({
            reload: true,
            config: configureDisqus,
          });
          setIsScriptLoaded(true);
          onLoaded?.();
        } else {
          window.disqus_config = configureDisqus;
          let script = document.getElementById('disqus-embed-script') as HTMLScriptElement | null;
          
          if (!script) {
            script = document.createElement('script');
            script.id = 'disqus-embed-script';
            script.src = `https://${shortname}.disqus.com/embed.js`;
            script.setAttribute('data-timestamp', String(+new Date()));
            script.async = true;
            
            script.onload = () => {
              setIsScriptLoaded(true);
              onLoaded?.();
            };
            
            script.onerror = (e) => {
              console.warn('[DisqusComment] Failed to load Disqus script:', e);
              onError?.(e);
              setIsScriptLoaded(true);
            };
            
            (document.head || document.body).appendChild(script);
          } else {
            // Script tag already exists, wait for window.DISQUS to be available
            timer = setTimeout(() => {
              if (window.DISQUS && typeof window.DISQUS.reset === 'function') {
                window.DISQUS.reset({
                  reload: true,
                  config: configureDisqus,
                });
                setIsScriptLoaded(true);
                onLoaded?.();
              }
            }, 300);
          }
        }
      } catch (err: any) {
        console.warn('[DisqusComment] Disqus initialization note:', err);
        onError?.(err);
      }
    };

    // Staggered initialization matching job-board-one-rosy (50ms)
    initialTimer = setTimeout(() => {
      loadDisqus();
    }, 50);

    return () => {
      if (initialTimer) clearTimeout(initialTimer);
      if (timer) clearTimeout(timer);
    };
  }, [shortname, identifier, pageUrl, title, categoryId, containerId, onLoaded, onError]);

  return (
    <div className="disqus-container w-full">
      <div id={containerId} ref={containerRef} className={className} />
      <noscript>
        Please enable JavaScript to view the{' '}
        <a
          href={`https://${shortname}.disqus.com/?ref_noscript`}
          rel="noreferrer"
          target="_blank"
          className="text-[#003f8b] underline"
        >
          comments powered by Disqus.
        </a>
      </noscript>
    </div>
  );
};
