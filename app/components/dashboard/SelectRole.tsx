"use client";

import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const SelectRole = () => {
  const role = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      role: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);

    axios
      .post("/api/changerole", data)
      .then(() => {
        toast.success("Role CHANGED");
      })
      .catch(() => {
        toast.error("Something went wrong!");
      })
      .finally(() => {});
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("role")} placeholder="role" type="text" />
      <input type="submit" />
    </form>
  );
};

export default SelectRole;
