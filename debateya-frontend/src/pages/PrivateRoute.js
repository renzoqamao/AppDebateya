import { Redirect, Route } from "react-router";
const PrivateRoute = ({ auth, component: Component, ...rest }) => {
  return <Route {...rest}>{auth ? <Component /> : <Redirect to="/" />}</Route>;
};
export default PrivateRoute;
