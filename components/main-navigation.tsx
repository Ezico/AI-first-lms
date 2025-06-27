"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { UserButton } from "@/components/auth/user-button";

// Update the navigation array to include the Team page
const navigation = [
  { name: "Home", href: "/" },
  { name: "Book", href: "/book" },
  { name: "Academy", href: "/academy" },
  // { name: "Summit", href: "/summit" },
  // { name: "Podcast", href: "/podcast" },
  { name: "Team", href: "/team" },
];

export default function MainNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">AI First</span>
            <div className="flex items-center">
              <div className="bg-purple-700 text-white p-2 rounded mr-2">
                <span className="font-bold text-xl">AI</span>
              </div>
              <span className="font-bold text-xl">FIRST</span>
            </div>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-semibold leading-6 transition-colors ${
                isActive(item.href)
                  ? "text-purple-700"
                  : "text-gray-900 hover:text-purple-700"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <UserButton />
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="fixed inset-0 bg-gray-900/80" onClick={closeMenu} />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5" onClick={closeMenu}>
                <span className="sr-only">AI First</span>
                <div className="flex items-center">
                  <div className="bg-purple-700 text-white p-2 rounded mr-2">
                    <span className="font-bold text-xl">AI</span>
                  </div>
                  <span className="font-bold text-xl">FIRST</span>
                </div>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={closeMenu}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                        isActive(item.href)
                          ? "text-purple-700"
                          : "text-gray-900 hover:bg-gray-50"
                      }`}
                      onClick={closeMenu}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  <UserButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
