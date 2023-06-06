import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  if (currentUser.role !== "USER") {
    return NextResponse.error();
  }

  const body = await request.json();
    const { role: string } = body;
    
    console.log(body.role);
    console.log(currentUser.email);
    

  if (body.role !== "CANDIDATE" && body.role !== "EMPLOYER") {
      return NextResponse.error();
    }
    
    console.log("ВСЁ ОК")

  if (currentUser.email !== null) {
    const roleChange = await prisma.user.update({
      where: {
        email: currentUser.email,
      },
      data: {
        role: body.role,
      },
    });

    return NextResponse.json(roleChange);
  } else {
    return NextResponse.error();
  }
}
