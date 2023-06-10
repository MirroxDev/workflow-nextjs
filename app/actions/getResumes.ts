import prisma from "@/app/libs/prismadb";

export default async function getResumes() {

  try {
    const resume = await prisma.resume.findMany({
      orderBy: {
        createdAt: "desc",
        },
      include: {
        experience: true,
        urls: true,
        education: true,
      },
    });

    return resume;
  } catch (error: any) {
    throw new Error(error);
  }
}
