import React from "react";
import { useField } from "formik";

const CustomSelect = ({ options = [], label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div className="flex flex-col gap-2 w-full mx-auto">
        <label className="text-lg" htmlFor={props.id}>
          {label}
        </label>
        <select
          className="bg-blue-100 p-2 rounded-lg outline-violet-400 border-violet-400 placeholder:text-violet-400 shadow-xs shadow-violet-500"
          {...field}
          {...props}
        >
          {options.map((option) => {
            return (
              <option
                key={option.id}
                value={option.value}
                hidden={option.hidden}
                disabled={option.disabled}
              >
                {option.name}
              </option>
            );
          })}
        </select>
        {meta.error && meta.touched && (
          <span className="text-sm text-red-500">{meta.error}</span>
        )}
      </div>
    </>
  );
};

export default CustomSelect;
