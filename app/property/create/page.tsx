"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ImageUpload } from "@/components/image-upload"
import { PropertyQuestions } from "@/components/property-questions"
import { ArrowLeft, Upload } from "lucide-react"
import { createProperty } from "@/lib/api"

interface PropertyData {
  images: File[]
  details: Record<string, any>
}

export default function CreatePropertyPage() {
  const router = useRouter()
  const [propertyData, setPropertyData] = useState<PropertyData>({
    images: [],
    details: {},
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleImagesChange = (files: File[]) => {
    setPropertyData((prev) => ({ ...prev, images: files }))
  }

  const handleDetailsChange = (answers: Record<string, any>) => {
    setPropertyData((prev) => ({
      ...prev,
      details: { ...prev.details, ...answers },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    // Validation
    if (propertyData.images.length === 0) {
      setError("Please upload at least one image")
      return
    }

    if (!propertyData.details.title || !propertyData.details.price) {
      setError("Please fill in all required fields")
      return
    }

    setIsLoading(true)

    try {
      // Create FormData for file upload
      const formData = new FormData()

      // Add images
      propertyData.images.forEach((image) => {
        formData.append(`images`, image)
      })

      // Add property details as JSON
      formData.append("details", JSON.stringify(propertyData.details))

      const { success: apiSuccess, error: apiError } = await createProperty(formData)

      if (apiSuccess) {
        setSuccess("Property listed successfully!")
        setTimeout(() => {
          router.push("/")
        }, 1500)
      } else {
        setError(apiError || "Failed to create property. Please try again.")
      }
    } catch (err) {
      setError("Failed to create property. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
              <span className="text-foreground font-medium">Back to Home</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-foreground">List Your Property</h1>
            </div>
            <p className="text-muted-foreground">
              Upload images and fill in the details to list your property on LuxeProperty
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-card border border-border rounded-2xl p-8 space-y-8">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-500/10 border border-green-500/20 text-green-600 px-4 py-3 rounded-lg text-sm">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Image Upload Section */}
              <div className="bg-input/30 border border-border rounded-xl p-6">
                <ImageUpload onImagesChange={handleImagesChange} maxImages={10} />
              </div>

              {/* Property Details Section */}
              <PropertyQuestions onAnswersChange={handleDetailsChange} />

              {/* Submit Button */}
              <div className="flex gap-4 pt-6 border-t border-border">
                <Link href="/" className="flex-1">
                  <Button type="button" variant="outline" className="w-full bg-transparent">
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90 text-white font-semibold"
                >
                  {isLoading ? "Creating Property..." : "List Property"}
                </Button>
              </div>
            </form>
          </div>

          {/* Info Box */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 space-y-3">
            <h3 className="font-semibold text-foreground">Upload Tips</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>Upload up to 10 high-quality images of your property</li>
              <li>First image will be used as the main thumbnail</li>
              <li>Supported formats: PNG, JPG, WebP (max 5MB each)</li>
              <li>Fill in all required fields marked with an asterisk (*)</li>
              <li>Accurate pricing and details help your property sell faster</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
