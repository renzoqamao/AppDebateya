import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Error404 from "./pages/Error404";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { useState, useEffect } from "react";
import PrivateRoute from "./pages/PrivateRoute";
import Home from "./components/Home";
import HomeNavBar from "./components/HomeNavBar";
import MainNavBar from "./components/MainNavBar";
import WindowChat from "./components/WindowChat";
import Questions from "./components/Questions";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import "./css/form.css";

function App() {
  const [auth, setAuth] = useState(false);

  /* Función para autenticar , si es "true" se puede pasar  a MainPage.  */
  const authentication = (value) => {
    setAuth(value);
  };
  useEffect(() => {
    let user = false;
    const fun = async () => {
      user = (await localStorage.getItem("user")) ? true : false;
      await authentication(user);
    };
    fun();
  });
  return (
    <Router>
      {auth ? <MainNavBar authentication={authentication} /> : <HomeNavBar />}
      <div className="Content row">
        <Switch>
          <Route exact path="/">
            {auth ? <Redirect to="/mainpage" /> : <Home />}
          </Route>

          <Route exact path="/signin">
            {auth ? <Questions /> : <Signin authentication={authentication} />}
          </Route>

          <Route exact path="/signup">
            {auth ? <Questions /> : <Signup />}
          </Route>

          <PrivateRoute
            exact
            path="/mainpage"
            component={Questions}
            auth={auth}
          />
          <PrivateRoute exact path="/profile" component={Profile} auth={auth} />
          <PrivateRoute
            exact
            path="/dashboard"
            component={Dashboard}
            auth={auth}
          />
          <Route path="*" component={Error404} />
        </Switch>
        {auth && <WindowChat />}
      </div>
    </Router>
  );
}

export default App;
