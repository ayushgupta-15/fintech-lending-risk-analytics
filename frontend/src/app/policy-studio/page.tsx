'use client'

import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, RefreshCw, AlertCircle } from 'lucide-react'

export default function PolicyStudio() {
  const [minGrade, setMinGrade] = useState('C')
  const [maxDti, setMaxDti] = useState(30)
  const [minIncome, setMinIncome] = useState(50000)
  const [maxLoan, setMaxLoan] = useState(25000)

  const baselineQuery = useQuery({
    queryKey: ['portfolioSummary'],
    queryFn: api.getPortfolioSummary
  })

  const simulationMutation = useMutation({
    mutationFn: api.simulatePolicy
  })

  const runSimulation = () => {
    simulationMutation.mutate({
      min_grade: minGrade,
      max_dti: maxDti,
      min_income: minIncome,
      max_loan: maxLoan
    })
  }

  // formatters
  const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 1, notation: 'compact' }).format(val)
  const formatPercent = (val: number) => new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(val / 100)
  const formatDelta = (val: number, isPercent = false, invertColors = false) => {
    const formatted = isPercent ? formatPercent(val) : formatCurrency(Math.abs(val))
    const isPositive = val > 0
    const isNegative = val < 0
    
    // For metrics like Loss or Default Rate, positive delta is BAD (red), negative delta is GOOD (emerald)
    // For Approval Rate or Revenue, positive delta is GOOD (emerald), negative delta is BAD (red)
    let colorClass = "text-slate-400"
    if (isPositive) colorClass = invertColors ? "text-red-400" : "text-emerald-400"
    if (isNegative) colorClass = invertColors ? "text-emerald-400" : "text-red-400"

    const sign = isPositive ? "+" : (isNegative ? "-" : "")

    return <span className={colorClass}>{sign}{formatted}</span>
  }

  const simData = simulationMutation.data
  const baseData = baselineQuery.data

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Policy Studio</h2>
        <p className="text-slate-400">Simulate credit policies against historical portfolio data to forecast impact.</p>
      </div>

      <div className="grid xl:grid-cols-3 gap-8">
        
        {/* Left: Inputs */}
        <Card className="xl:col-span-1 h-fit">
          <CardHeader>
            <CardTitle>Policy Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Minimum Acceptable Grade</label>
              <select 
                className="w-full bg-slate-950 border border-slate-800 rounded-md p-2 text-white outline-none focus:border-blue-500"
                value={minGrade}
                onChange={e => setMinGrade(e.target.value)}
              >
                {['A','B','C','D','E','F','G'].map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Maximum DTI (%)</label>
              <div className="flex items-center gap-4">
                <input 
                  type="range" min="10" max="50" step="1" 
                  value={maxDti} onChange={e => setMaxDti(Number(e.target.value))}
                  className="w-full"
                />
                <span className="w-12 text-right font-mono text-sm">{maxDti}%</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Minimum Income ($)</label>
              <input 
                type="number" step="1000"
                className="w-full bg-slate-950 border border-slate-800 rounded-md p-2 text-white outline-none focus:border-blue-500"
                value={minIncome} onChange={e => setMinIncome(Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Maximum Loan Amount ($)</label>
              <input 
                type="number" step="1000"
                className="w-full bg-slate-950 border border-slate-800 rounded-md p-2 text-white outline-none focus:border-blue-500"
                value={maxLoan} onChange={e => setMaxLoan(Number(e.target.value))}
              />
            </div>

            <button 
              onClick={runSimulation}
              disabled={simulationMutation.isPending}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 px-4 rounded-md transition-colors flex items-center justify-center gap-2 mt-4"
            >
              {simulationMutation.isPending ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Activity className="h-4 w-4" />}
              Run Simulation
            </button>
          </CardContent>
        </Card>

        {/* Right: Outputs */}
        <div className="xl:col-span-2 space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-slate-400">Approval Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {simData ? formatPercent(simData.approval_rate) : '--'}
                </div>
                <div className="text-xs mt-1">
                  {simData && baseData ? formatDelta((simData.approval_rate) - 100, true, false) : <span className="text-slate-600">Delta</span>}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-slate-400">Portfolio Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {simData ? formatCurrency(simData.portfolio_value) : '--'}
                </div>
                <div className="text-xs mt-1">
                  {simData && baseData ? formatDelta(simData.portfolio_value - baseData.total_funded_amount, false, false) : <span className="text-slate-600">Delta</span>}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-slate-400">Expected Loss</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {simData ? formatCurrency(simData.expected_loss) : '--'}
                </div>
                <div className="text-xs mt-1">
                  {simData && baseData ? formatDelta(simData.expected_loss - (baseData.total_funded_amount * baseData.avg_default_rate), false, true) : <span className="text-slate-600">Delta</span>}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-slate-400">Expected Default Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {simData ? formatPercent(simData.expected_default) : '--'}
                </div>
                <div className="text-xs mt-1">
                  {simData && baseData ? formatDelta((simData.expected_default) - (baseData.avg_default_rate * 100), true, true) : <span className="text-slate-600">Delta</span>}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommendation Card */}
          {simData ? (
            <Card className="border-blue-900/30 bg-blue-950/10 shadow-lg">
              <CardHeader className="border-b border-slate-800/50 pb-4 bg-slate-900/20 rounded-t-xl">
                <CardTitle className="flex items-center text-blue-400">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Intelligence Recommendation
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Risk Level</h4>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-900/30 text-emerald-400 border border-emerald-800">
                      {simData.recommendation.includes("Tighten") ? "High" : simData.recommendation.includes("Relax") ? "Low" : "Balanced"}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Confidence Score</h4>
                    <span className="text-white font-medium text-lg">92%</span>
                  </div>
                  <div className="md:col-span-3 pt-4 border-t border-slate-800/50">
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Suggested Action</h4>
                    <p className="text-slate-200 text-sm leading-relaxed">{simData.recommendation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="h-64 rounded-xl border border-dashed border-slate-800 flex items-center justify-center text-slate-500">
              Run a simulation to generate intelligence recommendations.
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
