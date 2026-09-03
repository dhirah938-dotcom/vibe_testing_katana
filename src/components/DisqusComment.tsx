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
   * The shortname of the Disqus forum (e.g. 'katana-sword-smu')
   */
  shortname: string;
  /**
   * Unique identifier for the page or thread (e.g. 'talk-to-us' or post ID)
   */
  identifier: string;
  /**
   * Canonical URL of the page (e.g. 'https://example.com/talk-to-us')
   */
  url: string;
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
   * Optional callback on script error
   */
  onError?: (error: Error | Event) => void;
}

/**
 * Robust DisqusComment component for Next.js and React SPAs:
 * 1. Accepts shortname, identifier, and url as props
 * 2. Dynamically injects the embed script only after <div id="disqus_thread"> is mounted
 * 3. Handles React 18+ / StrictMode double-mounting with a cleanup calling DISQUS.reset() and removing listeners
 * 4. Uses DISQUS.reset({ reload: true }) on route / prop changes for client-side navigation
 * 5. Sets window.disqus_identifier and window.disqus_url before loading embed.js
 */
export const DisqusComment: React.FC<DisqusCommentProps> = ({
  shortname,
  identifier,
  url,
  title,
  categoryId,
  className = 'min-h-[380px] w-full',
  containerId = 'disqus_thread',
  onLoaded,
  onError,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    // Only execute in client browser environments (safe for Next.js SSR)
    if (typeof window === 'undefined') {
      return;
    }

    // (2) Ensure the container element is mounted in the DOM before proceeding
    const container = document.getElementById(containerId);
    if (!container) {
      console.warn(`[DisqusComment] Container #${containerId} not found in DOM.`);
      return;
    }

    // (5) Set window.disqus_identifier, window.disqus_url, and global disqus_config BEFORE loading embed.js
    window.disqus_shortname = shortname;
    window.disqus_identifier = identifier;
    window.disqus_url = url;
    if (title) {
      window.disqus_title = title;
    }
    if (categoryId) {
      window.disqus_category_id = categoryId;
    }

    const configureDisqus = function (this: any) {
      const page = this && typeof this === 'object' ? this : {};
      page.page = page.page || {};
      page.page.identifier = identifier;
      page.page.url = url;
      if (title) {
        page.page.title = title;
      }
      if (categoryId) {
        page.page.category_id = categoryId;
      }
    };

    window.disqus_config = configureDisqus;

    let scriptElement: HTMLScriptElement | null = null;
    let handleScriptLoad: (() => void) | null = null;
    let handleScriptError: ((e: Event) => void) | null = null;
    let pollTimer: number | null = null;

    // (4) If DISQUS already exists on window (e.g. client-side navigation / route change), reset it
    if (window.DISQUS && typeof window.DISQUS.reset === 'function') {
      try {
        window.DISQUS.reset({
          reload: true,
          config: configureDisqus,
        });
        setIsScriptLoaded(true);
        onLoaded?.();
      } catch (err) {
        console.warn('[DisqusComment] DISQUS.reset failed:', err);
      }
    } else {
      // (2) Dynamically inject embed.js if not already present
      const scriptId = `dsq-embed-${shortname}`;
      const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;

      if (!existingScript) {
        const s = document.createElement('script');
        s.id = scriptId;
        s.src = `https://${shortname}.disqus.com/embed.js`;
        s.setAttribute('data-timestamp', String(+new Date()));
        s.async = true;

        handleScriptLoad = () => {
          setIsScriptLoaded(true);
          onLoaded?.();
        };

        handleScriptError = (e: Event) => {
          console.error('[DisqusComment] Failed to load Disqus embed script:', e);
          onError?.(e);
        };

        s.addEventListener('load', handleScriptLoad);
        s.addEventListener('error', handleScriptError);

        scriptElement = s;
        (document.head || document.body).appendChild(s);
      } else {
        // Script already exists in DOM but DISQUS might still be initializing
        scriptElement = existingScript;

        handleScriptLoad = () => {
          if (window.DISQUS && typeof window.DISQUS.reset === 'function') {
            try {
              window.DISQUS.reset({
                reload: true,
                config: configureDisqus,
              });
            } catch (err) {
              console.warn('[DisqusComment] Reset on load failed:', err);
            }
          }
          setIsScriptLoaded(true);
          onLoaded?.();
        };

        existingScript.addEventListener('load', handleScriptLoad, { once: true });

        // Poll fallback in case load event was already fired
        let attempts = 0;
        pollTimer = window.setInterval(() => {
          attempts++;
          if (window.DISQUS && typeof window.DISQUS.reset === 'function') {
            if (pollTimer) window.clearInterval(pollTimer);
            pollTimer = null;
            try {
              window.DISQUS.reset({
                reload: true,
                config: configureDisqus,
              });
            } catch (err) {
              console.warn('[DisqusComment] Reset after polling failed:', err);
            }
            setIsScriptLoaded(true);
            onLoaded?.();
          } else if (attempts > 25) {
            if (pollTimer) window.clearInterval(pollTimer);
            pollTimer = null;
          }
        }, 120);
      }
    }

    // (3) Cleanup for React 18 StrictMode double-mounting and unmounting
    return () => {
      // Clear any pending poll interval
      if (pollTimer) {
        window.clearInterval(pollTimer);
        pollTimer = null;
      }

      // Remove event listeners
      if (scriptElement && handleScriptLoad) {
        scriptElement.removeEventListener('load', handleScriptLoad);
      }
      if (scriptElement && handleScriptError) {
        scriptElement.removeEventListener('error', handleScriptError);
      }

      // Reset DISQUS instance if active to prevent state leakage or duplicate threads
      if (window.DISQUS && typeof window.DISQUS.reset === 'function') {
        try {
          window.DISQUS.reset({
            reload: false,
            config: function (this: any) {
              this.page = this.page || {};
            },
          });
        } catch {
          // Silent catch on unmount cleanup
        }
      }
    };
  }, [shortname, identifier, url, title, categoryId, containerId, onLoaded, onError]);

  return (
    <div className="disqus-container w-full">
      {/* Container where Disqus mounts its thread */}
      <div id={containerId} ref={containerRef} className={className} />

      <noscript>
        Please enable JavaScript to view the{' '}
        <a
          href={`https://${shortname}.disqus.com/?ref_noscript`}
          rel="noopener noreferrer"
          target="_blank"
          className="text-amber-700 underline font-medium"
        >
          comments powered by Disqus.
        </a>
      </noscript>
    </div>
  );
};
