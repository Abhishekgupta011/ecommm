import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router";

import { useDispatch } from "react-redux";
import { authActions } from "../Slices/AuthSlice";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    mail: "",
    password: "",
    cpassword: "",
  });
  //const authCtx = useContext(AuthContextApi)
  const navigate = useNavigate()
  const authDispatch = useDispatch();
  const changeHandler = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [id]: value,
      };
    });
  };
  const onLoginHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:${
          !isLogin ? "signInWithPassword" : "signUp"
        }?key=AIzaSyD0blSoC3v9v2dIgXhYyxl9b4BzBcIibpA`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.mail,
            password: formData.password,
            returnSecureToken: true,
          }),
        }
      );
      const data = await response.json();
       if (!response.ok) {
      // Custom error messages based on specific cases
      if (data.error?.message === "EMAIL_EXISTS") {
        throw new Error("This email is already registered. Please log in.");
      } else if (data.error?.message === "EMAIL_NOT_FOUND") {
        throw new Error("This email does not exist. Please sign up.");
      } else if (data.error?.message === "INVALID_PASSWORD") {
        throw new Error("The password entered is incorrect.");
      } else {
        throw new Error(data.error?.message || "An unknown error occurred.");
      }
    }
      if (response.ok) {
        console.log("login state" , isLogin)
        const token = data.idToken;
        console.log(`${!isLogin ? 'login' :'Authentication'} successful`, data);
        //authCtx.onLogin(token)
        console.log("token" , token)
        authDispatch(authActions.onLogin({token}))
        localStorage.setItem("mail" , formData.mail);
        const currentMail = formData.mail.replace(/[@.]/g, "_")
        localStorage.setItem('modifiedMail' , currentMail)
        navigate('/home')
      } else {
        console.log(data.error)
        alert(data.error.message || "Authentication failed.");
      }
    } catch (error) {
      console.log("An error occurred. Please try again." , error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Fragment>
      <form onSubmit={onLoginHandler}>
        <label htmlFor="email">Email</label>
        <input
          type="mail"
          className="mail"
          id="mail"
          aria-label="Email"
          placeholder="Enter Email"
          value={formData.mail}
          onChange={changeHandler}
        />
        <label htmlFor="email">Password</label>
        <input
          type="password"
          className="password"
          id="password"
          aria-label="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={changeHandler}
        />
        {isLogin && (
          <>
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              type="password"
              id="cpassword"
              placeholder="Confirm password"
              value={formData.cpassword}
              onChange={changeHandler}
            />
          </>
        )}
        <button type="submit">
          {isLoading ? "Loading..." : isLogin ? "Sign Up" : "Login"}
        </button>

        <button type="button" onClick={() => setIsLogin((prev) => !prev)}>
          {isLogin
            ? "Already have an account? Login"
            : "Don't have an account? Sign Up"}
        </button>
      </form>
    </Fragment>
  );
};
export default LoginPage;
