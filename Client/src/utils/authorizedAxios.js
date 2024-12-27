import axios from "axios";

let authorizedAxiosInstance = axios.create();

authorizedAxiosInstance.defaults.timeout = 10000;

// withCredentials allows axios to send cookies with the request.
authorizedAxiosInstance.defaults.withCredentials = true

export default authorizedAxiosInstance;
