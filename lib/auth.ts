export interface User {
  id: string
  name?: string
  storeName?: string
  email: string
  role: "user" | "merchant" | "admin"
}

export function setAuthToken(token: string) {
  localStorage.setItem("token", token)
}

export function getAuthToken(): string | null {
  return localStorage.getItem("token")
}

export function removeAuthToken() {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
}

export function setUser(user: User) {
  localStorage.setItem("user", JSON.stringify(user))
}

export function getUser(): User | null {
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
