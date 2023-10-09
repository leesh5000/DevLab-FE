import axios from "axios";

const client = axios.create();
client.defaults.baseURL = import.meta.env.VITE_API_SERVER_URL;

export default client;