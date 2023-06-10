import getCategories from "@/app/actions/getCategories";
import getCurrentUser from "@/app/actions/getCurrentUser";
import AddCategoryForm from "@/app/components/dashboard/add-category/AddCategoryForm";
import ListCategories from "@/app/components/dashboard/add-category/ListCategories";

const AddCategory = async () => {
  const currentUser = await getCurrentUser();
  const categories = await getCategories();

  if (!currentUser) {
    return null;
  }

  if (currentUser.role !== "ADMIN") {
    return <div>Only Admin Page!</div>;
  }

  return (
    <>
      <AddCategoryForm />
      <ListCategories categories={categories} />
    </>
  );
};

export default AddCategory;
