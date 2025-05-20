"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
// Add the Podcast icon import
import {
  BarChart,
  BookOpen,
  FileText,
  LayoutDashboard,
  LogOut,
  Mic,
  Settings,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center p-4">
          <div className="flex items-center gap-2 font-semibold">
            <div className="bg-purple-700 text-white p-1 rounded">
              <span className="font-bold text-sm">AI</span>
            </div>
            <span className="text-lg">FIRST ADMIN</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/admin"}>
              <Link href="/admin">
                <LayoutDashboard className="h-4 w-4 mr-3" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/admin/courses")}>
              <Link href="/admin/courses">
                <BookOpen className="h-4 w-4 mr-3" />
                <span>Courses</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Add the Podcasts menu item after the Courses menu item */}
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/admin/podcasts")}>
              <Link href="/admin/podcasts">
                <Mic className="h-4 w-4 mr-3" />
                <span>Podcasts</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/admin/users")}>
              <Link href="/admin/users">
                <Users className="h-4 w-4 mr-3" />
                <span>Users</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem> */}

          {/* <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/admin/content")}>
              <Link href="/admin/content">
                <FileText className="h-4 w-4 mr-3" />
                <span>Content</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem> */}

          {/* <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/admin/analytics")}>
              <Link href="/admin/analytics">
                <BarChart className="h-4 w-4 mr-3" />
                <span>Analytics</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/admin/settings")}>
              <Link href="/admin/settings">
                <Settings className="h-4 w-4 mr-3" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem> */}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
              <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={logout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
