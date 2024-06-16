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
  create: (data) => {
    return axios({
      method: "POST",
      baseURL: url,
      url: `/store/catalogs`,
      data: data,
    });
  },
  read: (uid) => {
    return axios({
      method: "GET",
      baseURL: url,
      url: `/store/catalogs/${uid}`,
    });
  },
  remove: (uid) => {
    return axios({
      method: "DELETE",
      baseURL: url,
      url: `/store/catalogs/${uid}`,
    });
  },
};
