import getResumesById from "@/app/actions/getResumesById";
import ResumesList from "@/app/components/dashboard/resumes/ResumesList";

const MyResumes = async () => {
  const myResumes = await getResumesById();
  console.log(myResumes);

  return (
    <div>
      <ResumesList data={myResumes} />
    </div>
  );
};

export default MyResumes;
