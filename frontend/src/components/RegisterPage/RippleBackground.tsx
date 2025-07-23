"use client";

import React, { useEffect, useRef } from "react";

// --- TypeScript Declaration for jQuery Ripples ---
declare global {
  interface JQuery {
    ripples(options?: {
      resolution?: number;
      dropRadius?: number;
      perturbance?: number;
      imageUrl?: string;
      interactive?: boolean;
    }): JQuery;
    ripples(command: "drop", x: number, y: number, radius: number, strength: number): JQuery;
    ripples(command: "destroy"): JQuery;
  }

  interface Window {
    $: JQueryStatic;
    jQuery: JQueryStatic;
  }
}

// --- Props (optional) ---
interface WaterRippleBackgroundProps {
  backgroundImage?: string;
  zIndex?: number;
  className?: string;
}

// --- Component ---
const WaterRippleBackground: React.FC<WaterRippleBackgroundProps> = ({
  backgroundImage = "/assets/seabedbg.jpeg",
  zIndex = -1,
  className = "",
}) => {
  const rippleRef = useRef<HTMLDivElement>(null);
  const isRipplesPluginInitialized = useRef(false);

  useEffect(() => {
    let checkInterval: NodeJS.Timeout | null = null; // For checking plugin availability

    const initializeAndSetupRipples = () => {
      if (!rippleRef.current || typeof window === 'undefined' || !window.$ || typeof window.$.fn.ripples !== 'function') {
        // console.log("jQuery or Ripples plugin not ready yet. Retrying...");
        return;
      }

      if (isRipplesPluginInitialized.current) {
        if (checkInterval) clearInterval(checkInterval);
        return;
      }

      if (checkInterval) {
        clearInterval(checkInterval);
        checkInterval = null;
      }

      const $ = window.$;
      const $rippleElement = $(rippleRef.current);

      try {
        $rippleElement.ripples({
          resolution: 512,
          dropRadius: 5, // Smaller drop radius for trail effect
          perturbance: 0.01, // Lower perturbance for a subtle trail
          imageUrl: backgroundImage,
          interactive: false,
        });
        isRipplesPluginInitialized.current = true; // Mark as initialized
        //console.log("jQuery Ripples plugin initialized successfully.");

        // --- Manual Mouse Move Handler for Ripple Trail ---
        const handleMouseMove = (e: MouseEvent) => {
          // Ensure plugin is initialized and ref is valid
          if (!rippleRef.current || !isRipplesPluginInitialized.current) return;

          const rect = rippleRef.current.getBoundingClientRect();
          const x = e.clientX - rect.left; // X coordinate relative to the ripple container
          const y = e.clientY - rect.top;  // Y coordinate relative to the ripple container

          $rippleElement.ripples("drop", x, y, 15, 0.03); // Adjust radius and strength for desired trail
        };

        document.body.addEventListener("mousemove", handleMouseMove);


        setTimeout(() => {
          if (rippleRef.current) {
            const { clientWidth, clientHeight } = rippleRef.current;
            $rippleElement.ripples("drop", clientWidth / 2, clientHeight / 2, 20, 0.04);
            console.log("Initial ripple dropped.");
          }
        }, 1000);

        return () => {
          document.body.removeEventListener("mousemove", handleMouseMove);
          if (isRipplesPluginInitialized.current) {
            try {
              const $el = $(rippleRef.current!);
              const rippleCanvas = $el.find('canvas.jquery-ripples').get(0);
              if (rippleCanvas) {
                rippleCanvas.remove();
                console.log("Ripples canvas removed during cleanup.");
                if (backgroundImage) {
                  $el.css('background-image', `url(${backgroundImage})`);
                  $el.css('background-size', 'cover');
                  $el.css('background-position', 'center');
                }
              }
            } catch (e) {
              console.warn("Error during ripples cleanup:", e);
            }
            isRipplesPluginInitialized.current = false;
          }
        };

      } catch (error) {
        console.error("Error initializing jQuery Ripples:", error);
        isRipplesPluginInitialized.current = false;
      }
    };

    checkInterval = setInterval(initializeAndSetupRipples, 100);

    return () => {
      if (checkInterval) {
        clearInterval(checkInterval);
      }
    };

  }, [backgroundImage]);

  return (
    <div
      ref={rippleRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{
        zIndex,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
        pointerEvents: "auto",
      }}
    />
  );
};

export default WaterRippleBackground;
