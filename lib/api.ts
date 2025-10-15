const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

export interface ApiResponse<T = any> {
  data?: T
  error?: string
  message?: string
}

export async function apiRequest<T = any>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  try {
    const token = localStorage.getItem("token")

    const headers = new Headers({
      "Content-Type": "application/json",
      ...options.headers,
    })

    if (token) {
      headers.set("Authorization", `Bearer ${token}`)
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    })

    const data = await response.json()

    if (!response.ok) {
      return { error: data.message || "Something went wrong" }
    }

    return { data }
  } catch (error: any) {
    return { error: error.message || "Network error" }
  }
}

export const api = {
  // User endpoints
  user: {
    register: (data: any) => apiRequest("/users/register", { method: "POST", body: JSON.stringify(data) }),
    login: (data: any) => apiRequest("/users/login", { method: "POST", body: JSON.stringify(data) }),
    getProfile: () => apiRequest("/users/profile"),
    updateProfile: (data: any) => apiRequest("/users/profile", { method: "PUT", body: JSON.stringify(data) }),
  },

  // Merchant endpoints
  merchant: {
    register: (data: any) => apiRequest("/merchants/register", { method: "POST", body: JSON.stringify(data) }),
    login: (data: any) => apiRequest("/merchants/login", { method: "POST", body: JSON.stringify(data) }),
    getProfile: () => apiRequest("/merchants/profile"),
    updateProfile: (data: any) => apiRequest("/merchants/profile", { method: "PUT", body: JSON.stringify(data) }),
    getProducts: () => apiRequest("/merchants/products"),
    addProduct: (data: any) => apiRequest("/merchants/products", { method: "POST", body: JSON.stringify(data) }),
    updateProduct: (id: string, data: any) =>
      apiRequest(`/merchants/products/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    deleteProduct: (id: string) => apiRequest(`/merchants/products/${id}`, { method: "DELETE" }),
  },

  // Admin endpoints
  admin: {
    login: (data: any) => apiRequest("/admin/login", { method: "POST", body: JSON.stringify(data) }),
    getUsers: () => apiRequest("/admin/users"),
    getMerchants: () => apiRequest("/admin/merchants"),
    approveMerchant: (id: string, isApproved: boolean) =>
      apiRequest(`/admin/merchants/${id}/approve`, { method: "PUT", body: JSON.stringify({ isApproved }) }),
    updateMerchant: (id: string, data: any) =>
      apiRequest(`/admin/merchants/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    deleteMerchant: (id: string) => apiRequest(`/admin/merchants/${id}`, { method: "DELETE" }),
    deleteUser: (id: string) => apiRequest(`/admin/users/${id}`, { method: "DELETE" }),
    getProducts: () => apiRequest("/admin/products"),
    approveProduct: (id: string, isApproved: boolean) =>
      apiRequest(`/admin/products/${id}/approve`, { method: "PUT", body: JSON.stringify({ isApproved }) }),
    deleteProduct: (id: string) => apiRequest(`/admin/products/${id}`, { method: "DELETE" }),
    getReports: () => apiRequest("/admin/reports"),
  },

  // Public product endpoints
  products: {
    getAll: (params?: { category?: string; location?: string; sort?: string }) => {
      const query = new URLSearchParams(params as any).toString()
      return apiRequest(`/products${query ? `?${query}` : ""}`)
    },
    getById: (id: string) => apiRequest(`/products/${id}`),
    search: (query: string) => apiRequest(`/products/search?q=${encodeURIComponent(query)}`),
    getCategories: () => apiRequest("/products/categories"),
  },
}
