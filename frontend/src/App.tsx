import React, {useMemo} from 'react';
import './App.css';
import {Route, Routes, useSearchParams} from "react-router-dom";
import NoAuth from "./Auth/NoAuth";
import Auth from "./Auth/Auth";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import BookDetailPage from "./pages/BookDetailPage";
import SearchBooks from "./pages/SearchBooks";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import BooksPage from "./pages/BooksPage";
import ProfilePage from "./pages/ProfilPage";
import UserDetail from "./pages/UserDetailsPage";
import FriendsPage from "./pages/FriendsPage";
import BookClubsPage from "./pages/BookClubsPage";
import BookClubDetailPage from "./pages/BookClubDetailPage";
import FriendDetailPage from "./pages/FriendDetailPage";
import AdminPage from "./pages/AdminPage";

function App() {
    const [searchParams] = useSearchParams();
      const redirect = useMemo(
          () => searchParams.get("redirect") || "/",
          [searchParams]
      );

    return (
        <>
        <ToastContainer/>
          <Routes>
            <Route path="/signup" element={
              <NoAuth redirect={redirect}>
                <SignUpPage/>
              </NoAuth>
            }/>
            <Route path="/login" element={
              <NoAuth redirect={redirect}>
                <LoginPage/>
              </NoAuth>
            }/>
            <Route path="/" element={
              <Auth roles={["USER", "ADMIN"]}>
                <HomePage />
              </Auth>
            }/>
            <Route path="/mybooks" element={
              <Auth roles={["USER", "ADMIN"]}>
                  <BooksPage />
              </Auth>
            }/>
              <Route path="/detail/:id" element={
                  <Auth roles={["USER", "ADMIN"]}>
                      <BookDetailPage />
                  </Auth>
              }/>
              <Route path="/search" element={
                  <Auth roles={["USER", "ADMIN"]}>
                      <SearchBooks />
                  </Auth>
              }/>
              <Route path="/profile" element={
                  <Auth roles={["USER", "ADMIN"]}>
                      <ProfilePage />
                  </Auth>
              }/>
              <Route path="/friends" element={
                  <Auth roles={["USER", "ADMIN"]}>
                      <FriendsPage />
                  </Auth>
              }/>
              <Route path="/friends/:id" element={
                  <Auth roles={["USER", "ADMIN"]}>
                      <FriendDetailPage />
                  </Auth>
              }/>
              <Route path="/user/:id" element={
                  <Auth roles={["USER", "ADMIN"]}>
                      <UserDetail />
                  </Auth>
              }/>
              <Route path="/bookclubs" element={
                  <Auth roles={["USER", "ADMIN"]}>
                      <BookClubsPage />
                  </Auth>
              }/>
              <Route path="/bookclubs/:id" element={
                  <Auth roles={["USER", "ADMIN"]}>
                      <BookClubDetailPage />
                  </Auth>
              }/>
              <Route path="/admin" element={
                    <Auth roles={["ADMIN"]}>
                        <AdminPage />
                    </Auth>
                }/>
          </Routes>
        </>
  );
}

export default App;
