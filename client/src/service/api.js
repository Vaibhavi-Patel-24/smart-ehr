// api.js
import axios from "axios";
import {
  API_NOTIFICATION_MESSAGES,
  SERVICE_URLS,
} from "../components/constants/config.js";

const API_URL = "http://localhost:8000";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return processResponse(response);
  },
  function (error) {
    return Promise.reject(processError(error));
  }
);

const processResponse = (response) => {
  if (response?.status === 200 || response?.status === 201) {
    return { isSuccess: true, data: response.data };
  } else {
    return {
      isFailure: true,
      status: response?.status,
      msg: response?.msg,
      code: response?.code,
    };
  }
};

const processError = (error) => {
  if (error.response) {
    console.log("ERROR IN RESPONSE", JSON.stringify(error));
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.responseFailure.message,
      code: error.response.status,
    };
  } else if (error.request) {
    console.log("ERROR IN REQUEST", JSON.stringify(error));
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.requestFailure.message,
      code: "",
    };
  } else {
    console.log("ERROR IN NETWORK", JSON.stringify(error));
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.networkError.message,
      code: "",
    };
  }
};

const convertToFormData = (data) => {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  return formData;
};

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
  API[key] = async (
    body = {},
    showUploadProgress = () => {},
    showDownloadProgress = () => {}
  ) => {
    try {
      let url = value.url;
      if (value.method === "PUT" || value.method === "DELETE") {
        console.log(body);
        if (!body.id) {
          throw new Error("ID is required for update/delete operations.");
        }
        url = value.url.replace(":id", body.id); // Ensure proper URL formatting
      }

      const config = {
        method: value.method,
        url: url,
        data:
          value.method === "GET" ? body : value.method === "DELETE" ? {} : body,
        headers: {
          "Content-Type":
            value.method === "POST" && body instanceof FormData
              ? "multipart/form-data"
              : "application/json",
        },
        responseType: value.responseType,
        onUploadProgress: function (progressEvent) {
          if (typeof showUploadProgress === "function") {
            let percentageCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            showUploadProgress(percentageCompleted);
          }
        },
        onDownloadProgress: function (progressEvent) {
          if (typeof showDownloadProgress === "function") {
            let percentageCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            showDownloadProgress(percentageCompleted);
          }
        },
      };

      const response = await axiosInstance(config);
      return response;
    } catch (error) {
      throw error;
    }
  };
}

export { API };
