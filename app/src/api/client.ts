import axios from 'axios'

const API_BASE = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000'

export const api = axios.create({ baseURL: API_BASE })

let authToken: string | undefined
export function setAuthToken(token?: string) {
  authToken = token
}

api.interceptors.request.use((config) => {
  if (authToken) config.headers = { ...config.headers, Authorization: `Bearer ${authToken}` }
  return config
})