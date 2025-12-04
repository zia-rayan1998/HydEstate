"use client"

import { useState } from "react"
import Link from "next/link"
import { PropertyCard } from "@/components/property-card"
import { SearchBar } from "@/components/search-bar"
import { Button } from "@/components/ui/button"
import { MapPin, LogOut } from "lucide-react"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [searchFilters, setSearchFilters] = useState({ location: "", minPrice: 0, maxPrice: 1000000 })

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
  }

  // Mock property data
  const properties = [
    {
      id: 1,
      title: "Modern Downtown Penthouse",
      price: 2500000,
      bedrooms: 3,
      bathrooms: 2.5,
      area: 2500,
      image: "/luxury-penthouse.png",
      location: "Downtown District",
      rating: 4.8,
    },
    {
      id: 2,
      title: "Waterfront Villa",
      price: 1800000,
      bedrooms: 4,
      bathrooms: 3,
      area: 3200,
      image: "/waterfront-villa.jpg",
      location: "Coastal Area",
      rating: 4.9,
    },
    {
      id: 3,
      title: "Contemporary Urban Loft",
      price: 950000,
      bedrooms: 2,
      bathrooms: 2,
      area: 1400,
      image: "/modern-loft.png",
      location: "Arts District",
      rating: 4.7,
    },
    {
      id: 4,
      title: "Luxury Garden Estate",
      price: 3200000,
      bedrooms: 5,
      bathrooms: 4,
      area: 4500,
      image: "/luxury-estate-garden.jpg",
      location: "Suburban Hills",
      rating: 4.9,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">HydEstate</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/map">
                <Button variant="ghost" size="sm">
                  Map View
                </Button>
              </Link>
              <Link href="/property/create">
                <Button size="sm" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90">
                  List Property
                </Button>
              </Link>
              <Link href="/property/predict">
                <Button size="sm" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90">
                  prediction
                </Button>
              </Link>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent text-accent-foreground hover:opacity-90 transition"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              ) : (
                <Link href="/auth/login">
                  <Button size="sm" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90">
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance">
              Find Your{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Dream Property
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover premium properties with AI-powered price predictions and interactive maps. Your perfect home
              awaits.
            </p>
          </div>

          {/* Search Bar */}
          <SearchBar onSearch={setSearchFilters} />
        </div>
      </section>

      {/* Featured Properties */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Featured Properties</h2>
            <p className="text-muted-foreground mt-2">Handpicked luxury properties available now</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
