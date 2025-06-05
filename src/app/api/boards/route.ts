import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { boardSchema } from "@/lib/validations";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get("schoolId");
    const type = searchParams.get("type");

    const boards = await prisma.board.findMany({
      where: {
        ...(schoolId && { schoolId }),
        ...(type && { type: type as any }),
      },
      include: {
        school: {
          select: {
            name: true,
            city: true,
            country: true,
          },
        },
      },
    });

    return NextResponse.json(boards);
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
    const body = boardSchema.parse(json);

    // Verify that the user owns the school
    const school = await prisma.school.findFirst({
      where: {
        id: body.schoolId,
        ownerId: session.user.id,
      },
    });

    if (!school) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const board = await prisma.board.create({
      data: body,
    });

    return NextResponse.json(board);
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