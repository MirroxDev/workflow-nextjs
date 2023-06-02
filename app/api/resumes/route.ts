import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
// import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  //   const currentUser = await getCurrentUser();
  //   if (!currentUser) {
  //     return NextResponse.error();
  //   }
  const body = await request.json();
  const {
    yourName,
    yourEmail,
    region,
    location,
    photoSrc,
    fileSrc,
    videoSrc,
    category,
    minrate,
    content,
    skills,
  } = body;

  const resume = await prisma.resume.create({
    data: {
      yourName,
      yourEmail,
      region,
      location,
      photoSrc,
      fileSrc,
      videoSrc,
      category,
      minrate,
      content,
      skills,
      userId: "64761d0b82044341c854601e"
    },
  });

  return NextResponse.json(resume);
}
