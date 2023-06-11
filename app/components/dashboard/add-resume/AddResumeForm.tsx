"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import Select, {
  DropdownIndicatorProps,
  GroupBase,
  OptionsOrGroups,
} from "react-select";
import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
  Controller,
} from "react-hook-form";
import toast from "react-hot-toast";
import { AiFillCloseSquare } from "react-icons/ai";
import InputForm from "@/app/components/inputs/InputForm";
import JoditEditor from "@/app/components/JoditEditor";
import { useCallback, useEffect, useMemo } from "react";

let regions = [
  { value: "Київ", label: "Київ" },
  { value: "Суми", label: "Суми" },
  { value: "Полтава", label: "Полтава" },
];

let categoriest = [
  { value: "Дизайн", label: "Дизайн" },
  { value: "Веб-розробка", label: "Веб-розробка" },
  { value: "Малювання", label: "Малювання" },
  { value: "Малювання2", label: "Малювання2" },
];

interface AddResumeProps {
  categories?: OptionsOrGroups<any, GroupBase<any>> | undefined;
}

const AddResumeForm: React.FC<AddResumeProps> = ({ categories }) => {
  const router = useRouter();

  const categoriesSelect = useMemo(() => {
    const categoriesArray: any = [];
    categories?.forEach((item) => {
      let newItem = {
        label: item.title,
        value: item.title,
        slug: item.slug,
        id: item.id,
      };
      categoriesArray.push(newItem);
    });

    return categoriesArray;
  }, [categories]);

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
      rank: "",
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
    keyName: "id",
  });

  const {
    fields: educationFields,
    remove: educationRemove,
    append: educationAppend,
  } = useFieldArray({
    control,
    name: "education",
    keyName: "id",
  });

  const {
    fields: experienceFields,
    remove: experienceRemove,
    append: experienceAppend,
  } = useFieldArray({
    control,
    name: "experience",
    keyName: "id",
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

    axios
      .post("/api/resumes", data)
      .then(() => {
        toast.success("Резюме створено!");
        router.refresh();
      })
      .catch(() => {
        toast.error("Сталяся помилка!");
      })
      .finally(() => {});
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
            <InputForm
              id="yourEmail"
              label="Ваш Email"
              placeholder="Ваш Email"
              type="email"
              maxLength={30}
              required
              register={register}
              errors={errors}
            />
          </div>

          <div className="flex gap-4 mb-3">
            <label className="flex flex-col w-full">
              Оберіть регіон
              <Controller
                control={control}
                name="region"
                rules={{ required: "Оберіть регіон" }} // Правило проверки на обязательное поле
                render={({ field }) => (
                  <Select
                    {...field}
                    options={regions}
                    placeholder="Оберіть регіон"
                    onChange={(value) => field.onChange(value)}
                    onBlur={field.onBlur}
                    classNames={{
                      control: () =>
                        `rounded-lg mt-2 p-1 bg-gray-50 ${
                          errors.region ? "!border-red-500" : "!border-gray-500"
                        }`,
                    }}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 6,
                      colors: {
                        ...theme.colors,
                        primary: "green",
                        // primary25: "#ffe4e6",
                      },
                    })}
                  />
                )}
              />
            </label>

            <InputForm
              id="rank"
              label="Професійне звання"
              placeholder="Професійне звання"
              type="text"
              maxLength={30}
              required
              register={register}
              errors={errors}
            />
          </div>
          <div className="flex gap-4 mb-3">
            <InputForm
              id="location"
              label="Місцезнаходження"
              placeholder="Ваше місцезнаходження"
              type="text"
              maxLength={30}
              required
              register={register}
              errors={errors}
            />
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
            <InputForm
              id="videoSrc"
              label="Відео (необовязково)"
              placeholder="Посилання на відео"
              type="url"
              maxLength={30}
              register={register}
              errors={errors}
            />
            <label className="flex flex-col w-full">
              Оберіть категорію
              <Controller
                control={control}
                name="category"
                rules={{ required: "Оберіть категорію" }} // Правило проверки на обязательное поле
                render={({ field }) => (
                  <Select
                    {...field}
                    options={categoriesSelect}
                    placeholder="Оберіть категорію"
                    onChange={(value) => field.onChange(value)}
                    onBlur={field.onBlur}
                    classNames={{
                      control: () =>
                        `rounded-lg mt-2 p-1 bg-gray-50 ${
                          errors.category
                            ? "!border-red-500"
                            : "!border-gray-500"
                        }`,
                    }}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 6,
                      colors: {
                        ...theme.colors,
                        primary: "green",
                        // primary25: "#ffe4e6",
                      },
                    })}
                  />
                )}
              />
            </label>
          </div>
          <div className="flex gap-4 mb-3">
            <InputForm
              id="minrate"
              label="Мінімальна норма/год (опціонально)"
              placeholder="наприклад 20"
              type="number"
              maxLength={30}
              register={register}
              errors={errors}
            />
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
            <InputForm
              id="skills"
              label="Навички (необовязково)"
              placeholder="Розділіть комами список відповідних навичок"
              type="text"
              maxLength={30}
              register={register}
              errors={errors}
            />
          </div>

          {/* multi================================================== */}
          <div className="flex gap-4 mb-3">
            <div className="flex flex-col w-full">
              URL(и) (необовязково)
              {urlsFields.map(({ id }, index) => (
                <div className="relative border-4 p-2 pt-7" key={id}>
                  <input
                    {...register(`urls.${index}.name` as const)}
                    placeholder="Назва ресурсу"
                    type="text"
                    className="input-base"
                  />
                  <input
                    {...register(`urls[${index}].url` as const)}
                    placeholder="Url"
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
                Досвід (необовязково)
                {experienceFields.map(({ id }, index) => (
                  <div className="relative border-4 p-2 pt-7" key={id}>
                    <input
                      {...register(`experience[${index}].employer`)}
                      placeholder="Роботодавець"
                      type="text"
                      className="input-base"
                    />
                    <input
                      {...register(`experience[${index}].jobtitle`)}
                      placeholder="Назва діяльності"
                      type="text"
                      className="input-base"
                    />
                    <input
                      {...register(`experience[${index}].startend`)}
                      placeholder="Початок роботи"
                      type="date"
                      className="input-base"
                    />
                    <input
                      {...register(`experience[${index}].end`)}
                      placeholder="Кінець роботи"
                      type="date"
                      className="input-base"
                    />
                    <input
                      {...register(`experience[${index}].notes`)}
                      placeholder="Примітки"
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
                ))}
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
              {educationFields.map(({ id }, index) => (
                <div className="relative border-4 p-2 pt-7" key={id}>
                  <input
                    {...register(`education[${index}].schoolname`)}
                    placeholder="Назва школи"
                    type="text"
                    className="input-base"
                  />
                  <input
                    {...register(`education[${index}].qualification`)}
                    placeholder="Кваліфікація(ї)"
                    type="text"
                    className="input-base"
                  />
                  <input
                    {...register(`education[${index}].startDate`)}
                    placeholder="Дата початку навчання"
                    type="date"
                    className="input-base"
                  />
                  <input
                    {...register(`education[${index}].endDate`)}
                    placeholder="Дата закінчення навчання"
                    type="date"
                    className="input-base"
                  />
                  <input
                    {...register(`education[${index}].notes`)}
                    placeholder="Примітки (не обовязково)"
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
              ))}
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

export default AddResumeForm;
