import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "./redux/store";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Authentication from "./components/authentication";

import { useQuery, gql } from "@apollo/client";
import { useEffect } from "react";
import { authenticate } from "./redux/auth/authSlice";
import Layout from "./components/layout";
import Home from "./components/home";
import Search from "./components/search";
import Notifications from "./components/notification";
import Profile from "./components/profile";

import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
// import { VERIFY_USER } from "./graphql";

if (import.meta.env.DEV) {
  loadDevMessages();
  loadErrorMessages();
}

const VERIFY_USER = gql`
  query VerifyUser {
    verifyUser {
      id
      name
      email
      userName
    }
  }
`;

export default function App() {
  const { data, loading } = useQuery(VERIFY_USER);
  const navigate = useNavigate();

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
      navigate("/");
    }
  }, [loading, data, dispatch]);

  return (
    <div>
      {!import.meta.env.DEV && (
        <div className="text-center bg-primary-background text-primary-text pt-1">
          This Project is Currently in-progress
        </div>
      )}

      {isAuthenticated ? (
        <Layout>
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/profile" Component={Profile} />
            <Route path="/search" Component={Search} />
            <Route path="/notifications" Component={Notifications} />
            <Route path="/:userName" Component={Profile} />
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
