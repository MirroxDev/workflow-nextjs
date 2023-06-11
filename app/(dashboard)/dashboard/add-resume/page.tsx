import getCategories from "@/app/actions/getCategories";
import AddResumeForm from "@/app/components/dashboard/add-resume/AddResumeForm";

const AddResumePage = async () => {
  const categories = await getCategories();

  return (
    <>
      <AddResumeForm categories={categories} />
    </>
  );
};

export default AddResumePage;
