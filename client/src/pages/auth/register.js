import React, { useState, useContext } from "react";
import { Icon } from "react-materialize";
import "./register.css";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../../config/auth";
import LoadingScreen from "../../components/Loading";

const Register = props => {
  const history = useHistory();

  const {
    setIsLogin,
    setUserEmail,
    setUserName,
    setToken,
    setExpireDate
  } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const registerHandler = async () => {
    setIsLoading(true);
    if (password !== repeat) {
      alert("Password did not Match");
    } else {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}admin/auth/register`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            password
          })
        }
      );
      const responseData = await response.json();
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
        setExpireDate(tokenExpiresIn);
        setIsLogin(true);
        history.push("/");
      } else {
        alert(responseData.message);
      }
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <div className="row main_wrapper">
      <div className="col s12 m4 input-wrapper">
        <h3>Sign Up</h3>
        <div className="input-fields">
          <Icon>person</Icon>
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            onChange={event => setName(event.target.value)}
          />
        </div>
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
        <div className="input-fields">
          <Icon>lock</Icon>
          <input
            type="password"
            placeholder="Repeat Password"
            name="repeat_password"
            onChange={event => setRepeat(event.target.value)}
          />
        </div>
        <button className="btn" onClick={registerHandler}>
          Register
        </button>
        <br />
        <NavLink to="login">Already have Account? Login Here</NavLink>
        <br />
      </div>
    </div>
  );
};

export default Register;
