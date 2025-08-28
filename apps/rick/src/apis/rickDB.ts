import axios from "axios"

const rickDB = axios.create({
  baseURL: import.meta.env.VITE_API
})

export default rickDB