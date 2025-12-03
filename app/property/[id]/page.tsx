"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ImageCarousel } from "@/components/image-carousel"
import { PricePredictor } from "@/components/price-predictor"
import { ArrowLeft, MapPin, Home, Square, Users } from "lucide-react"

export default function PropertyDetail({ params }: { params: { id: string } }) {
  const [showAIPrice, setShowAIPrice] = useState(false)

  const property = {
    id: Number.parseInt(params.id),
    title: "Modern Downtown Penthouse",
    price: 2500000,
    bedrooms: 3,
    bathrooms: 2.5,
    area: 2500,
    location: "Downtown District",
    description:
      "A stunning modern penthouse in the heart of downtown with floor-to-ceiling windows, private rooftop terrace, and smart home automation.",
    images: [
      "/luxury-penthouse-interior.png",
      "/luxurious-penthouse-bedroom.png",
      "/penthouse-living-room.jpg",
      "/luxurious-penthouse-kitchen.png",
    ],
    amenities: ["Smart Home", "Rooftop Terrace", "Wine Cellar", "Home Theater", "Fitness Center", "Concierge"],
    yearBuilt: 2022,
    rating: 4.8,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="flex items-center gap-2 w-fit hover:opacity-70 transition">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Listings</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Carousel */}
            <ImageCarousel images={property.images} />

            {/* Property Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">{property.title}</h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{property.location}</span>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Home className="w-5 h-5 text-blue-500" />
                    <span className="text-sm text-muted-foreground">Bedrooms</span>
                  </div>
                  <p className="text-2xl font-bold">{property.bedrooms}</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-cyan-500" />
                    <span className="text-sm text-muted-foreground">Bathrooms</span>
                  </div>
                  <p className="text-2xl font-bold">{property.bathrooms}</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Square className="w-5 h-5 text-blue-400" />
                    <span className="text-sm text-muted-foreground">Area</span>
                  </div>
                  <p className="text-2xl font-bold">{property.area.toLocaleString()}</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="text-sm text-muted-foreground mb-2">Year Built</div>
                  <p className="text-2xl font-bold">{property.yearBuilt}</p>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h2 className="text-2xl font-bold">About this property</h2>
                <p className="text-muted-foreground leading-relaxed">{property.description}</p>
              </div>

              {/* Amenities */}
              <div className="space-y-3">
                <h2 className="text-2xl font-bold">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.amenities.map((amenity) => (
                    <div key={amenity} className="bg-card border border-border rounded-lg px-4 py-3 text-center">
                      <span className="text-foreground font-medium">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6 sticky top-24">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Listed Price</p>
                  <p className="text-4xl font-bold text-foreground">${(property.price / 1000000).toFixed(1)}M</p>
                </div>

                <Button onClick={() => setShowAIPrice(!showAIPrice)} variant="outline" className="w-full">
                  {showAIPrice ? "Hide AI Prediction" : "Show AI Price Prediction"}
                </Button>

                {showAIPrice && <PricePredictor propertyId={property.id} basePrice={property.price} />}

                <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90 text-white font-semibold">
                  Schedule Tour
                </Button>

                <Button variant="outline" className="w-full bg-transparent">
                  Contact Agent
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
