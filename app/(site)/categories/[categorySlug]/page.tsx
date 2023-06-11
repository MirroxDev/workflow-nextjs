import getCurrentCategory from "@/app/actions/getCurrentCategory";
import getResumesByCategorySlug from "@/app/actions/getResumesByCategorySlug";
import Container from "@/app/components/Container";
import ResumeItem from "@/app/components/site/all-resumes/ResumeItem";

interface IParams {
  categorySlug?: string;
}

const Category = async ({ params }: { params: IParams }) => {
  const resumes = await getResumesByCategorySlug(params);
  const category = await getCurrentCategory(params);

  return (
    <>
      <header className="h-[150px] bg-gradient-to-r flex items-center from-sky-500 to-indigo-500 ">
        <Container custom="ml-0" small>
          <div className="text-5xl text-white text-left">{category?.title}</div>
        </Container>
      </header>
      <Container small>
        <div
          className="
    grid
    grid-cols-4
    ">
          <div className="col-span-3">
            {resumes.map((resume: any) => {
              return (
                <ResumeItem
                  key={resume.id}
                  id={resume.id}
                  name={resume.yourName}
                  rank={resume.rank}
                  location={resume.region}
                  skills={resume.skills}
                  minrate={resume.minrate}
                />
              );
            })}
          </div>
          <div className="col-span-1">2</div>
        </div>
      </Container>
    </>
  );
};

export default Category;
