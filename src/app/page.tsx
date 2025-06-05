import Link from 'next/link'
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"

interface School {
  id: string;
  name: string;
  description: string;
  city: string;
  country: string;
  images: string[];
  reviews: Array<{
    id: string;
    rating: number;
    comment: string;
  }>;
}

export default async function Home() {
  const featuredSchools = await prisma.school.findMany({
    take: 3,
    include: {
      reviews: true,
    },
    orderBy: {
      reviews: {
        _count: "desc",
      },
    },
  })

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center space-y-8 px-4">
          <h1 className="text-5xl font-bold">
            Find Your Perfect Surf School
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Book surf schools and boards in Portugal. Connect with experienced
            instructors and find the best waves for your skill level.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/schools">
              <Button size="lg" variant="secondary">
                Browse Schools
              </Button>
            </Link>
            <Link href="/boards">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Rent a Board
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Schools */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Featured Surf Schools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredSchools.map((school: School) => (
            <Link
              key={school.id}
              href={`/schools/${school.id}`}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform group-hover:scale-105">
                <div className="aspect-video relative">
                  <img
                    src={school.images[0]}
                    alt={school.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{school.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {school.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {school.city}, {school.country}
                    </span>
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1 text-sm text-gray-600">
                        {school.reviews.length} reviews
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Surfing Journey?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our community of surfers and find the perfect school or board for
            your next adventure.
          </p>
          <Link href="/auth/signup">
            <Button size="lg">Get Started</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
