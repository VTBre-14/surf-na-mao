import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { bookingSchema } from "@/lib/validations";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get("schoolId");
    const status = searchParams.get("status");

    const bookings = await prisma.booking.findMany({
      where: {
        ...(schoolId && { schoolId }),
        ...(status && { status: status as any }),
        userId: session.user.id,
      },
      include: {
        school: {
          select: {
            name: true,
            city: true,
            country: true,
          },
        },
        board: true,
      },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const json = await request.json();
    const body = bookingSchema.parse(json);

    // Check if the board is available for the selected dates
    if (body.boardId) {
      const existingBooking = await prisma.booking.findFirst({
        where: {
          boardId: body.boardId,
          status: "CONFIRMED",
          OR: [
            {
              AND: [
                { startDate: { lte: body.startDate } },
                { endDate: { gte: body.startDate } },
              ],
            },
            {
              AND: [
                { startDate: { lte: body.endDate } },
                { endDate: { gte: body.endDate } },
              ],
            },
          ],
        },
      });

      if (existingBooking) {
        return NextResponse.json(
          { error: "Board is not available for the selected dates" },
          { status: 400 }
        );
      }
    }

    const booking = await prisma.booking.create({
      data: {
        ...body,
        userId: session.user.id,
      },
    });

    return NextResponse.json(booking);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
} 