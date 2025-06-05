import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

interface SchoolDetailsProps {
  params: { id: string };
}

export default async function SchoolDetailsPage({ params }: SchoolDetailsProps) {
  const school = await prisma.school.findUnique({
    where: { id: params.id },
    include: {
      boards: true,
      reviews: {
        include: {
          user: true,
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!school) return notFound();

  const averageRating =
    school.reviews.length > 0
      ? school.reviews.reduce((acc: number, r: { rating: number }) => acc + r.rating, 0) / school.reviews.length
      : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="md:w-1/2">
          <div className="relative w-full h-64 md:h-96 mb-4">
            <Image
              src={school.images[0] || "/placeholder-school.svg"}
              alt={school.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {school.images.slice(1).map((img: string, i: number) => (
              <Image
                key={i}
                src={img}
                alt={school.name}
                width={80}
                height={60}
                className="rounded-md object-cover"
              />
            ))}
          </div>
        </div>
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold">{school.name}</h1>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="font-medium">{averageRating.toFixed(1)}</span>
            <span className="text-gray-500">({school.reviews.length} reviews)</span>
          </div>
          <p className="text-gray-700">{school.description}</p>
          <div className="text-gray-500">
            {school.city}, {school.country}
          </div>
          <div className="flex gap-4 mt-4">
            <Link href={`mailto:${school.email}`} className="text-blue-600 underline">
              Contact
            </Link>
            {school.website && (
              <Link href={school.website} target="_blank" className="text-blue-600 underline">
                Website
              </Link>
            )}
          </div>
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition">
            Book Now
          </button>
        </div>
      </div>

      {/* Boards */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Boards Available</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {school.boards.length === 0 && <div>No boards listed yet.</div>}
          {school.boards.map((board: any) => (
            <div key={board.id} className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold text-lg mb-2">{board.name}</h3>
              <div className="text-gray-500 mb-1">{board.type} - {board.size} ft</div>
              <div className="text-gray-500 mb-1">Condition: {board.condition}</div>
              <p className="text-gray-700 mb-2 line-clamp-2">{board.description}</p>
              <Link href={`/boards/${board.id}`} className="text-blue-600 underline text-sm">
                View Board
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        <div className="space-y-6">
          {school.reviews.length === 0 && <div>No reviews yet.</div>}
          {school.reviews.map((review: any) => (
            <div key={review.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="font-medium">{review.rating}</span>
                <span className="text-gray-500 text-sm">by {review.user?.name || "Anonymous"}</span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
        {/* Review form placeholder */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Leave a Review</h3>
          <div className="bg-white p-4 rounded-lg shadow">
            {/* TODO: Add review form */}
            <p className="text-gray-500">(Review form coming soon)</p>
          </div>
        </div>
      </section>
    </div>
  );
} 