import axios from "axios"

const harryDB = axios.create({
  baseURL: import.meta.env.VITE_API
})

export default harryDB