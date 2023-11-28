import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../helper/Logo";
import TextField from "../helper/TextField";
import Button from "../helper/Button";
import { useMutation } from "@apollo/client";
import { LOGIN_USER, SIGNUP_USER } from "../../graphql";
// import { useDispatch } from "react-redux";
// import { authenticate } from "../../redux/auth/authSlice";

export default function Authentication() {
  const [haveAccount, setHaveAccount] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [login, loginState] = useMutation(LOGIN_USER);
  const [signUp, signUpState] = useMutation(SIGNUP_USER);
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
    userName: "",
  });

  // const dispatch = useDispatch();

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    console.log({ value: e.target.value, name: e.target.name });
    setDetails((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value?.trim() ?? "",
      };
    });
  };

  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname == "/login") {
      setHaveAccount(true);
    } else {
      setHaveAccount(false);
    }
  }, [pathname]);

  const submitDisabled = useMemo(() => {
    if (
      (haveAccount &&
        details.password.length > 5 &&
        details.email.length > 10) ||
      (details.password.length > 5 &&
        details.email.length > 10 &&
        details.name.length > 3 &&
        details.userName.length > 6)
    ) {
      return false;
    }
    return true;
  }, [details, haveAccount]);

  const submitHandler = async (e: ChangeEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      let response;
      if (haveAccount) {
        response = await login({
          variables: {
            ...details,
          },
        });
      } else {
        response = await signUp({
          variables: {
            ...details,
          },
        });
      }

      if (response.data) {
        const target = haveAccount
          ? response.data.login
          : response.data.createUser;
        localStorage.setItem("token", target.token);
        window.location.reload();

        // dispatch(
        //   authenticate({
        //     user: {
        //       name: target.name ?? "",
        //       email: target.email ?? "",
        //       id: target.id ?? "",
        //       userName: target.userName ?? "",
        //     },
        //     token: target.token,
        //   })
        // );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--primary-background",
      "255, 255, 255"
    );
    document.documentElement.style.setProperty("--primary-text", "0, 0, 0");
  }, []);

  return (
    <div className=" w-screen h-screen flex justify-center items-center">
      <div className="w-screen h-screen overflow-y-auto md:h-auto  md:w-2/3 lg:w-1/3 border-[1px] border-border-primary p-10">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <form onSubmit={submitHandler}>
          {haveAccount ? (
            <TextField
              onChange={changeHandler}
              name="email"
              value={details.email}
              placeholder="email or username"
            />
          ) : (
            <>
              <TextField
                onChange={changeHandler}
                name="email"
                placeholder="Email"
                value={details.email}
              />
              <TextField
                onChange={changeHandler}
                name="name"
                placeholder="Full Name"
                value={details.name}
              />
              <TextField
                onChange={changeHandler}
                name="userName"
                placeholder="User Name"
                value={details.userName}
              />
            </>
          )}

          <TextField
            onChange={changeHandler}
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="password"
            value={details.password}
            suffix={
              <div
                className="cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Hide" : "Show"}
              </div>
            }
          />
          <div className="pt-8">
            <Button
              loading={haveAccount ? loginState.loading : signUpState.loading}
              disabled={submitDisabled}
              fullWidth
              type="submit"
            >
              {haveAccount ? "Login" : "Sign up"}
            </Button>
          </div>
        </form>
        <div className="my-8 text-secondary-text flex items-center gap-4">
          <div className="h-[1px] flex-1 bg-border-primary"></div>
          <div className="font-bold">OR</div>
          <div className="h-[1px] flex-1 bg-border-primary"></div>
        </div>
        <div className="text-center">
          {haveAccount
            ? "Don't have an account? "
            : "Already have an account? "}
          <span
            className="text-primary-button hover:text-primary-button-hover cursor-pointer"
            onClick={() => {
              navigate(haveAccount ? "/sign-up" : "/login");
            }}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
}
