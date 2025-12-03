"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function MapView() {
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    // Load Leaflet dynamically
    if (typeof window !== "undefined" && !mapLoaded) {
      const script = document.createElement("script")
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
      script.async = true
      script.onload = () => {
        const link = document.createElement("link")
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        link.rel = "stylesheet"
        document.head.appendChild(link)

        setTimeout(() => {
          initializeMap()
        }, 100)
      }
      document.body.appendChild(script)
    }
  }, [mapLoaded])

  const initializeMap = () => {
    if (typeof window !== "undefined" && (window as any).L) {
      const L = (window as any).L
      const map = L.map("map").setView([40.7128, -74.006], 13)

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map)

      // Add sample markers for properties
      const properties = [
        { lat: 40.7128, lng: -74.006, title: "Downtown Penthouse", price: "$2.5M" },
        { lat: 40.7489, lng: -73.968, title: "Waterfront Villa", price: "$1.8M" },
        { lat: 40.7614, lng: -73.9776, title: "Urban Loft", price: "$950K" },
      ]

      properties.forEach((property) => {
        const marker = L.marker([property.lat, property.lng]).addTo(map)
        marker.bindPopup(`<b>${property.title}</b><br/>${property.price}`)
      })

      setMapLoaded(true)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="flex items-center gap-2 w-fit hover:opacity-70 transition">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Listings</span>
          </Link>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative w-full h-[calc(100vh-80px)]">
        <div id="map" className="w-full h-full" />
        <style jsx global>{`
          #map {
            background-color: #0f172a;
          }
          .leaflet-container {
            background-color: #0f172a !important;
          }
          .leaflet-popup-content-wrapper {
            background-color: #1e293b;
            color: #e2e8f0;
            border-radius: 8px;
            border: 1px solid #334155;
          }
          .leaflet-popup-tip {
            background-color: #1e293b;
            border: 1px solid #334155;
          }
        `}</style>
      </div>
    </div>
  )
}
