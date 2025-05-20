import type React from "react";
import { requireAdmin } from "@/lib/auth-utils";
import AdminSidebar from "@/components/admin/admin-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Verify admin access
  requireAdmin();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>
      </div>
    </SidebarProvider>
  );
}
