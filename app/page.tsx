"use client"
import axios from "axios";
import router, { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function Home() {
  const [data, setData] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      yourName: "",
      yourEmail: "",
      region: "",
      location: "",
      photoSrc: "",
      fileSrc: "",
      videoSrc: "",
      category: "",
      minrate: "",
      content: "",
      skills: ""
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {

    axios
      .post("/api/resumes", data)
      .then(() => {
        toast.success("Resume Created");
        router.refresh();
      })
      .catch(() => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        
      });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("yourName")} placeholder="yourName" />
        <input {...register("yourEmail")} placeholder="yourEmail" />
        <input {...register("region")} placeholder="region" />
        <input {...register("location")} placeholder="location" />
        <input {...register("category")} placeholder="category" />
        <input {...register("content")} placeholder="content" />

        <p>{data}</p>
        <input type="submit" />
      </form>
    </main>
  );
}
