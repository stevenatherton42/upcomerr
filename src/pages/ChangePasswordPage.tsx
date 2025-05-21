
import { ChangePasswordForm } from "@/components/auth/ChangePasswordForm";

export default function ChangePasswordPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-jellyseerr-background">
      <h1 className="text-4xl font-bold mb-8 text-accent">Upcomerr</h1>
      <ChangePasswordForm />
    </div>
  );
}
