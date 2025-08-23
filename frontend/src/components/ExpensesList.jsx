import React, { useState } from "react";
import ExpenseTable from "./ExpenseTable";

const ExpensesList = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  return (
    <>
      <div className="flex justify-center ">
        <div className="w-full max-w-6xl min-h-120 px-2  p-4 md:py-2">
          <div className="flex min-h-10 justify-between items-center">
            <p className="text-2xl text-[#7d69ab] font-medium">
              Expense History
            </p>

            <select
              className="w-36 border-[#7d69ab] bg-white border py-2 px-3 rounded-lg"
              name=""
              id=""
              onChange={(e) => {
                setFilter(e.target.value);
              }}
            >
              <option value="All">All Category</option>
              <option value="Food">Food</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Rent">Rent</option>
              <option value="Utilities">Utilities</option>
              <option value="Insurance">Insurance</option>
              <option value="Miscellaneous">Miscellaneous</option>
              <option value="Travel">Travel</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="w-full">
            <input
              type="text"
              placeholder="Search Your Expense"
              className="bg-white  my-3 py-2 px-3 w-2/3 md:w-1/2 rounded-2xl border border-violet-600 focus:outline-0 "
              name="search"
              id="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
          <ExpenseTable filter={filter} search={search.trim()} />
        </div>
      </div>
    </>
  );
};

export default ExpensesList;
