import { useEffect, useState } from "react";
import FormField from "../components/FormField";
import { useApp } from "../context/Context";
import Charts from "./Charts";
const HomeContent = () => {
  const { user, expense, categoryTotals, downloadCsv } = useApp();
  const [totalPrice, setTotalPrice] = useState(0);

  const maxValue = Math.max(...Object.values(categoryTotals));
  const maxCategoryName = Object.keys(categoryTotals).find(
    (key) => categoryTotals[key] === maxValue
  );
  useEffect(() => {
    setTotalPrice(
      expense.reduce((a, item) => {
        return a + item.price;
      }, 0)
    );
  }, [expense]);
  return (
    <div className=" w-full max-w-6xl px-2  mx-auto flex flex-col gap-4 py-2">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 md:gap-8 bg-white shadow-lg rounded-2xl p-4 md:p-8 w-full">
        <img
          className="h-28 w-28 rounded-full object-cover ring-4 ring-gray-100 shadow-lg"
          src={user.profileImage}
          alt="Profile"
        />
        <input type="file" />

        <div className="flex flex-col gap-1 text-center sm:text-left">
          <h1 className="text-4xl font-semibold tracking-wide text-gray-900">
            {user.fullName.toUpperCase()}
          </h1>
          <p className="text-gray-600 text-md">
            GENDER:{" "}
            {user.gender === "M"
              ? "MALE"
              : user.gender === "F"
              ? "FEMALE"
              : "OTHERS"}
          </p>
          <p className="text-gray-600 text-md">AGE: {user.age}</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={downloadCsv}
            className="flex items-center text-xl cursor-pointer"
          >
            <img
              className="w-12 h-12"
              src="https://cdn-icons-png.flaticon.com/512/8242/8242984.png"
              alt=""
            />
            Export to Csv
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 min-h-20  gap-4">
        <div className="bg-white flex items-center px-8 gap-6 shadow-lg">
          <img
            className="w-16 h-16 rounded-[50%]"
            src="data:image/jpeg;base64,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"
            alt=""
          />
          <div>
            <p className="text-sm text-gray-500">Total Expense</p>
            <p className="text-2xl font-semibold"> ₹ {totalPrice}</p>
          </div>
        </div>
        <div className="bg-white flex items-center px-8 gap-6 shadow-lg">
          <img
            className="w-16 h-16 rounded-[50%] object-contain"
            src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR0NEPdc_HlbWefaPmipwJMJQtp7c1EJ0eFa_vi90UAQaIarKHw"
            alt=""
          />
          <div>
            <p className="text-sm text-gray-500">Highest Category</p>
            <p className="text-2xl font-semibold">
              {maxCategoryName || "Nothing"}
            </p>
          </div>
        </div>
        <div className="bg-white flex items-center px-8 gap-6 shadow-lg">
          <img
            className="w-16 h-16 rounded-[50%] p-1"
            src="data:image/jpeg;base64,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"
            alt=""
          />
          <div>
            <p className="text-sm text-gray-500">Total Entries</p>
            <p className="text-2xl font-semibold">{expense.length}</p>
          </div>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2    min-h-140  md:min-h-0  bg-white shadow-lg">
            <Charts />
          </div>

          <div className="px-5 bg-white shadow-lg">
            <FormField />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
