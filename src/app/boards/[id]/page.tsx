import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function BoardDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const board = await prisma.board.findUnique({
    where: { id },
    include: {
      school: true,
    },
  });

  if (!board) return notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="md:w-1/2">
          <div className="relative w-full h-64 md:h-96 mb-4">
            <Image
              src={board.images[0] || "/placeholder-school.svg"}
              alt={board.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {board.images.slice(1).map((img: string, i: number) => (
              <Image
                key={i}
                src={img}
                alt={board.name}
                width={80}
                height={60}
                className="rounded-md object-cover"
              />
            ))}
          </div>
        </div>
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold">{board.name}</h1>
          <div className="flex gap-2">
            <span className="inline-block px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">
              {board.type}
            </span>
            <span className="inline-block px-2 py-1 text-xs rounded bg-gray-100 text-gray-700">
              {board.condition}
            </span>
            <span className="inline-block px-2 py-1 text-xs rounded bg-gray-100 text-gray-700">
              {board.size} ft
            </span>
          </div>
          <p className="text-gray-700">{board.description}</p>
          <div className="text-gray-500 text-sm">
            School: <Link href={`/schools/${board.schoolId}`} className="underline">{board.school.name}</Link>
          </div>
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition">
            Book This Board
          </button>
        </div>
      </div>
    </div>
  );
} 