import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

const themeOptions = [
  { name: "Default", value: "bg-gray-50" },
  { name: "Sunset", value: "bg-gradient-to-r from-orange-400 to-pink-500" },
  { name: "Ocean", value: "bg-gradient-to-r from-blue-400 to-cyan-500" },
  { name: "Forest", value: "bg-gradient-to-r from-green-400 to-emerald-500" },
  { name: "Lavender", value: "bg-gradient-to-r from-purple-400 to-indigo-500" },
  { name: "Cars", value: "bg-[url('/car-background.jpg')] bg-cover" },
  { name: "Nature", value: "bg-[url('/nature-background.jpg')] bg-cover" },
  { name: "City", value: "bg-[url('/city-background.jpg')] bg-cover" },
]

interface BackgroundSelectorProps {
  setBackground: (value: string) => void;
}

export function BackgroundSelector({ setBackground }: BackgroundSelectorProps) {
  const [selectedBackground, setSelectedBackground] = useState("Default")
  const [gradientStart, setGradientStart] = useState("#ffffff")
  const [gradientEnd, setGradientEnd] = useState("#000000")
  const [gradientAngle, setGradientAngle] = useState(90)
  const [solidColor, setSolidColor] = useState("#ffffff")

  const handleThemeChange = (name: string, value: string) => {
    setSelectedBackground(name)
    setBackground(value)
  }

  const handleGradientChange = () => {

    
    const gradientValue = `bg-gradient-to-r from-[${gradientStart}] to-[${gradientEnd}]`

    console.log(gradientValue);
    
    setSelectedBackground("Custom Gradient")
    setBackground(gradientValue)
  }

  const handleSolidColorChange = () => {
    const solidHex = solidColor.replace("#", ""); // Remove o #
    setSelectedBackground("Solid Color")
    setBackground(`bg-[#${solidHex}]`)
  }

  return (
    <div className="mt-8">
      <Tabs defaultValue="themes">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="themes">Themes</TabsTrigger>
          <TabsTrigger value="gradient">Gradient</TabsTrigger>
          <TabsTrigger value="solid">Solid Color</TabsTrigger>
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
                <DropdownMenuItem
                  key={option.name}
                  onClick={() => handleThemeChange(option.name, option.value)}
                >
                  {option.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </TabsContent>
        <TabsContent value="gradient" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Color</Label>
              <Input
                type="color"
                value={gradientStart}
                onChange={(e) => setGradientStart(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>End Color</Label>
              <Input
                type="color"
                value={gradientEnd}
                onChange={(e) => setGradientEnd(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Angle: {gradientAngle}°</Label>
            <Slider
              min={0}
              max={360}
              step={1}
              value={[gradientAngle]}
              onValueChange={(value) => setGradientAngle(value[0])}
            />
          </div>
          <Button onClick={handleGradientChange} className="w-full">
            Apply Gradient
          </Button>
        </TabsContent>
        <TabsContent value="solid" className="space-y-4">
          <div className="space-y-2">
            <Label>Solid Color</Label>
            <Input
              type="color"
              value={solidColor}
              onChange={(e) => setSolidColor(e.target.value)}
            />
          </div>
          <Button onClick={handleSolidColorChange} className="w-full">
            Apply Solid Color
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  )
}