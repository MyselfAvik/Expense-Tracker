import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { loginSchema } from "./Schema";
import { Link, useNavigate } from "react-router-dom";
import CustomInputText from "./CustomInputText";
import { useApp } from "../context/Context";

const LoginForm = () => {
  const { login } = useApp();
  const navigate = useNavigate();
  return (
    <div className="py-4 flex flex-col justify-evenly flex-1 px-4 sm:px-8 md:px-10 lg:px-12 text-xl">
      <h2 className="text-center text-4xl mb-3 text-violet-700 font-semibold ">
        Login Now
      </h2>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={async (values, actions) => {
          const data = await login(values, actions);
          if (data.status === 200) {
            navigate("/");
          }
        }}
      >
        {(props) => (
          <Form className="flex flex-col gap-4">
            <CustomInputText
              type="text"
              label="Email Address"
              placeholder="Enter Email Address"
              name="email"
              id="email"
            />
            <CustomInputText
              autoComplete="false"
              label="Password"
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
            />

            <button
              className="w-full bg-violet-900 text-white mt-4 p-2 rounded-lg hover:brightness-140 transition duration-200 cursor-pointer "
              type="submit"
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
      <div className=" text-center text-xl">
        <p>
          Don't Have Account ? <Link className="hover:text-violet-700 underline" to="/register">
           
            Signup now
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
