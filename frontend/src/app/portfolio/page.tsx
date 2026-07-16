'use client'

import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

export default function Portfolio() {
  const { data: segments, isLoading: loadingSegments } = useQuery({
    queryKey: ['riskSegments'],
    queryFn: api.getRiskSegments
  })

  const { data: grades, isLoading: loadingGrades } = useQuery({
    queryKey: ['riskGrades'],
    queryFn: api.getRiskGrades
  })

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b', '#10b981', '#06b6d4', '#6366f1']

  const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val)
  const formatPercent = (val: number) => new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(val)

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Portfolio Explorer</h2>
        <p className="text-slate-400">Deep dive into loan segments and distributions.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="col-span-1 h-96 flex flex-col">
          <CardHeader>
            <CardTitle>Grade Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 mt-4">
            {loadingGrades ? (
              <div className="h-full flex items-center justify-center text-slate-500">Loading chart...</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={grades}
                    dataKey="loan_count"
                    nameKey="grade"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                  >
                    {grades?.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-2 flex flex-col">
          <CardHeader>
            <CardTitle>Segment Details</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto">
            {loadingSegments ? (
              <div className="h-full flex items-center justify-center text-slate-500">Loading data...</div>
            ) : (
              <div className="rounded-md border border-slate-800">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-400 uppercase bg-slate-900/50 border-b border-slate-800">
                    <tr>
                      <th className="px-4 py-3 font-medium">Grade</th>
                      <th className="px-4 py-3 font-medium">DTI Band</th>
                      <th className="px-4 py-3 font-medium text-right">Loans</th>
                      <th className="px-4 py-3 font-medium text-right">Funded Vol</th>
                      <th className="px-4 py-3 font-medium text-right">Default Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {segments?.map((row: any, i: number) => (
                      <tr key={i} className="hover:bg-slate-800/20 transition-colors">
                        <td className="px-4 py-3 text-white font-medium">{row.grade}</td>
                        <td className="px-4 py-3 text-slate-300">{row.dti_band}</td>
                        <td className="px-4 py-3 text-slate-300 text-right">{row.loan_count}</td>
                        <td className="px-4 py-3 text-emerald-400 text-right">{formatCurrency(row.funded_amount)}</td>
                        <td className="px-4 py-3 text-rose-400 text-right">{formatPercent(row.default_rate)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
