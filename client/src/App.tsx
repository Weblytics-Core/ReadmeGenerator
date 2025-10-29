import { Switch, Route, useLocation, useRouter } from "wouter";
import { useState, useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

const RouterWithBase = () => {
  const [location, navigate] = useLocation();
  const base = "/ReadmeGenerator";

  useEffect(() => {
    // Handle base path in URLs
    const path = window.location.pathname;
    if (path.startsWith(base)) {
      const withoutBase = path.slice(base.length) || "/";
      if (withoutBase !== location) {
        navigate(withoutBase);
      }
    }
  }, [location, navigate]);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <RouterWithBase />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
