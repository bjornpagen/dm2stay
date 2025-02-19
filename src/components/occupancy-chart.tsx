"use client"

import * as React from "react"
import { LineChart, Line, ResponsiveContainer } from "recharts"

export function OccupancyChart() {
  const occupancyData = React.useMemo(
    () =>
      Array.from({ length: 10 }, () => ({
        value: Math.floor(Math.random() * 30) + 60
      })),
    []
  )

  return (
    <React.Fragment>
      <p className="text-sm font-medium mb-1">Occupancy Trend</p>
      <div className="h-12 w-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={occupancyData}>
            <Line
              type="monotone"
              dataKey="value"
              stroke="#4CAF50"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </React.Fragment>
  )
}
