"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowLeft, MapPin } from "lucide-react"

export default function MapView() {
  const mapRef = useRef<any>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [L, setL] = useState<any>(null)

  const HYD_LOCALITIES: Record<string, [number, number]> ={
    Gachibowli: [17.4401, 78.3489],
    "Hitech City": [17.4504, 78.3803],
    Madhapur: [17.4457, 78.3914],
    Kondapur: [17.4691, 78.3631],
    Manikonda: [17.4120, 78.3816],
    Miyapur: [17.5009, 78.3570],
    Uppal: [17.4057, 78.5591],
    Secunderabad: [17.4399, 78.4983],
    Kukatpally: [17.4932, 78.3995],
    "Banjara Hills": [17.4167, 78.4274],
    "Jubilee Hills": [17.4323, 78.4070],
  }

  useEffect(() => {
    if (typeof window !== "undefined" && !mapLoaded) {
      const script = document.createElement("script")
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
      script.async = true
      script.onload = () => {
        const css = document.createElement("link")
        css.rel = "stylesheet"
        css.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        document.head.appendChild(css)

        setTimeout(() => initializeMap(), 100)
      }
      document.body.appendChild(script)
    }
  }, [mapLoaded])

  // Initialize Hyderabad Map
  const initializeMap = () => {
    if (typeof window !== "undefined" && (window as any).L) {
      const leaflet = (window as any).L
      setL(leaflet)

      mapRef.current = leaflet
        .map("map")
        .setView([17.3850, 78.4867], 12) // Hyderabad center

      leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(mapRef.current)

      // Add real-time user location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          const userLat = pos.coords.latitude
          const userLng = pos.coords.longitude

          leaflet.marker([userLat, userLng], {
            title: "Your Location",
          }).addTo(mapRef.current)
            .bindPopup(`<b>You are here</b>`)

          mapRef.current.setView([userLat, userLng], 14)
        })
      }

      setMapLoaded(true)
    }
  }

  const moveToLocality = (loc: string) => {
    if (!L || !mapRef.current) return
    const coords = HYD_LOCALITIES[loc]

    mapRef.current.setView(coords, 15)

    L.marker(coords)
      .addTo(mapRef.current)
      .bindPopup(`<b>${loc}</b><br>Hyderabad`)
      .openPopup()
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* LEFT PANEL */}
      <div className="w-64 bg-card border-r border-border p-4 flex flex-col gap-4">
        <Link href="/" className="flex items-center gap-2 hover:opacity-70 transition">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Listings</span>
        </Link>

        <h2 className="font-semibold text-lg">Hyderabad Areas</h2>
        <p className="text-sm text-muted-foreground">
          Select an area to view it on the map.
        </p>

        <div className="flex flex-col gap-2 overflow-y-auto h-[70vh] pr-2">
          {Object.keys(HYD_LOCALITIES).map((loc) => (
            <button
              key={loc}
              onClick={() => moveToLocality(loc)}
              className="w-full text-left px-3 py-2 bg-accent/20 hover:bg-accent rounded-lg text-sm"
            >
              {loc}
            </button>
          ))}
        </div>
      </div>

      {/* MAP CONTAINER */}
      <div className="flex-1 relative">
        <div id="map" className="w-full h-screen" />

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
