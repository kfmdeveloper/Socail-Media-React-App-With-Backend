import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignUp from "./pages/AuthPage/SignUp/SignUp";
import LoginPage from "./pages/AuthPage/Login/Login";
import { useSelector } from "react-redux";

const Body = () => {
  const AppRouter = createBrowserRouter([
    {
      path: "/",
      element: <SignUp />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/profile",
      element: <ProfilePage />,
    },
    {
      path: "/signUp",
      element: <SignUp />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={AppRouter}></RouterProvider>
    </div>
  );
};

export default Body;
