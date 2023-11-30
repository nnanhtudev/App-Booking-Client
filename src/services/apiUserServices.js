import axios from "../custom/axios";

const handleRegister = (email, password) => {
  return axios.post("/v1/register", { email, password });
};

const handleLogin = (email, password) => {
  return axios.post("/v1/login", { email, password });
};

const getAccount = () => {
  return axios.get("/v1/account");
};

const handleLogoutUser = () => {
  return axios.post("/v1/logout");
};

export { handleRegister, handleLogin, getAccount, handleLogoutUser };
