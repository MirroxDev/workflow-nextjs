"use client";

import { FcGoogle } from "react-icons/fc";

import axios from "axios";
import router, { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

import useLoginModal from "@/app/hooks/useLoginModal";
import { useCallback } from "react";
import Modal from "./Modal";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const toggleLogin = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal]);
  console.log("loginModalStorage: " + loginModal.isOpen);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      if (callback?.ok) {
        toast.success("Ви увійшли до системи!");
        router.refresh();
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const bodyContent = (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div id="email">
          <input
            className={`        
                w-full 
                p-4 
                bg-white 
                outline-none 
                rounded-md 
                border-2 
                ${errors?.email ? "border-rose-800" : ""}
                ${errors?.email ? "text-rose-800" : ""}
          `}
            {...register("email", {
              required: "Обязательно к заполнеию!",
            })}
            placeholder="Email"
          />

          {errors?.email?.message?.toString()}
        </div>
        <div id="password">
          <input
            className={`        
            w-full 
            p-4 
            bg-white 
            outline-none 
            rounded-md 
            border-2 
            ${errors?.email ? "border-rose-800" : ""}
            ${errors?.email ? "text-rose-800" : ""}
      `}
            {...register("password", {
              required: "Поле обязательно к заполнеию!",
            })}
            placeholder="Password"
          />
          {errors?.password?.message?.toString()}
        </div>

        <button
          className="py-3 px-4 bg-green-600 text-white rounded-md hover:opacity-80 transition"
          type="submit"
        >
          Увійти
        </button>
      </form>

      <hr />

      <div className="flex flex-col gap-2 pt-4">
        <div
          onClick={() => signIn("google")}
          className="border-2 cursor-pointer border-gray-400 hover:border-green-600 transition p-3 text-center rounded-md flex flex-row items-center justify-center gap-2"
        >
          <FcGoogle size={25} />
          Увійти через Google
        </div>
      </div>
    </>
  );

  return (
    <Modal
      onSubmit={() => {}}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      title="Вхід"
      body={bodyContent}
    />
  );
};

export default LoginModal;
