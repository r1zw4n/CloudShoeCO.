import React, { useEffect, useState } from 'react';
import { Download, Share, X, PlusSquare } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const InstallPromptBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIos, setIsIos] = useState<boolean>(false);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(true); // default true until checked
  const [showIosGuide, setShowIosGuide] = useState<boolean>(false);

  useEffect(() => {
    // 1. Check if already running in standalone mode (installed)
    const checkStandalone = () => {
      const isStandaloneMode =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true;
      setIsStandalone(isStandaloneMode);
      return isStandaloneMode;
    };

    if (checkStandalone()) {
      return;
    }

    // 2. Check dismissal state from localStorage
    const dismissed = localStorage.getItem('cloudshoeco_pwa_dismissed') === 'true';
    setIsDismissed(dismissed);

    // 3. Detect iOS Safari
    const ua = window.navigator.userAgent.toLowerCase();
    const isIosDevice =
      /iphone|ipad|ipod/.test(ua) ||
      (window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1);
    setIsIos(isIosDevice);

    // 4. Capture beforeinstallprompt for Android/Chrome/Desktop
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsStandalone(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('cloudshoeco_pwa_dismissed', 'true');
    setIsDismissed(true);
  };

  const handleInstallClick = async () => {
    if (isIos) {
      setShowIosGuide((prev) => !prev);
      return;
    }

    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setIsStandalone(true);
      }
      setDeferredPrompt(null);
    }
  };

  // Do not render if standalone or already dismissed
  if (isStandalone || isDismissed) {
    return null;
  }

  // Only render if we have an install trigger (Chrome beforeinstallprompt) or we are on iOS
  if (!deferredPrompt && !isIos) {
    return null;
  }

  return (
    <div
      className="fixed z-40 left-3 right-3 sm:left-auto sm:right-6 sm:w-96 bottom-[calc(4.25rem+env(safe-area-inset-bottom))] sm:bottom-6 transition-all duration-300 animate-in fade-in slide-in-from-bottom-3"
      role="region"
      aria-label="Install app prompt"
    >
      <div className="rounded-xl border border-[#333333] bg-[#141414]/95 p-3.5 shadow-2xl backdrop-blur-md">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src="/cloudshoe-logo.svg"
              alt="CloudShoeCo"
              className="h-9 w-9 shrink-0 object-contain rounded-lg p-1 bg-[#1a1a1a] border border-[#2d2d2d]"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs font-semibold text-white tracking-wide">
                  Install CloudShoeCo App
                </h4>
                <span className="rounded bg-amber-400/10 px-1 py-0.5 text-[9px] font-bold text-amber-300 uppercase tracking-widest border border-amber-400/20">
                  PWA
                </span>
              </div>
              <p className="mt-0.5 text-[11px] text-[#999999] leading-tight">
                {isIos
                  ? 'Add to Home Screen for full-screen manager access.'
                  : 'Fast access, offline cache & full-screen experience.'}
              </p>
            </div>
          </div>

          <button
            onClick={handleDismiss}
            className="rounded p-1 text-[#777] hover:bg-[#252525] hover:text-white transition-colors"
            title="Dismiss"
            aria-label="Dismiss banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Action Button or iOS instructions */}
        <div className="mt-3 pt-2.5 border-t border-[#262626]">
          {isIos ? (
            <div>
              {!showIosGuide ? (
                <button
                  onClick={handleInstallClick}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-black uppercase tracking-wider hover:bg-neutral-200 transition-colors"
                >
                  <Share className="h-3.5 w-3.5" />
                  Install Instructions
                </button>
              ) : (
                <div className="space-y-1.5 text-[11px] text-[#ccc] bg-[#1a1a1a] p-2 rounded-lg border border-[#2e2e2e]">
                  <div className="flex items-center gap-2">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] font-bold text-black">
                      1
                    </span>
                    <span>
                      Tap <strong className="text-white">Share</strong> (
                      <Share className="inline h-3 w-3 mx-0.5 text-amber-300" />) in Safari's toolbar.
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] font-bold text-black">
                      2
                    </span>
                    <span>
                      Select <strong className="text-white">Add to Home Screen</strong> (
                      <PlusSquare className="inline h-3 w-3 mx-0.5 text-amber-300" />
                      ).
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleInstallClick}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-black uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                Install App
              </button>
              <button
                onClick={handleDismiss}
                className="px-3 py-1.5 text-xs text-[#888] hover:text-[#bbb] transition-colors"
              >
                Not now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
