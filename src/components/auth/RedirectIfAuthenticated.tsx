
import { ReactNode, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function RedirectIfAuthenticated({ children }: { children: ReactNode }) {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (!loading && currentUser) {
      // Redirect to the page they were trying to access or the dashboard
      navigate(from);
    }
  }, [currentUser, loading, navigate, from]);

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-jellyseerr-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-jellyseerr-muted">Loading...</p>
        </div>
      </div>
    );
  }

  // Render children only if the user is not authenticated
  return !currentUser ? <>{children}</> : null;
}
