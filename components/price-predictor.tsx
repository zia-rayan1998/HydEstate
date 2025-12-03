"use client"

import { useState, useEffect } from "react"
import { TrendingUp, Zap } from "lucide-react"

interface PricePredictorProps {
  propertyId: number
  basePrice: number
}

export function PricePredictor({ propertyId, basePrice }: PricePredictorProps) {
  const [predictedPrice, setPredictedPrice] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [confidence, setConfidence] = useState(0)

  useEffect(() => {
    // Simulate AI prediction with Flask backend
    // In production, this would call: GET /api/predict-price?property_id={propertyId}
    const timeout = setTimeout(() => {
      const variance = (Math.random() - 0.5) * 0.15 * basePrice
      const predicted = Math.round(basePrice + variance)
      setPredictedPrice(predicted)
      setConfidence(Math.round(85 + Math.random() * 10))
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timeout)
  }, [propertyId, basePrice])

  if (isLoading) {
    return (
      <div className="space-y-3">
        <div className="h-8 bg-muted rounded animate-pulse" />
        <div className="h-4 bg-muted rounded animate-pulse w-2/3" />
      </div>
    )
  }

  const difference = predictedPrice! - basePrice
  const percentChange = ((difference / basePrice) * 100).toFixed(1)
  const isPositive = difference >= 0

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-3">
      <div className="flex items-center gap-2 mb-3">
        <Zap className="w-4 h-4 text-blue-500" />
        <span className="text-sm font-semibold text-foreground">AI Market Analysis</span>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Predicted Market Price</p>
        <p className="text-3xl font-bold text-foreground">${(predictedPrice! / 1000000).toFixed(2)}M</p>
      </div>

      <div className={`flex items-center gap-2 p-2 rounded-lg ${isPositive ? "bg-green-500/10" : "bg-red-500/10"}`}>
        <TrendingUp className={`w-4 h-4 ${isPositive ? "text-green-500" : "text-red-500"}`} />
        <span className={`font-semibold text-sm ${isPositive ? "text-green-500" : "text-red-500"}`}>
          {isPositive ? "+" : ""}
          {percentChange}% vs listed
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Prediction Confidence</span>
          <span className="font-semibold">{confidence}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${confidence}%` }}
          />
        </div>
      </div>
    </div>
  )
}
