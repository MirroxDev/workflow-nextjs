import getResumesById from "@/app/actions/getResumesByUserId";
import ResumesList from "@/app/components/dashboard/resumes/ResumesList";

const MyResumes = async () => {
  const myResumes = await getResumesById();
  
  return (
    <div>
      <ResumesList data={myResumes} />
    </div>
  );
};

export default MyResumes;
