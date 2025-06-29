import MainNavigation from "@/components/main-navigation";
import MainFooter from "@/components/main-footer";
import { ForgotPasswordForm } from "@/components/auth/forget-password-form";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNavigation />
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <ForgotPasswordForm />
      </div>
      <MainFooter />
    </div>
  );
}
