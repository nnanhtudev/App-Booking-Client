import axios from "../custom/axios";

const handleGetHotelsHomePage = async (city, type, rating) => {
  let apiUrl = "/v1/hotel/read?";

  if (city) {
    apiUrl += `city=${city}&`;
  }

  if (type) {
    apiUrl += `type=${type}&`;
  }

  if (rating) {
    apiUrl += `rating=${rating}`;
  }

  return axios.get(apiUrl);
};

const handleGetHotelById = async (id) => {
  return axios.get(`/v1/hotel/${id}`);
};

export { handleGetHotelsHomePage, handleGetHotelById };
