import axios from "axios";

export const HelperInstance = {
  Get,
  Post,
  Put,
  Delete,
};

function Get(path, config) {
  return axios
    .get(path, config)
    .then((data) => {
      return data;
    })
    .catch((error) => {
    //if expired!=true
      handleError(error);
      return error;
    });
}
function Post(path, config, data) {
  return axios
    .post(path, data, config)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      handleError(error);
      return error;
    });
}
function Put(path, config, data) {
  return axios
    .put(path, data, config)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
}
function Delete(path, config) {
  return axios
    .delete(path, config)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
}
function handleError(error) {
  // set expired=true
  if (error?.response?.status === 403) {
   
  }
}
