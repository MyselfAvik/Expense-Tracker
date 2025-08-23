import React, { useState } from "react";
import PieChartComponent from "./PieChartComponent";
import BarChartComponent from "./BarChartComponent";

const Charts = () => {
  const [pie, setPie] = useState(true);
  return (
    <div className="flex h-full flex-col gap-4 p-2 sm:p-5">
      <h2 className="text-2xl font-semibold text-violet-700 ">
        Expense Analytics
      </h2>
      <div className=" mx-auto flex gap-2">
        <button
          onClick={() => {
            if (pie) return;

            setPie(true);
          }}
          className={
            pie
              ? "bg-violet-800 py-2 px-4 transition-colors cursor-pointer  duration-300 text-white rounded-md"
              : "bg-gray-300 hover:brightness-90 py-2 px-4 transition-colors cursor-pointer duration-300 text-black rounded-md"
          }
        >
          Pie Chart
        </button>
        <button
          className={
            pie
              ? "bg-gray-300 hover:brightness-90 py-2 px-4 transition-colors cursor-pointer   duration-300 text-black rounded-md"
              : "bg-violet-800 py-2 px-4 transition-colors cursor-pointer duration-300 text-white rounded-md"
          }
          onClick={() => {
            if (!pie) return;
            setPie(false);
          }}
        >
          Bar Chart
        </button>
      </div>
      <div className=" flex h-full">
        {pie ? <PieChartComponent /> : <BarChartComponent />}
      </div>
    </div>
  );
};

export default Charts;
