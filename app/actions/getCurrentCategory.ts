import prisma from "@/app/libs/prismadb";

interface IParams {
  categorySlug?: string;
}

export default async function getCurrentCategory(params: IParams) {
  try {
    const { categorySlug } = params;

    const category = await prisma.categories.findFirst({
      where: {
        slug: categorySlug,
      },
    });

    return category;
  } catch (error: any) {
    throw new Error(error);
  }
}
