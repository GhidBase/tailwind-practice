import { useLocation } from "react-router";
import { useEffect } from "react";

const env = import.meta.env.VITE_ENV;

export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    // 🚫 Ignore admin / dev traffic
    if (env === "DEV") return;
    if (!window.gtag) return;

    window.gtag("config", "G-X8KBQ5CE84", {
      page_path: location.pathname + location.search,
    });
  }, [location.pathname, location.search]);
}
