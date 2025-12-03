"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Upload, X } from "lucide-react"

interface ImageUploadProps {
  onImagesChange: (files: File[]) => void
  maxImages?: number
}

export function ImageUpload({ onImagesChange, maxImages = 10 }: ImageUploadProps) {
  const [images, setImages] = useState<(File | string)[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(e.type === "dragenter" || e.type === "dragover")
  }

  const processFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList) return

      const newFiles = Array.from(fileList).slice(0, maxImages - images.length)

      newFiles.forEach((file) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreviews((prev) => [...prev, reader.result as string])
        }
        reader.readAsDataURL(file)
      })

      const updatedImages = [...images, ...newFiles]
      setImages(updatedImages)
      onImagesChange(updatedImages.filter((img) => img instanceof File) as File[])
    },
    [images, maxImages, onImagesChange],
  )

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    processFiles(e.dataTransfer.files)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files)
  }

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    const newPreviews = previews.filter((_, i) => i !== index)
    setImages(newImages)
    setPreviews(newPreviews)
    onImagesChange(newImages.filter((img) => img instanceof File) as File[])
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Property Images</label>
        <p className="text-xs text-muted-foreground">
          Upload up to {maxImages} images ({images.length}/{maxImages})
        </p>
      </div>

      {/* Upload Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl p-8 transition-all ${
          dragActive ? "border-blue-500 bg-blue-500/5" : "border-border bg-card/50 hover:border-blue-500/50"
        }`}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
          disabled={images.length >= maxImages}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />

        <div className="text-center space-y-2 pointer-events-none">
          <Upload className="w-8 h-8 text-muted-foreground mx-auto" />
          <p className="font-semibold text-foreground">Drag images here or click to upload</p>
          <p className="text-sm text-muted-foreground">PNG, JPG, WebP up to 5MB each</p>
        </div>
      </div>

      {/* Image Previews */}
      {previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                <img
                  src={preview || "/placeholder.svg"}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-500/90 hover:bg-red-600 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-1 left-1 bg-background/80 backdrop-blur px-2 py-1 rounded text-xs font-medium text-foreground">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
