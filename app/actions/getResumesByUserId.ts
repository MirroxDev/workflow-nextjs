import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getResumesByUserId() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }

  try {
    const resume = await prisma.resume.findMany({
      where: {
        userId: currentUser.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        experience: true,
        urls: true,
        education: true,
      },
    });

    if (!resume) {
      return null;
    }

    return resume;
  } catch (error: any) {
    throw new Error(error);
  }
}
