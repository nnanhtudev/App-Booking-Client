import axios from '../custom/axios';

const handleRegister = async (email, password) => {
  return axios.post('/v1/register', { email, password })
}

const handleLogin = async (email, password) => {
  return axios.post('/v1/login', { email, password })
}

export { handleRegister, handleLogin }