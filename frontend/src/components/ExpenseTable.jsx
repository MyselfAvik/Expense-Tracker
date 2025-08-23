import React from "react";
import { useApp } from "../context/Context";

const ExpenseTable = ({ filter, search }) => {
  const { expense, deleteExpense } = useApp();

  const sortedExpenses = [...expense].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const searchedExpense = sortedExpenses.filter(
    (val) =>
      val.price.toString().toLowerCase().includes(search.toLowerCase()) ||
      val.title.toLowerCase().includes(search.toLowerCase())
  );
  const filteredExpenses = searchedExpense.filter(
    (val) => val.category === filter
  );
  return (
    <>
      <div className=" mt-4 rounded-b-2xl overflow-hidden border shadow-lg border-gray-300">
        <div className="grid grid-cols-5  px-4 text-sm font-medium text-gray-500 py-4">
          <p className="break-words ">DATE</p>
          <p className="text-center break-words">TITLE</p>
          <p className="text-center break-words">CATEGORY</p>
          <p className="text-center break-words">PRICE</p>
          <p className="text-end break-words">ACTION</p>
        </div>
        {(filter === "All" ? searchedExpense : filteredExpenses).length ===
          0 && (
          <>
            <div className="w-full bg-white h-10 text-red-800 text-xl flex items-center justify-center">
              No Data Available
            </div>
          </>
        )}
        {(filter === "All" ? searchedExpense : filteredExpenses).map((item) => {
          return (
            <div
              key={item._id}
              className="grid grid-cols-5  p-4 font-medium bg-white border-t border-gray-400 text-md "
            >
              <p className="break-words px-1">
                {new Date(item.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
              <p className="text-center break-words px-1">{item.title}</p>
              <p className="text-center break-words px-1">{item.category}</p>
              <p className="text-center break-words px-1">{item.price}</p>
              <p className="">
                <button
                  onClick={() => {
                    deleteExpense(item._id);
                  }}
                  className="float-right cursor-pointer"
                >
                  <img
                    className="w-6 h-6 "
                    src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png"
                    alt=""
                  />
                </button>
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ExpenseTable;
