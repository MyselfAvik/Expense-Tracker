import * as Yup from "yup";

export const expenseSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  price: Yup.number()
    .typeError("Price Must be Number")
    .positive("Amount must be greater than 0")
    .required("Amount is required"),
  date: Yup.string().nullable(),
  category: Yup.string().required("Category is required"),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter Valid Email Address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const registerSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Name is Required")
    .min(4, "Name is Too Short")
    .max(30, "Name is Too Big")
    .matches(/^[a-zA-Z]+(?:\s[a-zA-Z]+){1,2}$/, "Invaild Name Format"),
  email: Yup.string()
    .email("Enter Vaild Email Address")
    .required("Email is Required"),
  password: Yup.string()
    .required("Password is Required")
    .min(8, "Minimum Length should be 8"),
  gender: Yup.string().required("Gender is Required"),
  age: Yup.number()
    .typeError("Enter Only Numbers")
    .min(5, "Age Can not be less than 5")
    .max(100, "Age Can not be more than 100")
    .required("Age is Required"),
});
