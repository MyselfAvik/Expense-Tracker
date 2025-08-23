import React from "react";
import Navbar from "../components/Navbar";

import HomeContent from "../components/HomeContent";
import ExpensesList from "../components/ExpensesList";

const Home = () => {
  return (
    <div className="bg-gray-200 min-h-screen ">
      <Navbar />
      <HomeContent />
      <ExpensesList />
    </div>
  );
};

export default Home;
