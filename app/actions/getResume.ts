import prisma from "@/app/libs/prismadb";

export default async function getResume() {
  try {
    const resume = await prisma.resume.findMany({
      orderBy: {
        createdAt: "desc",
        },
        include: { experience: true },
    });

    return resume;
  } catch (error: any) {
    throw new Error(error);
  }
}
