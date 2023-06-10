import prisma from "@/app/libs/prismadb";

export default async function getCategories() {
  try {
    const categories = await prisma.categories.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return categories;
  } catch (error: any) {
    throw new Error(error);
  }
}
