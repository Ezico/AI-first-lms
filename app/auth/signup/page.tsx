import { SignUpForm } from "@/components/auth/signup-form"
import MainNavigation from "@/components/main-navigation"
import MainFooter from "@/components/main-footer"

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNavigation />
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <SignUpForm />
      </div>
      <MainFooter />
    </div>
  )
}
