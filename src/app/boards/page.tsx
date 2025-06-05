import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function BoardsPage() {
  const boards = await prisma.board.findMany({
    include: {
      school: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Surfboards</h1>
        <div className="flex gap-4">
          <select className="px-4 py-2 border rounded-md">
            <option value="">All Types</option>
            <option value="SHORTBOARD">Shortboard</option>
            <option value="LONGBOARD">Longboard</option>
            <option value="FISH">Fish</option>
            <option value="GUN">Gun</option>
            <option value="FUNBOARD">Funboard</option>
            <option value="HYBRID">Hybrid</option>
          </select>
          <select className="px-4 py-2 border rounded-md">
            <option value="">All Conditions</option>
            <option value="NEW">New</option>
            <option value="EXCELLENT">Excellent</option>
            <option value="GOOD">Good</option>
            <option value="FAIR">Fair</option>
            <option value="POOR">Poor</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {boards.length === 0 && <div>No boards available.</div>}
        {boards.map((board: any) => (
          <div key={board.id} className="bg-white rounded-lg shadow p-4 flex flex-col">
            <div className="mb-2">
              <span className="inline-block px-2 py-1 text-xs rounded bg-blue-100 text-blue-700 mr-2">
                {board.type}
              </span>
              <span className="inline-block px-2 py-1 text-xs rounded bg-gray-100 text-gray-700">
                {board.condition}
              </span>
            </div>
            <h2 className="text-lg font-semibold mb-1">{board.name}</h2>
            <div className="text-gray-500 text-sm mb-1">{board.size} ft</div>
            <p className="text-gray-700 mb-2 line-clamp-2">{board.description}</p>
            <div className="text-gray-500 text-xs mb-2">
              School: <Link href={`/schools/${board.schoolId}`} className="underline">{board.school.name}</Link>
            </div>
            <Link href={`/boards/${board.id}`} className="mt-auto text-blue-600 underline text-sm">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
} 