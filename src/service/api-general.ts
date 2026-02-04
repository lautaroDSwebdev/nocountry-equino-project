// API general utilities and configurations
import axios from 'axios';

// si no hay un  .env con la variable NEXT_PUBLIC_API_URL, se usa el localhost:3001
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;


