import React, { useEffect, useState } from "react";
import { getAccount } from "../services/apiUserServices";

const UserContext = React.createContext(null);

const UserProvider = ({ children }) => {
  // User is the name of the "data" that gets stored in context
  const [loading, setLoading] = useState(true);
  const defaultUser = { isLoading: true, isAuthenticated: false, token: "", account: {} };
  const [user, setUser] = useState(defaultUser);
  // Login updates the user data with a name parameter
  const loginContext = (useData) => {
    setUser({ ...useData, isLoading: false });
  };
  // Logout updates the user data to default
  const logoutContext = () => {
    setUser({ ...defaultUser, isLoading: false });
  };

  const fetchUser = async () => {
    let response = await getAccount();
    if (response && response.EC === 0) {
      let email = response.DT.email;
      let isAdmin = response.DT.isAdmin;
      let token = response.DT.access_token;
      let data = {
        isAuthenticated: true,
        token,
        account: { email, isAdmin },
        isLoading: false,
      };
      setUser(data);
    } else {
      //setTimeout de mo phong project thuc te. Vi trong thuc te loading data ton time
      setUser({ ...defaultUser, isLoading: false });
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <UserContext.Provider value={{ loading, setLoading, user, loginContext, logoutContext }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
