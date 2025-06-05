import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

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

interface SchoolCardProps {
  school: School;
}

export function SchoolCard({ school }: SchoolCardProps) {
  const averageRating =
    school.reviews.reduce((acc, review) => acc + review.rating, 0) /
    school.reviews.length;

  return (
    <Link href={`/schools/${school.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-48">
          <Image
            src={school.images[0] || "/placeholder-school.svg"}
            alt={school.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{school.name}</h3>
          <p className="text-gray-600 text-sm mb-2">{school.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm">
                {averageRating.toFixed(1)} ({school.reviews.length} reviews)
              </span>
            </div>
            <span className="text-sm text-gray-500">
              {school.city}, {school.country}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
} 