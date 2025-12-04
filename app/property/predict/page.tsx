"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PredictionPage() {
  const [formData, setFormData] = useState({
    locality: "",
    sqft: "",
    bedrooms: "",
    bathrooms: "",
  })

  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult("")

    // 👉 Add your backend API call here
    // Example (mock output):
    setTimeout(() => {
      setResult("Estimated Price: ₹ 54,20,000")
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            <span className="font-medium text-foreground">Back to Home</span>
          </Link>
        </div>
      </nav>

      {/* Main content */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold text-foreground">House Price Prediction</h1>
            <p className="text-muted-foreground mt-2">
              Enter basic property details to estimate its market price.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handlePredict}
            className="bg-card border border-border rounded-xl p-6 space-y-6"
          >
            {/* Locality */}
            <div className="space-y-2">
              <label className="font-medium text-sm">Locality</label>
              <input
                type="text"
                name="locality"
                value={formData.locality}
                onChange={handleChange}
                placeholder="Enter locality (ex: Gachibowli)"
                className="w-full p-2 border border-border rounded-lg bg-input text-sm"
                required
              />
            </div>

            {/* Sqft */}
            <div className="space-y-2">
              <label className="font-medium text-sm">Area (sqft)</label>
              <input
                type="number"
                name="sqft"
                value={formData.sqft}
                onChange={handleChange}
                placeholder="Enter square feet"
                className="w-full p-2 border border-border rounded-lg bg-input text-sm"
                required
              />
            </div>

            {/* Bedrooms */}
            <div className="space-y-2">
              <label className="font-medium text-sm">Bedrooms</label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                placeholder="Number of bedrooms"
                className="w-full p-2 border border-border rounded-lg bg-input text-sm"
                required
              />
            </div>

            {/* Bathrooms */}
            <div className="space-y-2">
              <label className="font-medium text-sm">Bathrooms</label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                placeholder="Number of bathrooms"
                className="w-full p-2 border border-border rounded-lg bg-input text-sm"
                required
              />
            </div>

            {/* Predict Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold"
            >
              {loading ? "Predicting..." : "Predict Price"}
            </Button>
          </form>

          {/* Prediction Output */}
          {result && (
            <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl">
              <h3 className="font-semibold text-foreground mb-1">Prediction Result</h3>
              <p className="text-muted-foreground">{result}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
