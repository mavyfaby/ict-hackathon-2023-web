import type { HttpMethod } from "../types";
import type { AxiosError, AxiosRequestConfig } from "axios";
import { TYPE } from "vue-toastification";
import { Endpoints } from "./endpoints";

import axios from "axios";
import showToast from "../utils/toast";
// import { getAuthToken, saveAuthToken } from "./session";
// import { useStore } from "../store";

// Create a new axios instance
const instance = axios.create({
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  }
});

/**
 * Make a request to the Fireduino API
 */
function makeRequest(method: HttpMethod, endpoint: Endpoints, data: object | string | null, callback: (response: any) => void) {
  // Create config 
  const config: AxiosRequestConfig = {
    method,
    url: "http://172.16.220.68:8000" + endpoint,
  };

  // If endpoint is not login
//   if (endpoint !== Endpoints.Login) {
//     config.headers = {
//       Authorization: `Bearer ${getAuthToken()}`,
//     };
//   }



  // If data is not null
  if (typeof data === "string") {
    // Add data to config
    config.url += "/" + data;
  }

  // If data is not null
  if (data !== null && typeof data !== "string") {
    // Add data to config
    config.data = data;
  }

  // Execute request
  instance(config).then((response) => {
    callback(response.data);
  })
  .catch((error: AxiosError) => {
    // If has custom message
    if (error.response && ((error.response?.data) as any).message) {
      error.message = ((error.response?.data) as any).message
    }
    // Show error toast
    showToast(TYPE.ERROR, error.message);

    // Execute callback
    callback(error);
  });
}

export { Endpoints };
export default makeRequest;