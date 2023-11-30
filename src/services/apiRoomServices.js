import axios from "../custom/axios";

const fetchRoomByIds = (dataRoom) => {
  return axios.post(`/v1/room/findIds`, { data: dataRoom });
};

export { fetchRoomByIds };
