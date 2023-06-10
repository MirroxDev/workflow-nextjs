"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface ListCategoriesProps {
  categories?: any;
}

const ListCategories: React.FC<ListCategoriesProps> = ({ categories }) => {
  const router = useRouter();

  const onDelete = (id: string) => {
    console.log(id);

    axios
      .delete(`/api/category/${id}`)
      .then(() => {
        toast.success("Категорію видалено!");
        router.refresh();
      })
      .catch(() => {
        toast.error("Сталяся помилка!");
      })
      .finally(() => {});
  };

  return (
    <div className="pt-4 flex flex-col gap-2">
      {categories && <div>Не знайдено жодної категорії!</div>}

      {categories?.map((category: any) => (
        <div
          className="flex flex-row items-center bg-white p-2 rounded-md justify-between"
          key={category.id}>
          <div className="text-xl">{category.title}</div>
          <div>
            <button
              onClick={() => {
                if (
                  window.confirm("Ви впевнені що хочете видалити цю категорію?")
                ) {
                  onDelete(category.id);
                }
              }}
              className="py-2 px-3 bg-rose-700 text-white rounded-xl hover:bg-rose-950 transition">
              Видалити
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListCategories;
