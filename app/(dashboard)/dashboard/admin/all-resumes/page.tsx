import getCurrentUser from "@/app/actions/getCurrentUser";
import getResumes from "@/app/actions/getResumes";
import AdminAllResumes from "./AdminAllResumes";

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
        <AdminAllResumes data={allResumes} />
      </div>
    );
  }
};

export default AllResumes;
