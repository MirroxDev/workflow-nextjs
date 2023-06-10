import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
  const body = await request.json();
  const {
    yourName,
    yourEmail,
    region,
    location,
    rank,
    photoSrc,
    fileSrc,
    videoSrc,
    category,
    minrate,
    content,
    skills,
    experience,
    education,
    urls,
  } = body;

  const convertToISOString = (dateString: any) => {
    const dateTimeString = dateString + "T00:00:00.000Z";
    const dateTime = new Date(dateTimeString);
    const formattedDateTimeString = dateTime.toISOString();
    return formattedDateTimeString;
}

  const resume = await prisma.resume.create({
    data: {
      yourName,
      yourEmail,
      region: region.value,
      rank,
      location,
      photoSrc,
      fileSrc,
      videoSrc,
      category: category.value,
      minrate,
      content,
      skills,
      userId: currentUser.id,
      experience: {
        connectOrCreate: experience.map((exp: any) => ({
          create: {
            employer: exp.employer,
            jobTitle: exp.jobtitle,
            startDate: convertToISOString(exp.startend),
            endDate: convertToISOString(exp.end),
            notes: exp.notes,
          },
          where: { id: currentUser.id },
        })),
      },
      education: {
        connectOrCreate: education.map((edu: any) => ({
          create: {
            schoolname: edu.schoolname,
            qualification: edu.qualification,
            startDate: convertToISOString(edu.startDate),
            endDate: convertToISOString(edu.endDate),
            notes: edu.notes,
          },
          where: { id: currentUser.id },
        })),
      },
      urls: {
        connectOrCreate: urls.map((u: any) => ({
          create: {
            name: u.name,
            url: u.url,
          },
          where: { id: currentUser.id },
        })),
      },
    },
    include: {
      experience: true,
      urls: true,
      education: true,
    },
  });

  return NextResponse.json(resume);
}
