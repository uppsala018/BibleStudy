"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export default function PwaInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showIosHint, setShowIosHint] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    // Already installed — don't show
    if (window.matchMedia("(display-mode: standalone)").matches) return;

    // iOS Safari — no beforeinstallprompt, show manual hint instead
    const isIos =
      /iphone|ipad|ipod/i.test(navigator.userAgent) &&
      !(navigator as Navigator & { standalone?: boolean }).standalone;
    if (isIos) {
      const seen = sessionStorage.getItem("ios-install-hint");
      if (!seen) setShowIosHint(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => setDeferredPrompt(null));
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, [dismissed]);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem("ios-install-hint", "1");
    setShowIosHint(false);
  };

  if (dismissed) return null;

  if (deferredPrompt) {
    return (
      <div className="pwa-install-banner">
        <span className="pwa-install-banner__icon">✝</span>
        <div className="pwa-install-banner__text">
          <strong>Install One In Him</strong>
          <span>Add to your home screen for offline access</span>
        </div>
        <button className="pwa-install-banner__btn" onClick={handleInstall}>
          Install
        </button>
        <button
          className="pwa-install-banner__dismiss"
          onClick={handleDismiss}
          aria-label="Dismiss"
        >
          ✕
        </button>
      </div>
    );
  }

  if (showIosHint) {
    return (
      <div className="pwa-install-banner pwa-install-banner--ios">
        <span className="pwa-install-banner__icon">✝</span>
        <div className="pwa-install-banner__text">
          <strong>Install One In Him</strong>
          <span>
            Tap <strong>Share</strong> ↑ then{" "}
            <strong>Add to Home Screen</strong>
          </span>
        </div>
        <button
          className="pwa-install-banner__dismiss"
          onClick={handleDismiss}
          aria-label="Dismiss"
        >
          ✕
        </button>
      </div>
    );
  }

  return null;
}
