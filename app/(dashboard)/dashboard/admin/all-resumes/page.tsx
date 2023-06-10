import getCurrentUser from "@/app/actions/getCurrentUser";
import getResumes from "@/app/actions/getResumes";
import ResumesList from "@/app/components/dashboard/resumes/ResumesList";

const AllResumes = async () => {
  const currentUser = await getCurrentUser();
  const allResumes = await getResumes();

  if (!currentUser) {
    return null;
  }

  if (currentUser.role !== "ADMIN") {
    return <div>Only Admin Page!</div>;
  }

  if (currentUser.role === "ADMIN") {
    return (
      <div>
        <ResumesList data={allResumes} />
      </div>
    );
  }
};

export default AllResumes;
