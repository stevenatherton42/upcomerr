
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-jellyseerr-background">
      <h1 className="text-4xl font-bold mb-8 text-accent">Upcomerr</h1>
      <LoginForm />
    </div>
  );
}
