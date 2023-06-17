import Navbar from "./components/Navbar";
import React from "react";
import "./app.css";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchedBooks from "./components/SearchedBooks/SearchedBooks";
import CartPage from "./pages/addtocart/CartPage";
import { UserAuthContextProvider } from "./pages/UserAuthContextProvider";
import ProtectedRoute from "./pages/ProtectedRoute";
import Register from "./pages/Register";
import Page404 from "./pages/Page404";

const App = () => {
  const user = true;

  return (
    <BrowserRouter>
      <UserAuthContextProvider>
        <Routes>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                {" "}
                <Navbar user={user} />
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/searched/books"
            element={
              <ProtectedRoute>
                {" "}
                <Navbar user={user} />
                <SearchedBooks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/post/:id"
            element={
              <ProtectedRoute>
                {" "}
                <Navbar user={user} />
                <Post />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home/addtocart"
            element={
              <ProtectedRoute>
                {" "}
                <Navbar user={user} />
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <ProtectedRoute>
                {" "}
                <Page404 />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </UserAuthContextProvider>
    </BrowserRouter>
  );
};

export default App;
