import axios from "axios";

const url = "http://nadescrib.com:8011";

export default {
  list: () => {
    return axios({
      method: "GET",
      baseURL: url,
      url: `/store/catalogs`,
    });
  },
  read: (uid) => {
    return axios({
      method: "GET",
      baseURL: url,
      url: `/store/catalogs/${uid}`,
    });
  },
};
