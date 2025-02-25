"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { EllipsisIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { linktreeApi } from "@/services/api"
import { Textarea } from "@/components/ui/textarea"
import { BackgroundSelector } from "./components/BackgroundSelector"

export default function LinkTree() {
  const [links, setLinks] = useState([{ id: 1, name: "Ata", link: "http://google.com", isActive: true }])
  const [userInfo, setUserInfo] = useState<{ username: string; bio: string }>({
    username: "jaothelink",
    bio: "teste",
  })
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false)
  const [background, setBackground] = useState("bg-gray-50")

  useEffect(() => {
    async function fetchLinks() {
      const { data } = await linktreeApi.get("/links/findByUserId/2692e0c1-a37a-4477-aa61-cc81b33a961f")
      setLinks(data)
    }

    fetchLinks()
  }, [])

  const addLink = async () => {
    const { data } = await linktreeApi.post("/links", {
      title: "",
      link: "",
      icon: "",
    })
    const newLink = {
      id: data.id,
      name: "",
      link: "",
      isActive: true,
    }
    setLinks([...links, newLink])
  }

  const updateLink = async (id: number, field: "name" | "link" | "isActive", value: string | boolean) => {
    const { status } = await linktreeApi.put("/links", {
      id: id,
      [field]: value,
    })

    if (status !== 200) return
    setLinks(links.map((link) => (link.id === id ? { ...link, [field]: value } : link)))
  }

  const removeLink = async (id: number) => {
    const { data } = await linktreeApi.delete(`/links/${id}`)
    console.log(data)

    setLinks(links.filter((link) => link.id !== id))
  }

  const updateUserInfo = async () => {
    const { status } = await linktreeApi.patch("/users/2692e0c1-a37a-4477-aa61-cc81b33a961f", userInfo)

    if (status === 200) {
      setIsEditProfileModalOpen(false)
    }
  }

  useEffect(() => {
    console.log(links)
  }, [links])

  return (
    <div className={`min-h-screen p-4 ${background} bg-fixed`}>
      <div className="mx-auto max-w-2xl">
        <header className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-orange-500">🔥</span>
            <span className="text-sm">Your Linktree is live:</span>
            <Link href="#" className="text-sm text-blue-600 hover:underline">
              linktr.ee/jaothelink
            </Link>
          </div>
          <Button variant="outline">Copy your Linktree URL</Button>
        </header>

        <div className="mb-6 flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-full">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-yellow-400" />
          </div>
          <div>
            <h2 className="font-semibold">@jaothelink</h2>
            <p className="text-sm text-gray-500">teste</p>
          </div>
          <div className="ml-auto">
            <Button variant="ghost" size="icon">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisIcon size={32} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Edit image</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setIsEditProfileModalOpen(true)}>
                    Edit display name and bio
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Button>
          </div>
        </div>

        <Button className="mb-6 w-full bg-purple-600 hover:bg-purple-700" size="lg" onClick={addLink}>
          <span className="mr-2">+</span> Add
        </Button>

        <div className="space-y-4">
          {links.map((link) => (
            <Card key={link.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <Input
                    value={link.name}
                    onChange={(e) => updateLink(link.id, "name", e.target.value)}
                    placeholder="Title"
                    className="text-lg font-medium w-[90%]"
                  />
                  <Switch
                    checked={link.isActive}
                    onCheckedChange={(checked) => updateLink(link.id, "isActive", checked)}
                  />
                </div>
                <Input
                  value={link.link}
                  onChange={(e) => updateLink(link.id, "link", e.target.value)}
                  placeholder="URL"
                  className="text-sm text-gray-600"
                />
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                  <span>0 clicks</span>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => removeLink(link.id)}>
                      🗑️
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={isEditProfileModalOpen} onOpenChange={setIsEditProfileModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader className="flex flex-row items-center justify-between">
              <DialogTitle>Display name and bio</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-500">Profile Title</label>
                <Input
                  defaultValue="@jaothelink"
                  className="bg-gray-50 focus-visible:ring-purple-500"
                  onChange={(e) =>
                    setUserInfo({
                      ...userInfo,
                      username: e.target.value as string,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-500">Bio</label>
                <Textarea
                  className="min-h-[100px] bg-gray-50 focus-visible:ring-purple-500"
                  maxLength={80}
                  onChange={(e) =>
                    setUserInfo({
                      ...userInfo,
                      bio: e.target.value as string,
                    })
                  }
                />
                <div className="text-right text-sm text-gray-500">01 / 80</div>
              </div>
            </div>
            <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={updateUserInfo}>
              Save
            </Button>
          </DialogContent>
        </Dialog>

        <BackgroundSelector setBackground={setBackground} />

        <div className="mt-8 flex justify-end">
          <Button variant="ghost" size="sm">
            Hide Linktree logo
          </Button>
        </div>
      </div>
    </div>
  )
}

