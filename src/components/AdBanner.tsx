"use client";

import { useEffect, useRef } from "react";

export default function AdBanner() {
  const adRef = useRef<HTMLModElement>(null); // ✅ correct type for <ins>

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        if (typeof window !== "undefined" && adRef.current) {
          // @ts-ignore - ignore adsbygoogle type warnings
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (e) {
        console.warn("AdSense error:", e);
      }
    }, 500); // wait for layout

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex justify-center my-8">
      <ins
        ref={adRef}
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
