'use client'

import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, AlertTriangle, CheckCircle2, DollarSign } from 'lucide-react'

export default function Dashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['portfolioSummary'],
    queryFn: api.getPortfolioSummary
  })

  if (isLoading) return <div className="p-8 text-slate-400">Loading dashboard data...</div>
  if (error) return <div className="p-8 text-red-400">Failed to load dashboard data.</div>

  const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 1, notation: 'compact' }).format(val)
  const formatPercent = (val: number) => new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(val)

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
            <div className="text-2xl font-bold text-white">{formatCurrency(data?.total_funded_amount || 0)}</div>
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
            <div className="text-2xl font-bold text-white">{formatCurrency((data?.total_funded_amount || 0) * (data?.avg_default_rate || 0))}</div>
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
            <div className="text-2xl font-bold text-white">{formatPercent(data?.avg_default_rate || 0)}</div>
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
            <div className="text-2xl font-bold text-white">{new Intl.NumberFormat().format(data?.total_loans || 0)}</div>
            <p className="text-xs text-emerald-400 mt-1 flex items-center">
              ▲ 1.2% <span className="text-slate-500 ml-2">from last month</span>
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Placeholder for charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1 h-96 flex flex-col">
          <CardHeader>
            <CardTitle>Monthly Origination Trends</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center text-slate-500 border-t border-slate-800/50 mt-4">
            [ Line Chart: Time vs Volume ]
          </CardContent>
        </Card>
        <Card className="col-span-1 h-96 flex flex-col">
          <CardHeader>
            <CardTitle>Risk Distribution Summary</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center text-slate-500 border-t border-slate-800/50 mt-4">
            [ Bar Chart: Grade vs Default Probability ]
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
