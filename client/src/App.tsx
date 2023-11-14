import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "./redux/store";
import { Navigate, Route, Routes } from "react-router-dom";
import Authentication from "./components/authentication";

// import { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { authenticate } from "./redux/auth/authSlice";
import Layout from "./components/layout";
// import { VERIFY_USER } from "./graphql/query";
// import { authenticate } from "./redux/auth/authSlice";

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
            <Route path="/" element={<div>hii</div>} />
            <Route path="/profile" element={<div>profile</div>} />
            <Route path="/search" element={<div>search</div>} />
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
