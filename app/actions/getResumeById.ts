import prisma from "@/app/libs/prismadb";

interface IParams {
  slug?: string;
}

export default async function getResumeById(params: IParams) {
  try {

    const { slug } = params;
    
    console.log("GET " + params);

    const resume = await prisma.resume.findUnique({
      where: {
        id: slug,
      },
      include: {
        experience: true,
        urls: true,
        education: true,
        user: true,
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
