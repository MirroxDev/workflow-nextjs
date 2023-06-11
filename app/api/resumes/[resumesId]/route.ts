import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  resumesId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { resumesId } = params;

  if (!resumesId || typeof resumesId !== "string") {
    throw new Error("Invalid ID");
  }

  if (currentUser.role === "ADMIN") {
    const resume = await prisma.resume.deleteMany({
      where: {
        id: resumesId,
      },
    });

    return NextResponse.json(resume);
  }

  const resume = await prisma.resume.deleteMany({
    where: {
      id: resumesId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(resume);
}

// ==================================================================

export async function PUT(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { resumesId } = params;

  if (!resumesId || typeof resumesId !== "string") {
    throw new Error("Invalid ID");
  }

  if (currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  // получем текущий статус нашего резюме
  const status = await prisma.resume.findFirst({
    where: {
      id: resumesId,
    },
  });

  if (status?.status === "ENABLED") {
    const resumes = await prisma.resume.update({
      where: {
        id: resumesId,
      },
      data: {
        status: "DISABLED",
      },
    });

    return NextResponse.json(resumes);
  } else {
    const resumes = await prisma.resume.update({
      where: {
        id: resumesId,
      },
      data: {
        status: "ENABLED",
      },
    });

    return NextResponse.json(resumes);
  }
}
