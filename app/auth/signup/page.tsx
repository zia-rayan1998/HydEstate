"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Mail, Lock, User, MapPin } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)

    try {
      // In production, call your Flask backend
      // const response = await fetch('http://your-flask-api/auth/signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     name: formData.name,
      //     email: formData.email,
      //     password: formData.password,
      //   }),
      // })
      // const data = await response.json()

      // Mock signup for demo
      if (formData.name && formData.email && formData.password) {
        localStorage.setItem("token", "mock-jwt-token")
        setTimeout(() => {
          router.push("/")
        }, 500)
      }
    } catch (err) {
      setError("Signup failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-foreground">LuxeProperty</span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-foreground">Create Account</h1>
            <p className="text-muted-foreground">Join LuxeProperty today</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Full Name</label>
              <div className="flex items-center gap-3 bg-input border border-border rounded-lg px-4 py-3">
                <User className="w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <div className="flex items-center gap-3 bg-input border border-border rounded-lg px-4 py-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Password</label>
              <div className="flex items-center gap-3 bg-input border border-border rounded-lg px-4 py-3">
                <Lock className="w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Confirm Password</label>
              <div className="flex items-center gap-3 bg-input border border-border rounded-lg px-4 py-3">
                <Lock className="w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90 text-white font-semibold py-3"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <p className="text-center text-muted-foreground text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-500 hover:text-blue-400 font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
