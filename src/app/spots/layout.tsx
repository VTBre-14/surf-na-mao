import { ReactNode } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function SpotsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto py-4">
          <div className="flex items-center justify-between">
            <nav className="flex items-center space-x-6">
              <Link href="/spots" className="text-lg font-semibold">
                Surf Spots
              </Link>
              <Link href="/spots/new" className="text-sm text-muted-foreground hover:text-foreground">
                Add New Spot
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link href="/spots/map">View Map</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
} 