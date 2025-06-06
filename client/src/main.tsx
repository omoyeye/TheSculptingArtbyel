import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";

// Global error handler for unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  event.preventDefault();
});

// Global error handler for unhandled errors
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <App />
      <Toaster />
    </TooltipProvider>
  </QueryClientProvider>
);
