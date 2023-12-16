import axios from "axios";
import { baseURL } from "../constant/Constant";

const httpModule = axios.create({
  baseURL: baseURL,
});

export default httpModule;
