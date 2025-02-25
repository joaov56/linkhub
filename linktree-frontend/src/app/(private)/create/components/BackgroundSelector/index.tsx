"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const themeOptions = [
    { name: "Default", value: "bg-gray-50" },
    { name: "Sunset", value: "bg-gradient-to-r from-orange-400 to-pink-500" },
    { name: "Ocean", value: "bg-gradient-to-r from-blue-400 to-cyan-500" },
    { name: "Forest", value: "bg-gradient-to-r from-green-400 to-emerald-500" },
    { name: "Lavender", value: "bg-gradient-to-r from-purple-400 to-indigo-500" },
    { name: "Fire", value: "bg-gradient-to-r from-red-500 to-yellow-500" },
    { name: "Galaxy", value: "bg-gradient-to-r from-indigo-900 to-purple-700 to-pink-600" },
    { name: "Neon Lights", value: "bg-gradient-to-r from-fuchsia-500 to-blue-500" },
    { name: "Candy", value: "bg-gradient-to-r from-pink-400 to-purple-400 to-yellow-400" },
    { name: "Iceberg", value: "bg-gradient-to-r from-blue-200 to-teal-400" },
    { name: "Midnight", value: "bg-gradient-to-r from-gray-900 to-black" },
    { name: "Cyberpunk", value: "bg-gradient-to-r from-yellow-500 to-fuchsia-500" },
    { name: "Aurora", value: "bg-gradient-to-r from-green-300 to-blue-500 to-purple-600" },
    { name: "Royal", value: "bg-gradient-to-r from-indigo-600 to-purple-800" },
    { name: "Peach", value: "bg-gradient-to-r from-yellow-300 to-orange-400 to-pink-400" },
    { name: "Tropical", value: "bg-gradient-to-r from-lime-400 to-teal-500" },
    { name: "Volcano", value: "bg-gradient-to-r from-red-700 to-orange-600 to-yellow-400" },
    { name: "Metallic", value: "bg-gradient-to-r from-gray-300 to-gray-500 to-gray-700" },
    { name: "Rainbow", value: "bg-gradient-to-r from-red-500 to-orange-500 to-yellow-500 to-green-500 to-blue-500 to-indigo-500 to-purple-500" },
    { name: "Deep Space", value: "bg-gradient-to-r from-black to-indigo-900 to-purple-800" }
  ];
  

interface BackgroundSelectorProps {
  setBackground: (value: string) => void
}

export function BackgroundSelector({ setBackground }: BackgroundSelectorProps) {
  const [selectedBackground, setSelectedBackground] = useState("Default")

  const handleThemeChange = (name: string, value: string) => {
    setSelectedBackground(name)
    setBackground(value)
  }

  return (
    <div className="mt-8">
      <Tabs defaultValue="themes">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="themes">Themes</TabsTrigger>
        </TabsList>
        <TabsContent value="themes">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full">
                {selectedBackground}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {themeOptions.map((option) => (
                <DropdownMenuItem key={option.name} onClick={() => handleThemeChange(option.name, option.value)}>
                  {option.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </TabsContent>

      </Tabs>
    </div>
  )
}

