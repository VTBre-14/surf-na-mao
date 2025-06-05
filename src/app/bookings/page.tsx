import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function BookingsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return notFound();

  const bookings = await prisma.booking.findMany({
    where: { userId: session.user.id },
    include: {
      school: true,
      board: true,
    },
    orderBy: { startDate: "desc" },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
      <div className="space-y-6">
        {bookings.length === 0 && <div>You have no bookings yet.</div>}
        {bookings.map((booking: any) => (
          <div key={booking.id} className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="text-gray-500 text-sm mb-1">
                {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
              </div>
              <div className="font-semibold text-lg mb-1">
                <Link href={`/schools/${booking.schoolId}`} className="underline">
                  {booking.school.name}
                </Link>
              </div>
              {booking.board && (
                <div className="text-gray-700 text-sm mb-1">
                  Board: <Link href={`/boards/${booking.boardId}`} className="underline">{booking.board.name}</Link>
                </div>
              )}
              <div className="text-xs text-gray-500 mb-1">Status: {booking.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 