import { createContext } from 'react'

export type AuthContextType = {
  status: 'idle' | 'authenticated' | 'unauthenticated',
  token?: string
  setToken: (token?: string | null, refreshToken?: string | null) => void
}

const AuthContext = createContext<AuthContextType>({
  status: 'idle',
  token: undefined,
  setToken: (_a, _b) => {}
})

export default AuthContext
