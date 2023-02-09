import React, {useMemo} from 'react';
import './App.css';
import {Route, Routes, useSearchParams} from "react-router-dom";
import NoAuth from "./Auth/NoAuth";
import Auth from "./Auth/Auth";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import useBooks from "./hooks/useBooks";
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


function App() {
    const {books, getAllBooks, addNewBook, deleteBook, updateBook} = useBooks();
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
                  <BooksPage addNewBook={addNewBook} getAllBooks={getAllBooks} books={books}/>
              </Auth>
            }/>
              <Route path="/detail/:id" element={
                  <Auth roles={["USER", "ADMIN"]}>
                      <BookDetailPage deleteBook={deleteBook} updateBook={updateBook} />
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
          </Routes>
        </>
  );
}

export default App;
