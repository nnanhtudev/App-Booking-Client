import { Route, useHistory } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";
const PrivateRoutes = (props) => {
  const { user } = useContext(UserContext);
  if (user && user.isAuthenticated === true) {
    return (
      <>
        <Route path={props.path} element={props.element} />
      </>
    );
  } else {
    return (
      <>
        <Navigate to="/login"></Navigate>
      </>
    );
  }
};

export default PrivateRoutes;
