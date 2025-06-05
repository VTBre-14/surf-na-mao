import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { schoolSchema } from "@/lib/validations";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city");
    const country = searchParams.get("country");

    const schools = await prisma.school.findMany({
      where: {
        ...(city && { city }),
        ...(country && { country }),
      },
      include: {
        owner: {
          select: {
            name: true,
            email: true,
          },
        },
        boards: true,
        reviews: true,
      },
    });

    return NextResponse.json(schools);
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
    const body = schoolSchema.parse(json);

    const school = await prisma.school.create({
      data: {
        ...body,
        ownerId: session.user.id,
      },
    });

    return NextResponse.json(school);
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