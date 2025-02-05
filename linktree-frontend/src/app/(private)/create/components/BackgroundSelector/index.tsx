"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface BackgroundSelectorProps {
  selectedBg: string
  setSelectedBg: (bg: string) => void
}

export function BackgroundSelector({ selectedBg, setSelectedBg }: BackgroundSelectorProps) {
  const [customColor1, setCustomColor1] = useState("#5D3891")
  const [customColor2, setCustomColor2] = useState("#C1FF72")
  const [patternSize, setPatternSize] = useState("20")
  const [patternColor, setPatternColor] = useState("#C1FF72")

  const backgrounds = [
    { id: "solid", name: "Solid Color", class: `bg-[${customColor1}]` },
    { id: "gradient", name: "Gradient", class: `bg-gradient-to-br from-[${customColor1}] to-[${customColor2}]` },
    {
      id: "pattern",
      name: "Dot Pattern",
      class: `bg-[${customColor1}] bg-opacity-95 bg-[radial-gradient(${patternColor}_1px,transparent_1px)] bg-[size:${patternSize}px_${patternSize}px]`,
    },
  ]

  const handleBackgroundChange = (bgId: string) => {
    setSelectedBg(bgId)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-[#5D3891]">Customize Background</h2>
      <div className="grid grid-cols-3 gap-4">
        {backgrounds.map((bg) => (
          <button
            key={bg.id}
            onClick={() => handleBackgroundChange(bg.id)}
            className={`${bg.class} relative h-24 rounded-lg border-2 transition-all ${
              selectedBg === bg.id ? "border-[#C1FF72] ring-2 ring-[#C1FF72]/20" : "border-gray-200"
            }`}
          >
            {selectedBg === bg.id && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/20">
                <Check className="h-6 w-6 text-[#C1FF72]" />
              </div>
            )}
          </button>
        ))}
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full">
            Customize Colors
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="customColor1">Primary Color</Label>
              <Input
                id="customColor1"
                type="color"
                value={customColor1}
                onChange={(e) => setCustomColor1(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customColor2">Secondary Color (for gradient)</Label>
              <Input
                id="customColor2"
                type="color"
                value={customColor2}
                onChange={(e) => setCustomColor2(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="patternColor">Pattern Color</Label>
              <Input
                id="patternColor"
                type="color"
                value={patternColor}
                onChange={(e) => setPatternColor(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="patternSize">Pattern Size</Label>
              <Input
                id="patternSize"
                type="range"
                min="5"
                max="50"
                value={patternSize}
                onChange={(e) => setPatternSize(e.target.value)}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

