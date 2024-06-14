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
  purchase: (email) => {
    return axios({
      method: "POST",
      baseURL: url,
      url: `/store/orders/purchase`,
      params: {
        email: email,
      },
    });
  },
  remove: (uid) => {
    return axios({
      method: "DELETE",
      baseURL: url,
      url: `/store/orders/${uid}`,
    });
  },
};
