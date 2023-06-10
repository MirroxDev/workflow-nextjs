import getResume from "@/app/actions/getResume";
import Container from "@/app/components/Container";
import ResumeItem from "@/app/components/site/all-resumes/ResumeItem";

const AllResumes = async () => {
  const allResumes = await getResume();

  return (
    <Container small>
      <div
        className="
    grid
    grid-cols-4
    ">
        <div className="col-span-3">
          {allResumes.map((resume: any) => {
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
  );
};

export default AllResumes;
