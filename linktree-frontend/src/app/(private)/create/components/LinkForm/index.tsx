"use client"

import { useState } from "react"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { linktreeApi } from "@/services/api"


interface Link {
  id: string
  name: string
  link: string
}

interface LinkFormProps {
  addLink: (link: Link) => void
  removeLink: (id: string) => void
  links: Link[]
}

export function LinkForm({ addLink, removeLink, links }: LinkFormProps) {
  const [name, setName] = useState<string>("")
  const [link, setLink] = useState<string>("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (name && link) {
      addLink({ id: Date.now().toString(), name, link })
      const { data } = await linktreeApi.post('/links', {name, link, icon: ''})

      console.log(data);
      
      setName("")
      setLink("")
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-[#5D3891]">Add Links</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-700">
              Link Title
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter link title"
              className="border-gray-200 focus:border-[#5D3891] focus:ring-[#C1FF72]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url" className="text-gray-700">
              URL
            </Label>
            <Input
              id="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://"
              className="border-gray-200 focus:border-[#5D3891] focus:ring-[#C1FF72]"
            />
          </div>
          <Button type="submit" className="w-full bg-[#5D3891] text-[#C1FF72] hover:bg-[#5D3891]/90">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Link
          </Button>
        </form>
      </div>

      <div className="space-y-4">
        {links.map((link) => (
          <div
            key={link.id}
            className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-[#C1FF72]"
          >
            <div>
              <h3 className="font-medium text-[#5D3891]">{link.name}</h3>
              <p className="text-sm text-gray-500">{link.link}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeLink(link.id)}
              className="text-[#5D3891] hover:text-[#C1FF72] hover:bg-[#5D3891]"
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

