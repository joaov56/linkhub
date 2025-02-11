"use client"

import { useState } from "react"
import { LinkForm } from "./components/LinkForm"
import { BackgroundSelector } from "./components/BackgroundSelector"
import Preview from "./components/Preview"


interface Link {
  id: string
  name: string
  link: string
}

export default function Page() {
  const [links, setLinks] = useState<Link[]>([])
  const [selectedBg, setSelectedBg] = useState("solid")

  const addLink = (newLink: Link) => {
    setLinks([...links, newLink])
  }

  const removeLink = (id: string) => {
    setLinks(links.filter((link) => link.id !== id))
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-[#5D3891] text-4xl font-bold mb-8">
          Customize Your <span className="text-[#C1FF72]">LinkHub</span>
        </h1>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-8">
            <LinkForm addLink={addLink} removeLink={removeLink} links={links} />
            <BackgroundSelector selectedBg={selectedBg} setSelectedBg={setSelectedBg} />
          </div>
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="aspect-[9/16] rounded-lg bg-white shadow-sm overflow-hidden">
              <Preview links={links} background={selectedBg} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

