"use client"

import { MoreVertical } from "lucide-react"

interface PreviewProps {
  links: Array<{ id: string; title: string; url: string }>
  background: string
}

export default function Preview({ links, background }: PreviewProps) {
  return (
    <div className={`h-full p-8 relative overflow-y-auto ${background}`}>
      {/* Menu icon */}
      <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-500/20 flex items-center justify-center">
        <MoreVertical className="w-4 h-4 text-gray-600" />
      </button>

      {/* Profile section */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 rounded-full bg-white p-1 mb-4">
          <div className="w-full h-full rounded-full bg-[#5D3891] flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-12 h-12 text-white">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 14l5-5 5 5M4 14v7a2 2 0 002 2h12a2 2 0 002-2v-7"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v16" />
            </svg>
          </div>
        </div>
        <h3 className="text-gray-800 font-medium text-lg">@username</h3>
      </div>

      {/* Links section */}
      <div className="space-y-3">
        {links.map((link) => (
          <div key={link.id} className="relative group">
            <button className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreVertical className="w-4 h-4 text-gray-500" />
            </button>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white shadow-sm text-gray-800 rounded-md py-4 px-6 text-center font-medium hover:shadow-md transition-shadow relative"
            >
              {link.title}
            </a>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {links.length === 0 && <div className="text-center text-gray-500 mt-8">Add links to see them here</div>}
    </div>
  )
}

