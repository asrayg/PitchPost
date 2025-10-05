"use client";

import React, { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export default function AdBanner() {
  // ✅ Use HTMLElement (covers <ins>)
  const adRef = useRef<HTMLElement>(null);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !adRef.current) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});

      const checkAdLoaded = setInterval(() => {
        const iframe = adRef.current?.querySelector("iframe");
        if (iframe && iframe.offsetHeight > 0 && iframe.offsetWidth > 0) {
          setAdLoaded(true);
          clearInterval(checkAdLoaded);
        }
      }, 1000);

      return () => clearInterval(checkAdLoaded);
    } catch (err) {
      console.warn("Ad failed to load:", err);
    }
  }, []);

  // ❌ Hide ad until loaded
  if (!adLoaded) return null;

  return (
    <div className="flex justify-center my-8">
      <ins
        ref={adRef as React.RefObject<any>} // ✅ cast as any to silence ins ref type mismatch
        className="adsbygoogle"
        style={{
          display: "block",
          width: "100%",
          maxWidth: "728px",
          minHeight: "90px",
        }}
        data-ad-client="ca-pub-9685241323439812"
        data-ad-slot="5710983173"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
