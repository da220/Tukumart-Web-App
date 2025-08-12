import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { api, setAuthToken } from '../api/client'

type User = { id: number; name: string; email: string; role: 'ADMIN' | 'OFFICER' | 'FARMER' }

type AuthContextType = {
  user?: User
  token?: string
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>()
  const [token, setToken] = useState<string | undefined>()

  useEffect(() => {
    ;(async () => {
      const t = await AsyncStorage.getItem('token')
      const u = await AsyncStorage.getItem('user')
      if (t && u) {
        setToken(t)
        setAuthToken(t)
        setUser(JSON.parse(u))
      }
    })()
  }, [])

  const value = useMemo<AuthContextType>(() => ({
    user,
    token,
    login: async (email, password) => {
      const res = await api.post('/auth/login', { email, password })
      setUser(res.data.user)
      setToken(res.data.token)
      setAuthToken(res.data.token)
      await AsyncStorage.setItem('token', res.data.token)
      await AsyncStorage.setItem('user', JSON.stringify(res.data.user))
    },
    register: async (name, email, password) => {
      const res = await api.post('/auth/register', { name, email, password })
      setUser(res.data.user)
      setToken(res.data.token)
      setAuthToken(res.data.token)
      await AsyncStorage.setItem('token', res.data.token)
      await AsyncStorage.setItem('user', JSON.stringify(res.data.user))
    },
    logout: () => {
      setUser(undefined)
      setToken(undefined)
      setAuthToken(undefined)
      AsyncStorage.removeItem('token')
      AsyncStorage.removeItem('user')
    },
  }), [user, token])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}