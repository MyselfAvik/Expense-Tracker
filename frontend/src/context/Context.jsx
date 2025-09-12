import { createContext, useContext, useEffect, useState } from "react";
import { mkConfig, generateCsv, download } from "export-to-csv";
import axios from "axios";
import toast from "react-hot-toast";
const csvConfig = mkConfig({ useKeysAsHeaders: true });
const AppContext = createContext();
const api = axios.create({
  baseURL: "https://expense-tracker-x2d5.onrender.com/user",
  withCredentials: true,
});
const refreshToken = async () => {
  try {
    const { data } = await api.post("/refresh");
    return data;
  } catch (err) {
    console.error("Refresh failed:", err);
    return false;
  }
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const success = await refreshToken();
      if (success) {
        return api(originalRequest);
      } else {
        console.error("Session expired, redirecting to login");
      }
    }

    return Promise.reject(error);
  }
);

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [expense, setExpense] = useState([]);
  const [categoryTotals, setCategoryTotals] = useState({});
  const [monthTotals, setMonthTotals] = useState({});
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await api.get("/check/auth");
        setUser(data.user);
        setExpense(data.user.expenses);
      } catch (error) {
        console.log(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [refresh]);

  const login = async (values, actions) => {
    try {
      const response = await api.post("/login", values);
      toast.success("User Logged In successfully");
      setRefresh(!refresh);

      actions.resetForm();
      return response;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      return error;
    }
  };
  const logout = async () => {
    try {
      const response = await api.post("/logout");
      toast.success("User Logged Out successfully");
      setRefresh(!refresh);

      return response;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      return error;
    }
  };
  const register = async (data, actions) => {
    try {
      const formData = new FormData();

      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("age", data.age);
      formData.append("gender", data.gender);

      if (data.profileImage) {
        formData.append("profileImage", data.profileImage);
      }
      const response = await api.post("/signup", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Successfully User Created");
      actions.resetForm();

      return response;
    } catch (error) {
      console.log(error);

      toast.error(error.response.data.message);
      toast.error("Cant Register");
      return error;
    } finally {
      actions.setSubmitting(false);
    }
  };
  const sendExpense = async (values, actions) => {
    try {
      const response = await api.post("/post/expense", values);
      toast.success("Expense Added Successfully");
      setRefresh(!refresh);
      actions.resetForm();
      return response;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      return error;
    } finally {
      actions.setSubmitting(false);
    }
  };
  const deleteExpense = async (id) => {
    try {
      const response = await api.post(`/delete/expense/${id}`);
      toast.success(response.data.message);
      setRefresh(!refresh);
      return response;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const totals = expense.reduce((acc, item) => {
      const cat = item.category;
      const amount = Number(item.price);

      if (!acc[cat]) {
        acc[cat] = 0;
      }

      acc[cat] += amount;
      return acc;
    }, {});

    setCategoryTotals(totals);

    const currentYear = new Date().getFullYear();

    const initialTotals = Array.from({ length: 12 }).reduce((acc, _, i) => {
      const monthKey = new Date(currentYear, i).toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      });
      acc[monthKey] = 0;
      return acc;
    }, {});
    const totalsByMonth = expense.reduce((acc, item) => {
      const date = new Date(item.date);
      const monthKey = date.toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      });

      const amount = Number(item.price);
      if (!acc[monthKey]) {
        acc[monthKey] = 0;
      }
      acc[monthKey] += amount;
      return acc;
    }, initialTotals);

    setMonthTotals(totalsByMonth);
  }, [expense]);

  const downloadCsv = () => {
    const csv = generateCsv(csvConfig)(expense);
    download(csvConfig)(csv);
  };
  return (
    <AppContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        register,
        deleteExpense,
        sendExpense,
        setRefresh,
        categoryTotals,
        expense,
        monthTotals,
        downloadCsv,
        isLoggedIn: !!user,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
