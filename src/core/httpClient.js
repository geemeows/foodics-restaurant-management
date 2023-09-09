import axios from 'axios'

const TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
const CORS_ANYWHERE_SERVICE = 'https://cors-anywhere.herokuapp.com/'

export default axios.create({
  baseURL: `${CORS_ANYWHERE_SERVICE}https://api.foodics.dev/v5`,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    Authorization: `Bearer ${TOKEN}`
  }
})