import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "./redux/store";
import { Navigate, Route, Routes } from "react-router-dom";
import Authentication from "./components/authentication";

import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { authenticate } from "./redux/auth/authSlice";
import Layout from "./components/layout";
import Home from "./components/home";
import Search from "./components/search";
import Notifications from "./components/notification";
import Profile from "./components/profile";

const VERIFY_USER = gql`
  query VerifyUser {
    verifyUser {
      id
      name
      email
    }
  }
`;

export default function App() {
  const { data, loading } = useQuery(VERIFY_USER);

  const isAuthenticated = useSelector(
    (state: RootStateType) => state.authReducer.isAuthenticated
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loading && data) {
      dispatch(
        authenticate({
          user: data.verifyUser,
          token: localStorage.getItem("token") ?? "",
        })
      );
    }
  }, [loading, data, dispatch]);

  return (
    <div>
      {isAuthenticated ? (
        <Layout>
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/profile" Component={Profile} />
            <Route path="/search" Component={Search} />
            <Route path="/notifications" Component={Notifications} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route path="/login" Component={Authentication} />
          <Route path="/sign-up" Component={Authentication} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </div>
  );
}
