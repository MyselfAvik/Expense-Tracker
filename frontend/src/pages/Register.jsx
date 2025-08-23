import React from "react";
import Navbar from "../components/Navbar";
import RegisterForm from "../components/RegisterForm";

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center ">
      <Navbar />
      <div className="w-full flex-1 flex justify-center items-center max-w-6xl p-4 ">
        <div className="w-full max-w-6xl  grid grid-cols-1 md:grid-cols-2 min-h-[70vh] border border-gray-200 rounded-2xl overflow-hidden shadow-2xl">
          <img
            className="hidden md:block w-full h-full p-6"
            src="https://www.moneypatrol.com/moneytalk/wp-content/uploads/2023/06/budget185.png"
            alt=""
          />
          <div className="px-12 py-5 flex justify-center">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
