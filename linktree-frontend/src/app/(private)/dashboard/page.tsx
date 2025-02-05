"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, Line, LineChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, MousePointerClick, Users } from "lucide-react"

const viewsData = [
  { date: "Jan 1", views: 200 },
  { date: "Jan 2", views: 300 },
  { date: "Jan 3", views: 400 },
  { date: "Jan 4", views: 350 },
  { date: "Jan 5", views: 500 },
  { date: "Jan 6", views: 450 },
  { date: "Jan 7", views: 550 },
]

const linkClicksData = [
  { name: "Instagram", clicks: 120 },
  { name: "YouTube", clicks: 80 },
  { name: "Twitter", clicks: 60 },
  { name: "TikTok", clicks: 90 },
  { name: "Website", clicks: 40 },
]

export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-brand-purple">Analytics Dashboard</h1>
        <Tabs defaultValue="7d" className="w-[200px]">
          <TabsList>
            <TabsTrigger value="7d">7d</TabsTrigger>
            <TabsTrigger value="30d">30d</TabsTrigger>
            <TabsTrigger value="90d">90d</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,750</div>
            <p className="text-xs text-muted-foreground">+20.1% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">390</div>
            <p className="text-xs text-muted-foreground">+15.5% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,840</div>
            <p className="text-xs text-muted-foreground">+7.2% from last week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Views Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                views: {
                  label: "Views",
                  color: "hsl(var(--brand-purple))",
                },
              }}
              className="h-[300px]"
            >
              <LineChart
                data={viewsData}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 0,
                }}
              >
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="views"
                  strokeWidth={2}
                  activeDot={{
                    r: 6,
                    style: { fill: "#4B0082" },
                  }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Link Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                clicks: {
                  label: "Clicks",
                  color: "hsl(var(--brand-purple))",
                },
              }}
              className="h-[300px]"
            >
              <BarChart
                data={linkClicksData}
                layout="vertical"
                margin={{
                  top: 5,
                  right: 10,
                  left: 70,
                  bottom: 0,
                }}
              >
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="clicks" radius={[4, 4, 4, 4]} fill="#4B0082" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

