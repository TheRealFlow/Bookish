import React, {useMemo} from 'react';
import './App.css';
import {Route, Routes, useSearchParams} from "react-router-dom";
import NoAuth from "./Auth/NoAuth";
import Auth from "./Auth/Auth";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function App() {
  const [searchParams] = useSearchParams();
  const redirect = useMemo(
      () => searchParams.get("redirect") || "/",
      [searchParams]
  );

  return (
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
          <Auth roles={["BASIC", "ADMIN"]}>
            <HomePage/>
          </Auth>
        }/>
      </Routes>
  );
}

export default App;
