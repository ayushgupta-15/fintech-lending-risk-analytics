export default function Risk() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Risk Intelligence</h2>
        <p className="text-slate-400">Interactive heatmaps and risk distribution analysis.</p>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="h-64 rounded-xl border border-dashed border-slate-800 flex items-center justify-center text-slate-500">
          Grade Analysis Chart
        </div>
        <div className="h-64 rounded-xl border border-dashed border-slate-800 flex items-center justify-center text-slate-500">
          DTI Analysis Chart
        </div>
      </div>
    </div>
  )
}
