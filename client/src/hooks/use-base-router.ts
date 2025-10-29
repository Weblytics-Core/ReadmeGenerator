import { useLocation } from "wouter";
import { useEffect } from "react";

const BASE_PATH = "/ReadmeGenerator";

export const useBaseRouter = () => {
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith(BASE_PATH)) {
      const withoutBase = path.slice(BASE_PATH.length) || "/";
      if (withoutBase !== location) {
        setLocation(withoutBase);
      }
    }
  }, [location, setLocation]);

  const navigate = (to: string) => {
    const fullPath = `${BASE_PATH}${to.startsWith("/") ? to : `/${to}`}`;
    setLocation(to);
    window.history.pushState(null, "", fullPath);
  };

  return { navigate, location };
};