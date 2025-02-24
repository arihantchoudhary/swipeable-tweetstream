
import { Button } from "@/components/ui/button";
import { useWeb3Auth } from "@/contexts/Web3AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Auth = () => {
  const { connect, isConnected } = useWeb3Auth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected) {
      navigate('/scroll');
    }
  }, [isConnected, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Connect Your Wallet
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Connect your Web3 wallet to access the decentralized social feed
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <Button
            className="w-full"
            size="lg"
            onClick={connect}
          >
            Connect Wallet
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
