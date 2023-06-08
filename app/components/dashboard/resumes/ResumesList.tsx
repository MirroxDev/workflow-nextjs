"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface ResumesItemProps {
  data: any;
}

const ResumesItem: React.FC<ResumesItemProps> = ({ data }) => {
  const router = useRouter();

  const onDelete = (id: string) => {
    console.log(id);

    axios
      .delete(`/api/resumes/${id}`)
      .then(() => {
        toast.success("Резюме видалено!");
        router.refresh();
      })
      .catch(() => {
        toast.error("Сталяся помилка!");
      })
      .finally(() => {});
  };

  const formatDate = (date: string) => {
    const originalDate = new Date(date);

    const day = originalDate.getDate().toString().padStart(2, "0");
    const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
    const year = originalDate.getFullYear();

    const formattedDate = `${day}:${month}:${year}`;

    return formattedDate;
  };

  return (
    <>
      <table className="table-auto w-full rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-gray-800 divide-x">
            <th className="text-white py-4">Ім'я</th>
            <th className="text-white py-4">Вміння</th>
            <th className="text-white py-4">Місцезнаходження</th>
            <th className="text-white py-4">Категорія</th>
            <th className="text-white py-4">Дата публыкації</th>
            <th className="text-white py-4"></th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {data?.map((resume: any) => {
            return (
              <tr className="text-center" key={resume.id}>
                <td className="py-2 px-2">{resume.yourName}</td>
                <td className="py-2 px-2">{resume.skills}</td>
                <td className="py-2 px-2">{resume.region}</td>
                <td className="py-2 px-2">{resume.category}</td>
                <td className="py-2 px-2">{formatDate(resume.createdAt)}</td>
                <td className="py-2 px-2">
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Ви впевнені що хочете видалити це резюме?"
                        )
                      ) {
                        onDelete(resume.id);
                      }
                    }}
                    className="py-2 px-3 bg-rose-700 text-white rounded-xl hover:bg-rose-950 transition">
                    Видалити
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ResumesItem;
