"use client"

import Link from "next/link"
import { Star, MapPin, Home, Square } from "lucide-react"

interface Property {
  id: number
  title: string
  price: number
  bedrooms: number
  bathrooms: number
  area: number
  image: string
  location: string
  rating: number
}

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/property/${property.id}`}>
      <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 transform">
        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden bg-muted">
          <img
            src={property.image || "/placeholder.svg"}
            alt={property.title}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3 bg-background/90 backdrop-blur rounded-lg px-3 py-1 flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-foreground">{property.rating}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <h3 className="font-bold text-lg text-foreground line-clamp-2">{property.title}</h3>

          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <MapPin className="w-4 h-4" />
            <span>{property.location}</span>
          </div>

          <div className="flex gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Home className="w-4 h-4" />
              <span>{property.bedrooms} bed</span>
            </div>
            <div className="flex items-center gap-1">
              <Square className="w-4 h-4" />
              <span>{property.area.toLocaleString()} sqft</span>
            </div>
          </div>

          <div className="pt-3 border-t border-border">
            <p className="text-2xl font-bold text-foreground">${(property.price / 1000000).toFixed(1)}M</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
