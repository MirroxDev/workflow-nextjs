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

  if (!resumesId || typeof resumesId !== 'string') {
    throw new Error('Invalid ID');
  }

  const resume = await prisma.resume.deleteMany({
    where: {
      id: resumesId,
      userId: currentUser.id
    }
  });

  return NextResponse.json(resume);
}