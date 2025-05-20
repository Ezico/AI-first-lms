import { SignInForm } from "@/components/auth/signin-form"
import MainNavigation from "@/components/main-navigation"
import MainFooter from "@/components/main-footer"

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNavigation />
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <SignInForm />
      </div>
      <MainFooter />
    </div>
  )
}
