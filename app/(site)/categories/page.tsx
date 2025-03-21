import getCategories from "@/app/actions/getCategories";
import Container from "@/app/components/Container";
import Link from "next/link";

const Categories = async () => {
  const categories = await getCategories();

  return (
    <>
      <header className="h-[150px] bg-gradient-to-r flex items-center from-sky-500 to-indigo-500 ">
        <Container custom="ml-0" small>
          <div className="text-5xl text-white text-left">Всі категорії</div>
        </Container>
      </header>
      <Container small>
        <div className="h-full grid grid-cols-3 items-center justify-center gap-4 pt-10 pb-10">
          {categories.map((category: any) => {
            return (
              <>
                <Link
                  className="
                    text-gray-700
                   hover:text-green-400
                    transition
                    text-center
                    text-xl
                    bg-slate-500
                    rounded-md
                    text-white
                    h-full
                    flex
                    items-center
                    justify-center
                    py-4
                    px-2
                    "
                  href={`/categories/${category.slug}`}>
                  {category.title}
                </Link>
              </>
            );
          })}
        </div>
      </Container>
    </>
  );
};

export default Categories;
