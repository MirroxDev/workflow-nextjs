"use client";

import Select from "react-select";

export type SelectFormValue = {
  label: string;
  value: string;
  options: any;
};

interface SelectFormProps {
  label: string;
  value?: SelectFormValue;
  placeholder?: string;
  options: any;
  onChange: (value: SelectFormValue) => void;
}

const SelectForm: React.FC<SelectFormProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder,
}) => {
  return (
    <>
      <label className="flex flex-col w-full">
        {label}

        <Select
          placeholder={placeholder}
          isClearable
          options={options}
          value={value}
          onChange={(value) => onChange(value as SelectFormValue)}
          classNames={{
            control: () => "rounded-lg mt-2 p-1 bg-gray-50",
          }}
          theme={(theme) => ({
            ...theme,
            borderRadius: 6,
            colors: {
              ...theme.colors,
              primary: "black",
              primary25: "#ffe4e6",
            },
          })}
        />
      </label>
    </>
  );
};

export default SelectForm;
