import axios from "axios";
import router, { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FieldValues,
  SubmitHandler,
  useForm,
  useFieldArray,
} from "react-hook-form";
import toast from "react-hot-toast";
import getResume from "./actions/getResume";

export default async function Home() {
  // const [data, setData] = useState("");
  // const router = useRouter();
  const resumes = await getResume();
  console.log(resumes);

  // const {
  //   register,
  //   handleSubmit,
  //   control,
  //   setValue,
  //   watch,
  //   formState: { errors },
  //   reset,
  // } = useForm<FieldValues>({
  //   defaultValues: {
  //     yourName: "",
  //     yourEmail: "",
  //     region: "",
  //     location: "",
  //     photoSrc: "",
  //     fileSrc: "",
  //     videoSrc: "",
  //     category: "",
  //     minrate: "",
  //     content: "",
  //     skills: "",
  //     name: "",
  //     age: "",
  //   },
  // });

  // const { fields, remove, append } = useFieldArray({
  //   control,
  //   name: "experience"
  // });

  // const onSubmit: SubmitHandler<FieldValues> = (data) => {

  //   console.log(data)

  //   axios
  //     .post("/api/resumes", data)
  //     .then(() => {
  //       toast.success("Resume Created");
  //       router.refresh();
  //     })
  //     .catch(() => {
  //       toast.error("Something went wrong!");
  //     })
  //     .finally(() => {

  //     });
  // };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("yourName")} placeholder="yourName" />
        <input {...register("yourEmail")} placeholder="yourEmail" />
        <input {...register("region")} placeholder="region" />
        <input {...register("location")} placeholder="location" />
        <input {...register("category")} placeholder="category" />
        <input {...register("content")} placeholder="content" />

        {fields.map(({ id, name, age }, index) => (
          <div key={id}>
            <input
              {...register(`experience[${index}].name`)}
              placeholder="name"
              defaultValue={name}
              type="text"
            />
            <br />
            <input
              {...register(`experience[${index}].age`)}
              placeholder="age"
              defaultValue={age}
              type="text"
            />
            <br />
            <button type="button" onClick={() => remove(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={() => append({})}>
          Add Student
        </button>

        <p>{data}</p>
        <input type="submit" />
      </form> */}
      <div
        className="
      pt-24
      grid
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      xl:grid-cols-5
      2xl:grid-cols-6
gap-8
      "
      >
        {resumes.map((resume: any) => {
          // const employers = resume.experience.map((experience: any) => experience.employer);
          // console.log(employers);

          return (
            <div key={resume.yourName}>
              <div className="text-white">{resume.yourName}</div>
              <div className="text-white">
                {resume.experience.map((exp: any) => (
                  <div key={exp.employer}>
                    <div>{exp.employer}</div>
                    <div>{exp.jobTitle}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
