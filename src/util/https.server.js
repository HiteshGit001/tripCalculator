import axios from "axios"
import { ContentType } from "../api/content";

export const axiosGet = (url, authKeyExists, contentType = ContentType.JSON) => {
  const headers = {
    'Content-Type': ContentType,
  };
  return axios.get(url, { headers });
}

export const axiosPost = (url, body, apiKey, authKeyExists, contentType = ContentType.JSON) => {
  const headers = {
    'Content-Type': contentType,
    'x-api-key': apiKey
  };
  console.log(headers, "headers")
  return axios.post(url, body, { headers })
}

export const axiosDelete = (url, authKeyExists, contentType = ContentType.JSON) => {
  const headers = {
    'Content-Type': contentType,
  };
  return axios.delete(url, { headers })
}