import React, { useState, useContext } from "react";
import { Icon } from "react-materialize";
import "./login.css";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../../config/auth";
import LoadingScreen from "../../components/Loading";

const Login = props => {
  const history = useHistory();
  const {
    setIsLogin,
    setUserEmail,
    setUserName,
    setToken,
    setExpireDate
  } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loginHandler = async () => {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}admin/auth/login`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      }
    );
    const responseData = await response.json();
    console.log(responseData);
    if (responseData.success === 1) {
      const tokenExpiresIn = new Date(new Date().getTime() + 1000 * 60 * 60);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          email: responseData.email,
          token: responseData.token,
          name: responseData.name,
          expire: tokenExpiresIn.toISOString()
        })
      );
      setToken(responseData.token);
      setUserEmail(responseData.email);
      setUserName(responseData.name);
      setIsLogin(true);
      setExpireDate(tokenExpiresIn);
      history.push("/");
    } else {
      alert(responseData.message);
    }
    setIsLoading(false);
  };
  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <div className="row main_wrapper_login">
      <div className="col s12 m4 input-wrapper">
        <h3>Sign In</h3>
        <div className="input-fields">
          <Icon>email</Icon>
          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={event => setEmail(event.target.value)}
          />
        </div>
        <div className="input-fields">
          <Icon>lock</Icon>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={event => setPassword(event.target.value)}
          />
        </div>

        <button className="btn" onClick={loginHandler}>
          Login
        </button>
        <br />
        <NavLink to="register">New? Create an Account !!</NavLink>
        <br />
      </div>
    </div>
  );
};

export default Login;
