import axios from "../custom/axios";

const handleCreateTransaction = (data) => {
  return axios.post(`/v1/transaction/create`, data);
};

const handleGetTransactionByUser = () => {
  return axios.get(`/v1/transaction/read`);
};

export { handleCreateTransaction, handleGetTransactionByUser };
