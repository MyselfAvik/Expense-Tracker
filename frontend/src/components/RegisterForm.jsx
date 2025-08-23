import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import CustomInputText from "./CustomInputText";
import CustomSelect from "./CustomSelect";
import { registerSchema } from "./Schema";
import { useApp } from "../context/Context";
const RegisterForm = () => {
  const { register } = useApp();
  const navigate = useNavigate();
  return (
    <div className="w-full max-w-xl rounded-2xl  ">
      <h1 className="text-center mb-2 text-3xl text-violet-700 font-semibold">
        Register Now
      </h1>
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          age: "",
          gender: "",
          password: "",
          profileImage: "",
        }}
        onSubmit={async (values, actions) => {
          try {
            const response = await register(values, actions);
            console.log(response);
            if (response.status === 201) {
              navigate("/login");
            }
          } catch (error) {
            console.log(error);
          }
        }}
        validationSchema={registerSchema}
      >
        {(props) => {
          return (
            <Form>
              <CustomInputText
                label="Full Name"
                type="text"
                name="fullName"
                id="fullName"
                placeholder="Enter Your Name"
              />
              <CustomInputText
                label="Email Address"
                type="text"
                name="email"
                id="email"
                placeholder="Enter your Email Address"
              />

              <CustomInputText
                label="Password"
                type="password"
                name="password"
                id="password"
                autoComplete="false"
                placeholder="Enter your Password"
              />
              <CustomInputText
                label="Age"
                type="text"
                name="age"
                id="age"
                placeholder="Enter your Age"
                maxLength="3"
              />
              <CustomSelect
                label="Select Gender"
                name="gender"
                id="gender"
                options={[
                  {
                    id: 0,
                    name: "Select Gender",
                    value: "",
                    hidden: true,
                    disabled: true,
                  },
                  {
                    id: 1,
                    name: "Male",
                    value: "M",
                  },
                  {
                    id: 2,
                    name: "Female",
                    value: "F",
                  },
                  {
                    id: 3,
                    name: "Others",
                    value: "O",
                  },
                ]}
              />
              <div className=" my-3 ">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 ">
                  <div className="flex flex-col gap-2 ">
                    <label htmlFor="profileImage" className="text-lg ">
                      Profile Photo
                    </label>
                    <label
                      htmlFor="profileImage"
                      className="cursor-pointer mx-auto bg-violet-500 text-white py-2 px-4 rounded-xl text-center"
                    >
                      Choose Photo
                    </label>
                    <input
                      type="file"
                      id="profileImage"
                      name="profileImage"
                      className="hidden"
                      accept=".jpg,.jpeg,.png"
                      onChange={(event) => {
                        props.setFieldValue(
                          "profileImage",
                          event.currentTarget.files[0]
                        );
                      }}
                    />
                  </div>
                  {props.values.profileImage && (
                    <div className="col-span-2 flex flex-col gap-2 justify-center">
                      <img
                        src={URL.createObjectURL(props.values.profileImage)}
                        alt=""
                        className="mx-auto mt-2 w-32 h-32 object-cover rounded-full border text-center border-gray-300"
                      />
                      <button
                        className="w-1/2 mx-auto cursor-pointer bg-violet-800 text-white py-2 px-4 rounded-xl text-center"
                        onClick={(event) => {
                          props.setFieldValue("profileImage", "");
                        }}
                      >
                        remove
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="disabled:cursor-no-drop p-2 w-full bg-violet-900 text-white my-4 px-6 rounded-lg hover:brightness-140 transition duration-200 cursor-pointer "
                  disabled={props.isSubmitting}
                >
                  {props.isSubmitting ? (
                    <div>
                      <svg
                        aria-hidden="true"
                        role="status"
                        class="inline w-4 h-4 me-3 text-white animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="#E5E7EB"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentColor"
                        />
                      </svg>
                      Saving...
                    </div>
                  ) : (
                    "Register"
                  )}
                </button>
                <p className="text-xl">
                  Already Registed ?{" "}
                  <Link className="hover:text-violet-500 underline" to="/login">
                    Login Now
                  </Link>
                </p>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default RegisterForm;
