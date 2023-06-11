"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface AdminAllResumesProps {
  data: any;
}

const AdminAllResumes: React.FC<AdminAllResumesProps> = ({ data }) => {
  const router = useRouter();

  const onDisabled = (id: string) => {
    axios
      .put(`/api/resumes/${id}`)
      .then(() => {
        toast.success("Резюме відключено!");
        router.refresh();
      })
      .catch(() => {
        toast.error("Сталяся помилка!");
      })
      .finally(() => {});
  };

  const onEnabled = (id: string) => {
    axios
      .put(`/api/resumes/${id}`)
      .then(() => {
        toast.success("Резюме опубліковано!");
        router.refresh();
      })
      .catch(() => {
        toast.error("Сталяся помилка!");
      })
      .finally(() => {});
  };

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
            <th className="text-white py-4">Імя</th>
            <th className="text-white py-4">Вміння</th>
            <th className="text-white py-4">Місцезнаходження</th>
            <th className="text-white py-4">Професія</th>
            <th className="text-white py-4">Дата публыкації</th>
            <th className="text-white py-4">Статус</th>
            <th className="text-white py-4"></th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {data?.map((resume: any) => {
            return (
              <tr className="text-center border-b" key={resume.id}>
                <td className="py-2 px-2">{resume.yourName}</td>
                <td className="py-2 px-2">{resume.skills}</td>
                <td className="py-2 px-2">{resume.region}</td>
                <td className="py-2 px-2">{resume.rank}</td>
                <td className="py-2 px-2">{formatDate(resume.createdAt)}</td>
                <td className="py-2 px-2">{resume.status}</td>
                <td className="py-2 px-2 flex flex-col items-center justify-center gap-2">
                  {resume.status === "DISABLED" ? (
                    <>
                      <button
                        onClick={() => {
                          if (window.confirm("Опублікувати резюме?")) {
                            onEnabled(resume.id);
                          }
                        }}
                        className="py-1 px-2 w-full bg-yellow-500 text-white rounded-xl hover:bg-rose-950 transition">
                        Опублікувати
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          if (window.confirm("Опублікувати резюме?")) {
                            onDisabled(resume.id);
                          }
                        }}
                        className="py-1 px-2 w-full bg-yellow-500 text-white rounded-xl hover:bg-rose-950 transition">
                        Зняти з публікації
                      </button>
                    </>
                  )}
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
                    className="py-1 px-2 w-full bg-rose-700 text-white rounded-xl hover:bg-rose-950 transition">
                    Видалити
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-4">
        <button
          onClick={() => router.push("/dashboard/add-resume")}
          className="bg-green-600 text-white py-4 px-4 rounded-md hover:bg-green-800 transition">
          Додати резюме
        </button>
      </div>
    </>
  );
};

export default AdminAllResumes;
