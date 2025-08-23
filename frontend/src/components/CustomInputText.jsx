import { useField } from "formik";

const CustomInputText = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div className=" flex-col  flex gap-2 w-full mx-auto relative">
        <label className="text-lg" htmlFor={props.name}>
          {label}
        </label>
        <input
          className={
            meta.touched && meta.error
              ? "p-2 focus:outline-red-600 border  text-red-700 rounded-lg"
              : "p-2  focus:placeholder:text-black rounded-lg  border-b outline-violet-400 border-violet-400 placeholder:text-violet-400 shadow-xs shadow-violet-500"
          }
          {...field}
          {...props}
        />
        {meta.touched && !meta.error && (
          <i className="absolute right-2 top-[60%] text-green-600 fa-solid fa-circle-check"></i>
        )}
        {meta.touched && meta.error && (
          <span className="text-sm text-red-500">{meta.error}</span>
        )}
      </div>
    </>
  );
};

export default CustomInputText;
