
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { EventProvider } from "./contexts/EventContext";
import MainApp from "./pages/MainApp";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  console.log('=== APP.TSX DEBUG START ===');
  console.log('App component rendering...');
  console.log('Current location:', window.location.href);
  console.log('Hash:', window.location.hash);
  console.log('Pathname:', window.location.pathname);
  
  try {
    console.log('About to render App JSX...');
    return (
      <QueryClientProvider client={queryClient}>
        <EventProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <HashRouter>
              <Routes>
                <Route path="/" element={<MainApp />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </HashRouter>
          </TooltipProvider>
        </EventProvider>
      </QueryClientProvider>
    );
  } catch (error) {
    console.error('Error in App component render:', error);
    return <div>Error loading app: {String(error)}</div>;
  }
};

export default App;
