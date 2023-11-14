import axios from 'axios';

const handleRegister = async (email, password) => {
  return axios.post('http://localhost:5000/api/v1/register', { email, password })
}

const handleLogin = async (email, password) => {
  return axios.post('http://localhost:5000/api/v1/login', { email, password })
}

export { handleRegister, handleLogin }