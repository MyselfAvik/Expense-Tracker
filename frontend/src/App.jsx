import Home from "./pages/Home";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useApp } from "./context/Context";

import { Toaster } from "react-hot-toast";
function App() {
  const { isLoggedIn, loading } = useApp();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
        ></Route>
        <Route
          path="register"
          element={!isLoggedIn ? <Register /> : <Navigate to="/" replace />}
        ></Route>
        <Route
          path="login"
          element={!isLoggedIn ? <Login /> : <Navigate to="/" replace />}
        ></Route>
      </>
    )
  );
  return (
    <>
      <Toaster />
      {loading ? (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-500 text-white">
          <div className="w-16 h-16 border-4 border-gray-600 border-t-indigo-500 rounded-full animate-spin mb-6"></div>

          <h1 className="text-3xl md:text-4xl font-semibold tracking-wide animate-pulse">
            Loading<span className="animate-bounce"> . . .</span>
          </h1>
        </div>
      ) : (
        <RouterProvider router={router} />
      )}
    </>
  );
}

export default App;
