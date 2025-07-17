import { useCallback, useEffect, useRef, useState } from "react";

export function useLemon() {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<null | Error>(null);
  const scriptInjected = useRef(false);

  /**
   * Idempotently inject the Lemon Squeezy script tag.
   */
  useEffect(() => {
    if (scriptInjected.current) return;

    const script = document.createElement("script");
    script.src = "https://app.lemonsqueezy.com/js/lemon.js";
    script.defer = true;
    script.onload = () => {
      scriptInjected.current = true;
      // lemon.js exposes window.LemonSqueezy after load
      if (
        typeof window.LemonSqueezy === "object" &&
        typeof window.LemonSqueezy.Url === "object" &&
        typeof window.LemonSqueezy.Url.Open === "function"
      ) {
        setReady(true);
      } else {
        setError(new Error("LemonSqueezy global not found after script load"));
      }
    };
    script.onerror = () => {
      setError(new Error("Failed to load Lemon Squeezy script"));
    };
    document.body.appendChild(script);

    // Cleanup on unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  /**
   * Programmatically open the Lemon Squeezy overlay.
   * @param url – The Lemon checkout / portal URL you want to open.
   */
  const open = useCallback(
    (url: string) => {
      if (!ready) {
        console.warn("Lemon script not ready yet");
        return;
      }
      window.LemonSqueezy.Url.Open(url);
    },
    [ready]
  );

  /**
   * Helper to open checkout for a specific variant id.
   */
  const openCheckout = useCallback(
    (variantId: string, storeSubdomain: string) => {
      const checkoutUrl = `https://${storeSubdomain}.lemonsqueezy.com/checkout/buy/${variantId}`;
      open(checkoutUrl);
    },
    [open]
  );

  /**
   * Helper to open the Lemon customer portal (pass the portal URL you received via webhook).
   */
  const openPortal = useCallback(
    (portalUrl: string) => {
      open(portalUrl);
    },
    [open]
  );

  return { ready, error, openCheckout, openPortal, open } as const;
}

// Ensure TypeScript knows about the Lemon global
declare global {
  interface Window {
    LemonSqueezy: {
      Url: {
        Open: (url: string) => void;
      };
    };
  }
}
