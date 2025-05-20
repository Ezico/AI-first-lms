import { requireAuth } from "@/lib/auth-utils"
import ProfileSettings from "@/components/profile/profile-settings"
import MainNavigation from "@/components/main-navigation"
import MainFooter from "@/components/main-footer"

export default async function ProfilePage() {
  const user = requireAuth()

  return (
    <div className="flex min-h-screen flex-col">
      <MainNavigation />
      <div className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <ProfileSettings user={user} />
        </div>
      </div>
      <MainFooter />
    </div>
  )
}
