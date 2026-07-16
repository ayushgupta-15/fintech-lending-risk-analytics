'use client'

import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, AlertTriangle, CheckCircle2, DollarSign } from 'lucide-react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Area, AreaChart } from 'recharts'

export default function Dashboard() {
  const { data: summary, isLoading: loadingSummary } = useQuery({
    queryKey: ['portfolioSummary'],
    queryFn: api.getPortfolioSummary
  })

  const { data: grades } = useQuery({
    queryKey: ['riskGrades'],
    queryFn: api.getRiskGrades
  })

  const { data: dti } = useQuery({
    queryKey: ['riskDti'],
    queryFn: api.getRiskDti
  })

  if (loadingSummary) return <div className="p-8 text-slate-400">Loading dashboard data...</div>

  const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 1, notation: 'compact' }).format(val)
  const formatPercent = (val: number) => new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(val)

  // Mock trend data since we don't have time series in the warehouse yet
  const trendData = [
    { month: 'Jan', volume: 1200000 },
    { month: 'Feb', volume: 1800000 },
    { month: 'Mar', volume: 1500000 },
    { month: 'Apr', volume: 2200000 },
    { month: 'May', volume: 2800000 },
    { month: 'Jun', volume: 3100000 },
  ]

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Portfolio Health</h2>
        <p className="text-slate-400">Executive overview of credit risk and lending performance.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{formatCurrency(summary?.total_funded_amount || 0)}</div>
            <p className="text-xs text-emerald-400 mt-1 flex items-center">
              ▲ 2.3% <span className="text-slate-500 ml-2">from last month</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Expected Loss</CardTitle>
            <AlertTriangle className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{formatCurrency(summary?.expected_loss || 0)}</div>
            <p className="text-xs text-emerald-400 mt-1 flex items-center">
              ▼ 5.0% <span className="text-slate-500 ml-2">from last month</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Default Rate</CardTitle>
            <Activity className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{formatPercent(summary?.default_rate || 0)}</div>
            <p className="text-xs text-emerald-400 mt-1 flex items-center">
              ▼ 0.18% <span className="text-slate-500 ml-2">from last month</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Total Loans</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{new Intl.NumberFormat().format(summary?.total_loans || 0)}</div>
            <p className="text-xs text-emerald-400 mt-1 flex items-center">
              ▲ 1.2% <span className="text-slate-500 ml-2">from last month</span>
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1 h-96 flex flex-col">
          <CardHeader>
            <CardTitle>Monthly Origination Trends</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value / 1000000}M`} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }} />
                <Area type="monotone" dataKey="volume" stroke="#3b82f6" fillOpacity={1} fill="url(#colorVolume)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1 h-96 flex flex-col">
          <CardHeader>
            <CardTitle>Risk Distribution by Grade</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 mt-4">
            {grades ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={grades} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="grade" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
                  <Tooltip cursor={{ fill: '#334155' }} contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }} />
                  <Bar dataKey="loan_count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-500">Loading chart...</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
