"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
              Surf na Mao
            </Link>
            <div className="ml-10 flex items-center space-x-4">
              <Link
                href="/schools"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/schools")
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Schools
              </Link>
              <Link
                href="/boards"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/boards")
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Boards
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <Link
                  href="/bookings"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive("/bookings")
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  My Bookings
                </Link>
                <Button
                  variant="ghost"
                  onClick={() => signOut()}
                  className="text-gray-700 hover:text-blue-600"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/signin">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 