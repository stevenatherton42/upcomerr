
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function RequireAdmin({ children }: { children: ReactNode }) {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!currentUser) {
        navigate("/login");
      } else if (!currentUser.isAdmin) {
        navigate("/");
      }
    }
  }, [currentUser, loading, navigate]);

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

  // Render children only if the user is an admin
  return currentUser && currentUser.isAdmin ? <>{children}</> : null;
}
