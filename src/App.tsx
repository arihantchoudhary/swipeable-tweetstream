
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { Web3AuthProvider } from "@/contexts/Web3AuthContext";
import Auth from "@/pages/Auth";
import Scroll from "@/pages/Scroll";
import Swipe from "@/pages/Swipe";
import SocialIntegrations from "@/pages/SocialIntegrations";
import CategorySelection from "@/pages/CategorySelection";
import Source from "@/pages/Source";

function App() {
  return (
    <Web3AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" replace />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/scroll" element={<Scroll />} />
          <Route path="/swipe" element={<Swipe />} />
          <Route path="/integrations" element={<SocialIntegrations />} />
          <Route path="/categories" element={<CategorySelection />} />
          <Route path="/source" element={<Source />} />
        </Routes>
      </Router>
      <Toaster position="top-right" />
    </Web3AuthProvider>
  );
}

export default App;
