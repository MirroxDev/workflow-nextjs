import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  categoryId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { categoryId } = params;

  if (!categoryId || typeof categoryId !== "string") {
    throw new Error("Invalid ID");
  }

  if (currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  const categories = await prisma.categories.deleteMany({
    where: {
      id: categoryId,
    },
  });

  return NextResponse.json(categories);
}
