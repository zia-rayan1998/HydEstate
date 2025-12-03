// API utility for communicating with Flask backend
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  try {
    const url = `${API_URL}${endpoint}`

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${typeof window !== "undefined" ? localStorage.getItem("token") || "" : ""}`,
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP ${response.status}: ${response.statusText}`,
      }
    }

    const data = await response.json()
    return {
      success: true,
      data,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred",
    }
  }
}

// Auth endpoints
export async function login(email: string, password: string) {
  return apiCall("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })
}

export async function signup(email: string, password: string, name: string) {
  return apiCall("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password, name }),
  })
}

// Properties endpoints
export async function getProperties(filters?: Record<string, any>) {
  const params = new URLSearchParams()
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value))
      }
    })
  }
  return apiCall(`/api/properties?${params.toString()}`)
}

export async function getProperty(id: string) {
  return apiCall(`/api/properties/${id}`)
}

export async function createProperty(formData: FormData) {
  return apiCall("/api/properties/create", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${typeof window !== "undefined" ? localStorage.getItem("token") || "" : ""}`,
    },
    body: formData,
  })
}

// Price prediction endpoint
export async function predictPrice(propertyData: Record<string, any>) {
  return apiCall("/api/predict-price", {
    method: "POST",
    body: JSON.stringify(propertyData),
  })
}

// Map data endpoint
export async function getPropertyMarkers() {
  return apiCall("/api/properties/map/markers")
}
