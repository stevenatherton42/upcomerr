
import { ReactNode, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !currentUser) {
      // Redirect to login page, but save the current location to redirect back after login
      navigate("/login", { state: { from: location } });
    }
  }, [currentUser, loading, navigate, location]);

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-jellyseerr-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-jellyseerr-muted">Authenticating...</p>
        </div>
      </div>
    );
  }

  // Render children only if the user is authenticated
  return currentUser ? <>{children}</> : null;
}
