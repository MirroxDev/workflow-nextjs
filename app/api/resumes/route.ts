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
    experience,
  } = body;

  console.log(experience);

  const currentDate = new Date();
  const currentUser = "64761d0b32474341c854601e"

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
      userId: currentUser,
      experience: {
        connectOrCreate: experience.map((exp: any) => ({
          create: {
            employer: exp.name,
            jobTitle: exp.name,
            startDate: currentDate,
            endDate: currentDate,
            notes: exp.age,
          },
          where: { id: currentUser },
        })),
      },
    },
    include: {
      experience: true
    }
  });

  return NextResponse.json(resume);
}
