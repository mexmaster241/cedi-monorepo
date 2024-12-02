"use client"

import { useState } from "react"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// Sample data for different time periods
const DATA = {
  daily: [
    { period: "Mon", revenue: 42 },
    { period: "Tue", revenue: 55 },
    { period: "Wed", revenue: 48 },
    { period: "Thu", revenue: 65 },
    { period: "Fri", revenue: 70 },
    { period: "Sat", revenue: 85 },
    { period: "Sun", revenue: 75 },
  ],
  weekly: [
    { period: "Week 1", revenue: 280 },
    { period: "Week 2", revenue: 320 },
    { period: "Week 3", revenue: 350 },
    { period: "Week 4", revenue: 390 },
  ],
  monthly: [
    { period: "Jan", revenue: 125 },
    { period: "Feb", revenue: 148 },
    { period: "Mar", revenue: 172 },
    { period: "Apr", revenue: 189 },
    { period: "May", revenue: 201 },
    { period: "Jun", revenue: 220 },
    { period: "Jul", revenue: 245 },
    { period: "Aug", revenue: 267 },
    { period: "Sep", revenue: 290 },
    { period: "Oct", revenue: 312 },
    { period: "Nov", revenue: 338 },
    { period: "Dec", revenue: 364 },
  ],
  annual: [
    { period: "2020", revenue: 2800 },
    { period: "2021", revenue: 3200 },
    { period: "2022", revenue: 3800 },
    { period: "2023", revenue: 4200 },
    { period: "2024", revenue: 4500 },
  ],
}

interface RevenueChartProps {
  className?: string;
}

export default function RevenueChart({ className }: RevenueChartProps) {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null)
  const [timeFrame, setTimeFrame] = useState("monthly")

  return (
    <div className={`bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-md ${className}`}>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-clash-display text-gray-600 dark:text-gray-400">Ganancias</h3>
          <Select defaultValue={timeFrame} onValueChange={setTimeFrame}>
            <SelectTrigger className="w-[120px] h-8 font-clash-display">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="font-clash-display" value="daily">Daily</SelectItem>
              <SelectItem className="font-clash-display" value="weekly">Weekly</SelectItem>
              <SelectItem className="font-clash-display" value="monthly">Monthly</SelectItem>
              <SelectItem className="font-clash-display" value="annual">Annual</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full h-[150px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={DATA[timeFrame as keyof typeof DATA]}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
              onMouseMove={(data) => {
                if (data.activePayload) {
                  setHoveredValue(data.activePayload[0].value)
                }
              }}
              onMouseLeave={() => setHoveredValue(null)}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis
                dataKey="period"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                tickFormatter={(value) => `$${value}k`}
                width={35}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Revenue
                            </span>
                            <span className="font-clash-display text-muted-foreground">
                              ${payload[0].value}k
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="hsl(var(--primary))"
                strokeWidth={1.5}
                dot={false}
                fill="url(#colorRevenue)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}