'use client'

import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

export default function Risk() {
  const { data: grades, isLoading: loadingGrades } = useQuery({
    queryKey: ['riskGrades'],
    queryFn: api.getRiskGrades
  })

  const { data: dti, isLoading: loadingDti } = useQuery({
    queryKey: ['riskDti'],
    queryFn: api.getRiskDti
  })

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Risk Intelligence</h2>
        <p className="text-slate-400">Interactive distribution analysis of portfolio risk components.</p>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <Card className="col-span-1 h-96 flex flex-col">
          <CardHeader>
            <CardTitle>Grade vs Default Probability</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 mt-4">
            {loadingGrades ? (
              <div className="h-full flex items-center justify-center text-slate-500">Loading chart...</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={grades} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="grade" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
                  <Tooltip cursor={{ fill: '#334155' }} contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }} formatter={(value: number) => [`${(value * 100).toFixed(2)}%`, 'Default Rate']} />
                  <Bar dataKey="avg_default_rate" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-1 h-96 flex flex-col">
          <CardHeader>
            <CardTitle>DTI Band vs Default Probability</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 mt-4">
            {loadingDti ? (
              <div className="h-full flex items-center justify-center text-slate-500">Loading chart...</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dti} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <XAxis dataKey="dti_band" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} angle={-25} textAnchor="end" />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }} formatter={(value: number) => [`${(value * 100).toFixed(2)}%`, 'Default Rate']} />
                  <Line type="monotone" dataKey="avg_default_rate" stroke="#eab308" strokeWidth={3} dot={{ r: 4, fill: '#eab308' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
