// API general utilities and configurations
import axios from 'axios';

// si no hay un  .env con la variable NEXT_PUBLIC_API_URL, se usa el localhost:3001
export const API_URL = process.env.NEXT_PUBLIC_API_URL 
export const API_CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
console.log(API_URL);

const api_error = () => {
  
  if (!API_URL || API_URL === undefined) {
    return "la api se cayó y retorna undefined" 
  } 
}
console.log(api_error());

export const endpoint_register = API_URL + "/api/v1/auth/register";
export const endpoint_selling = API_URL + "/api/v1/auth/horses";
// console.log(endpoint_register);
export const endpoint_login = API_URL + "/api/v1/auth/login";
console.log(endpoint_login);
export const endpoint_test_auth = "/api/v1/auth/test";


const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;


