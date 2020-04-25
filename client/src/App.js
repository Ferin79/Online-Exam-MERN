import React, { useState, useEffect } from "react";
import { Route, Redirect, Switch, HashRouter } from "react-router-dom";
import { AuthContext } from "./config/auth";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import NotLoginHeader from "./components/NotLoginHeader";
import LoginHeader from "./components/LoginHeader";
import HomePage from "./pages/HomePage";
import dashboard from "./pages/admin/dashboard";
import LoadingScreen from "./components/Loading";
import addEditDept from "./pages/admin/addEditDept";
import AddQuestion from "./pages/admin/addQuestion";
import TakeExam from "./pages/admin/takeExam";
import configureExam from "./pages/admin/configureExam";
import ResultPage from "./pages/admin/result";

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [expireDate, setExpireDate] = useState(null);
  const [isLoading, setisLoading] = useState(true);

  const context = {
    isLogin,
    setIsLogin,
    token,
    setToken,
    userEmail,
    setUserEmail,
    userName,
    setUserName,
    expireDate,
    setExpireDate,
  };

  const checkAutoLogin = () => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    console.log(storedData);
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expire) > new Date()
    ) {
      setToken(storedData.token);
      setUserEmail(storedData.email);
      setUserName(storedData.name);
      setIsLogin(true);
    } else {
      setUserEmail(null);
      setToken(null);
      setUserName(null);
      setIsLogin(false);
    }
  };

  useEffect(() => {
    setisLoading(true);
    setIsLogin(false);
    checkAutoLogin();
    setisLoading(false);
  }, []);

  const DynamicRoutes = () => {
    if (token && isLogin) {
      return (
        <React.Fragment>
          <LoginHeader />
          <Switch>
            <Route path="/" exact component={dashboard} />
            <Route path="/add" component={AddQuestion} />
            <Route path="/take-exam" component={TakeExam} />
            <Route path="/config-exam" component={configureExam} />
            <Route path="/result" component={ResultPage} />
            <Route path="/add-edit-dept" component={addEditDept} />
            <Redirect to="/" />
          </Switch>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <NotLoginHeader />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Redirect to="/" />
          </Switch>
        </React.Fragment>
      );
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <React.Fragment>
      <AuthContext.Provider value={context}>
        <HashRouter basename="/#">
          <DynamicRoutes />
        </HashRouter>
      </AuthContext.Provider>
    </React.Fragment>
  );
};

export default App;
