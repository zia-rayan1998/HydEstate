"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Search, MapPin, DollarSign } from "lucide-react"

interface SearchBarProps {
  onSearch: (filters: any) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [location, setLocation] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")

  const handleSearch = () => {
    onSearch({
      location,
      minPrice: minPrice ? Number.parseInt(minPrice) : 0,
      maxPrice: maxPrice ? Number.parseInt(maxPrice) : 1000000,
    })
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Location</label>
          <div className="flex items-center gap-2 bg-input border border-border rounded-lg px-3 py-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="City or area"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Min Price</label>
          <div className="flex items-center gap-2 bg-input border border-border rounded-lg px-3 py-2">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Max Price</label>
          <div className="flex items-center gap-2 bg-input border border-border rounded-lg px-3 py-2">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <div className="flex items-end">
          <Button
            onClick={handleSearch}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90 text-white font-semibold"
          >
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
      </div>
    </div>
  )
}
