export default function Reports() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Reports</h2>
        <p className="text-slate-400">Generate executive deliverables in PDF, CSV, or JSON.</p>
      </div>
      <div className="h-64 rounded-xl border border-dashed border-slate-800 flex items-center justify-center text-slate-500">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-500 transition-colors">
          Export Executive Report (PDF)
        </button>
      </div>
    </div>
  )
}
