import axios from "axios"

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
})

export const getHealth = async () => {
  return API.get("/health")
}

export const getModelInfo = async () => {
  return API.get("/model-info")
}

export default API