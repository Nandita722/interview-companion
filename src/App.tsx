import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import CreateSessionStep1 from "./pages/CreateSessionStep1";
import CreateSessionStep2 from "./pages/CreateSessionStep2";
import FreeSessionActivation from "./pages/FreeSessionActivation";
import ActiveSessionPage from "./pages/ActiveSessionPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="dark">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/create-session/step1" element={<CreateSessionStep1 />} />
            <Route path="/create-session/step2" element={<CreateSessionStep2 />} />
            <Route path="/create-session/activate" element={<FreeSessionActivation />} />
            <Route path="/session" element={<ActiveSessionPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
