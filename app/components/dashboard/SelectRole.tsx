"use client";

import axios from "axios";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Container from "../Container";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SelectRole = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      role: "",
    },
  });

  const handleCheckboxChange = (event: any) => {
    setSelectedValue(event.target.value);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {

    axios
      .post("/api/changerole", data)
      .then(() => {
        toast.success("Вам назначино новую роль!");
        router.refresh();
      })
      .catch(() => {
        toast.error("Something went wrong!");
      })
      .finally(() => {});
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)} className="w-[80vw]">
        <div>
          <header className="flex flex-row justify-around items-center gap-5">
            <div
              className={`
            relative 
            w-[300px] 
            h-[400px] 
            shadow-xl
            bg-white
            border-4
            rounded-2xl
            overflow-hidden
            ${selectedValue === "CANDIDATE" ? "border-green-600 border-4" : ""}
            flex
            flex-col
            items-center
            justify-center
            gap-3
            `}
            >
              <div className="p-6">
                <Image
                  alt="candidate icon"
                  src="/images/computer-worker.png"
                  width={412}
                  height={412}
                  className="w-full object-cover"
                />
              </div>
              <div className="font-extrabold text-gray-800 text-xl">
                КАНДИДАТ
              </div>
              <input
                className={`
          absolute 
          inset-0
          z-10
          cursor-pointer
          overflow-visible
          opacity-0
          `}
                {...register("role")}
                value="CANDIDATE"
                type="checkbox"
                checked={selectedValue === "CANDIDATE"}
                onChange={handleCheckboxChange}
              />
            </div>
            <div
              className={`
            relative 
            w-[300px] 
            h-[400px] 
            shadow-xl
            bg-white
            border-4
            rounded-2xl
            overflow-hidden
            ${selectedValue === "EMPLOYER" ? "border-green-600 border-4" : ""}
            flex
            flex-col
            items-center
            justify-center
            gap-3
            `}
            >
              <div className="p-6">
                <Image
                  alt="candidate icon"
                  src="/images/insurance-company.png"
                  width={412}
                  height={412}
                  className="w-full object-cover"
                />
              </div>
              <div className="font-extrabold text-gray-800 text-xl">
                РОБОТОДАВЕЦЬ
              </div>
              <input
                className={`
          absolute 
          inset-0
          z-10
          cursor-pointer
          overflow-visible
          opacity-0
          `}
                {...register("role")}
                value="EMPLOYER"
                type="checkbox"
                checked={selectedValue === "EMPLOYER"}
                onChange={handleCheckboxChange}
              />
            </div>
          </header>
          <footer className="flex items-center flex-row justify-center pt-10">
            <button
              className="py-4 
              px-10 
              bg-fuchsia-700
              rounded-lg
              cursor-pointer 
              text-white
              hover:bg-fuchsia-500
              transition
              text-xl
              "
              type="submit"
            >
              Продовжити
            </button>
          </footer>
        </div>
      </form>
    </Container>
  );
};

export default SelectRole;
