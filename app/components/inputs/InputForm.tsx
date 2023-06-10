"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputFormProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  placeholder: string;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const InputForm: React.FC<InputFormProps> = ({
  id,
  label,
  type = "text",
  disabled,
  required,
  maxLength = 30,
  minLength = 1,
  placeholder,
  register,
  errors,
}) => {
  return (
    <label className="flex flex-col w-full">
      {label}
      <input
        {...register(id, {
          required: required,
          maxLength: maxLength,
          minLength: minLength,
        })}
        placeholder={placeholder}
        disabled={disabled}
        type={type}
        className={`
      input-base
      border
      bg-white 
      outline-none 
      ${errors[id] ? " border-red-500" : " border-gray-500"}
      ${errors[id] ? "focus:border-red-500" : "focus:border-gray-500"}
      `}
      />
    </label>
  );
};

export default InputForm;
