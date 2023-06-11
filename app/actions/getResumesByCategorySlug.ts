import prisma from "@/app/libs/prismadb";

interface IParams {
  categorySlug?: string;
}

export default async function getResumesByCategorySlug(params: IParams) {
  try {
    const { categorySlug } = params;

    console.log("message", categorySlug)

    const resume = await prisma.resume.findMany({
      where: {
        category: categorySlug,
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

    return resume;
  } catch (error: any) {
    throw new Error(error);
  }
}
