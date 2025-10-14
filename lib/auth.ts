export interface User {
  id: string
  name?: string
  storeName?: string
  email: string
  role: "user" | "merchant" | "admin"
}

export function setAuthToken(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem("token", token)
  }
}

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem("token")
}

export function removeAuthToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }
}

export function setUser(user: User) {
  if (typeof window !== 'undefined') {
    localStorage.setItem("user", JSON.stringify(user))
  }
}

export function getUser(): User | null {
  if (typeof window === 'undefined') return null
  const userStr = localStorage.getItem("user")
  if (!userStr) return null
  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

export function isAuthenticated(): boolean {
  return !!getAuthToken()
}

export function getUserRole(): "user" | "merchant" | "admin" | null {
  const user = getUser()
  return user?.role || null
}
