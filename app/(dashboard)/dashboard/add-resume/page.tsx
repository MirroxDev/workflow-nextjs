"use client";

import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Select from "react-select";
import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import toast from "react-hot-toast";
import { useRef, useState } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import InputForm from "@/app/components/inputs/inputForm";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

let regions = [
  { value: "1", label: "Apple" },
  { value: "2", label: "Ball" },
  { value: "3", label: "Cat" },
];

let resume_cat = [
  { value: "Дизайн", label: "Дизайн" },
  { value: "Веб-розробка", label: "Веб-розробка" },
  { value: "Малювання", label: "Малювання" },
];

interface AddResumeProps {}

const AddResume: React.FC<AddResumeProps> = ({}) => {
  const editor = useRef(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
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
      skills: "",
    },
  });

  const category = watch("category");
  const region = watch("region");
  const content = watch("content");

  const {
    fields: urlsFields,
    remove: urlsRemove,
    append: urlsAppend,
  } = useFieldArray({
    control,
    name: "urls",
  });

  const {
    fields: educationFields,
    remove: educationRemove,
    append: educationAppend,
  } = useFieldArray({
    control,
    name: "education",
  });

  const {
    fields: experienceFields,
    remove: experienceRemove,
    append: experienceAppend,
  } = useFieldArray({
    control,
    name: "experience",
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);

    // axios
    //   .post("/api/resumes", data)
    //   .then(() => {
    //     toast.success("Resume Created");
    //     router.refresh();
    //   })
    //   .catch(() => {
    //     toast.error("Something went wrong!");
    //   })
    //   .finally(() => {});
  };

  return (
    <div>
      <div className="mb-5 text-2xl font-semibold text-gray-900">
        Створення резюме
      </div>
      <div className="bg-white rounded-xl p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-4 mb-3">
            <InputForm
              id="yourName"
              label="Ваше імя"
              placeholder="Ваше імя"
              maxLength={30}
              required
              register={register}
              errors={errors}
            />
            <label className="flex flex-col w-full">
              Ваше Email
              <input
                {...register("yourEmail", { required: true, maxLength: 30 })}
                placeholder="Ваш Email"
                type="email"
                className="input-base"
              />
            </label>
          </div>

          <div className="flex gap-4 mb-3">
            <label className="flex flex-col w-full">
              Регіон
              <Select
                id="regions"
                placeholder="Регіон"
                options={regions}
                name={region}
                onChange={(value) => setCustomValue("region", value)}
                classNames={{
                  control: () => "rounded-lg mt-2 p-1 bg-gray-50",
                }}
              />
            </label>
            <label className="flex flex-col w-full">
              Професійне звання
              <input
                {...register("rank", { required: true, maxLength: 30 })}
                placeholder="Професійне звання"
                type="text"
                className="input-base"
              />
            </label>
          </div>
          <div className="flex gap-4 mb-3">
            <label className="flex flex-col w-full">
              Місцезнаходження
              <input
                {...register("location", { required: true, maxLength: 30 })}
                placeholder="Місцезнаходження"
                type="text"
                className="input-base"
              />
            </label>
            <label className="flex flex-col w-full">
              Фото
              <input type="file" onChange={() => {}} />
              <button
                className="bg-green-600 rounded-lg text-white p-1 mt-1"
                onClick={() => {}}>
                Завантажити
              </button>
            </label>
          </div>
          <div className="flex gap-4 mb-3">
            <label className="flex flex-col w-full">
              Відео (необовязково)
              <input
                {...register("videoSrc")}
                placeholder="Відео"
                type="url"
                className="input-base"
              />
            </label>
            <label className="flex flex-col w-full">
              Категорія резюме
              <Select
                id="resume_cat"
                placeholder="Категорія резюме"
                options={resume_cat}
                name={category}
                onChange={(value) => setCustomValue("category", value)}
                classNames={{
                  control: () => "rounded-lg mt-2 p-1 bg-gray-50",
                }}
              />
            </label>
          </div>
          <div className="flex gap-4 mb-3">
            <label className="flex flex-col w-full">
              Мінімальна норма/год (опціонально)
              <input
                {...register("minrate")}
                placeholder="наприклад 20"
                type="text"
                className="input-base"
              />
            </label>
          </div>
          <div className="flex gap-4 mb-3">
            <label className="flex flex-col w-full gap-2">
              Зміст резюме
              <JoditEditor
                value={content}
                onChange={(value) => setCustomValue("content", value)}
              />
            </label>
          </div>
          <div className="flex gap-4 mb-3">
            <label className="flex flex-col w-full">
              Навички (необовязково)
              <input
                {...register("skills")}
                placeholder="Розділіть комами список відповідних навичок"
                type="text"
                className="input-base"
              />
            </label>
          </div>

          {/* multi================================================== */}
          <div className="flex gap-4 mb-3">
            <div className="flex flex-col w-full">
              URL(и) (необов'язково)
              {urlsFields.map(({ id, name, url }, index) => (
                <div className="relative border-4 p-2 pt-7" key={id}>
                  <input
                    {...register(`urls[${index}].name`)}
                    placeholder="Name"
                    defaultValue={name}
                    type="text"
                    className="input-base"
                  />
                  <input
                    {...register(`urls[${index}].url`)}
                    placeholder="Url"
                    defaultValue={url}
                    type="url"
                    className="input-base"
                  />
                  <button
                    className="absolute top-0 right-0 w-[30px] h-[30px]"
                    type="button"
                    onClick={() => urlsRemove(index)}>
                    <AiFillCloseSquare className="fill-red-500" size={30} />
                  </button>
                </div>
              ))}
              <button
                className="bg-gray-500 mt-3 text-white py-2 px-2 rounded-md hover:bg-yellow-600 transition"
                type="button"
                onClick={() => urlsAppend({})}>
                Додати URL
              </button>
            </div>
            <div className="flex flex-col w-full">
              <div className="flex flex-col w-full">
                Досвід (необов'язково)
                {experienceFields.map(
                  ({ id, employer, jobtitle, startend, notes }, index) => (
                    <div className="relative border-4 p-2 pt-7" key={id}>
                      <input
                        {...register(`experience[${index}].employer`)}
                        placeholder="employer"
                        defaultValue={employer}
                        type="text"
                        className="input-base"
                      />
                      <input
                        {...register(`experience[${index}].jobtitle`)}
                        placeholder="jobtitle"
                        defaultValue={jobtitle}
                        type="text"
                        className="input-base"
                      />
                      <input
                        {...register(`experience[${index}].startend`)}
                        placeholder="startend"
                        defaultValue={startend}
                        type="text"
                        className="input-base"
                      />
                      <input
                        {...register(`experience[${index}].notes`)}
                        placeholder="notes"
                        defaultValue={notes}
                        type="text"
                        className="input-base"
                      />
                      <button
                        className="absolute top-0 right-0 w-[30px] h-[30px]"
                        type="button"
                        onClick={() => experienceRemove(index)}>
                        <AiFillCloseSquare className="fill-red-500" size={30} />
                      </button>
                    </div>
                  )
                )}
                <button
                  className="bg-gray-500 mt-3 text-white py-2 px-2 rounded-md hover:bg-yellow-600 transition"
                  type="button"
                  onClick={() => experienceAppend({})}>
                  Додати досвід
                </button>
              </div>
            </div>
          </div>

          {/* multi================================================== */}

          {/* multi================================================== */}
          <div className="flex gap-4 mb-3">
            <div className="flex flex-col w-full">
              Освіта (за бажанням)
              {educationFields.map(
                (
                  { id, schoolname, qualification, startDate, endDate, notes },
                  index
                ) => (
                  <div className="relative border-4 p-2 pt-7" key={id}>
                    <input
                      {...register(`education[${index}].schoolname`)}
                      placeholder="Назва школи"
                      defaultValue={schoolname}
                      type="text"
                      className="input-base"
                    />
                    <input
                      {...register(`education[${index}].qualification`)}
                      placeholder="Кваліфікація(ї)"
                      defaultValue={qualification}
                      type="text"
                      className="input-base"
                    />
                    <input
                      {...register(`education[${index}].startDate`)}
                      placeholder="Дата початку навчання"
                      defaultValue={startDate}
                      type="date"
                      className="input-base"
                    />
                    <input
                      {...register(`education[${index}].endDate`)}
                      placeholder="Дата закінчення навчання"
                      defaultValue={endDate}
                      type="date"
                      className="input-base"
                    />
                    <input
                      {...register(`education[${index}].notes`)}
                      placeholder="Примітки (не обовязково)"
                      defaultValue={notes}
                      type="text"
                      className="input-base"
                    />
                    <button
                      className="absolute top-0 right-0 w-[30px] h-[30px]"
                      type="button"
                      onClick={() => educationRemove(index)}>
                      <AiFillCloseSquare className="fill-red-500" size={30} />
                    </button>
                  </div>
                )
              )}
              <button
                className="bg-gray-500 mt-3 text-white py-2 px-2 rounded-md hover:bg-yellow-600 transition"
                type="button"
                onClick={() => educationAppend({})}>
                Додати освіту
              </button>
            </div>
            <div className="flex flex-col w-full">
              <label className="flex flex-col w-full">
                Резюме
                <input type="file" onChange={() => {}} />
                <button
                  className="bg-green-600 rounded-lg text-white p-1 mt-1"
                  onClick={() => {}}>
                  Завантажити
                </button>
              </label>
            </div>
          </div>

          {/* multi================================================== */}

          <button
            type="submit"
            className="bg-green-600 text-white py-4 px-4 rounded-md hover:bg-green-800 transition">
            Створити резюме
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddResume;
