"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import InputForm from "../../inputs/InputForm";

const AddCategoryForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isDirty, isValid },
    reset,
  } = useForm({ mode: "onChange" });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);

    axios
      .post("/api/category", data)
      .then(() => {
        toast.success("Категорію створено!");
        router.refresh();
      })
      .catch(() => {
        toast.error("Сталяся помилка!");
      })
      .finally(() => {});
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row items-end gap-4">
          <InputForm
            id="title"
            label="Введіть назву категорії"
            placeholder="Назва категорії"
            required
            maxLength={50}
            minLength={3}
            register={register}
            errors={errors}
          />
          <button
            className={`
            bg-green-600 
            text-white 
            h-[46px]
            py-2
            px-4 
            rounded-md 
            ${isValid ? "hover:bg-green-800" : "bg-green-800"} 
            transition
            `}
            type="submit"
            disabled={!isDirty || !isValid}>
            Створити
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryForm;
