import axios from "axios";

const url = "http://nadescrib.com:8012";

export default {
  list: (email) => {
    return axios({
      method: "GET",
      baseURL: url,
      url: `/store/orders`,
      params: {
        email: email,
      },
    });
  },
};
