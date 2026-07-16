'use client'

import { useState } from 'react'

export default function Reports() {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleExport = () => {
    setIsGenerating(true)
    
    // Simulate generation delay
    setTimeout(() => {
      setIsGenerating(false)
      // Trigger the browser's native print/save-as-pdf dialog
      window.print()
    }, 1500)
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Reports</h2>
        <p className="text-slate-400">Generate executive deliverables in PDF, CSV, or JSON.</p>
      </div>
      <div className="h-64 rounded-xl border border-dashed border-slate-800 flex items-center justify-center text-slate-500">
        <button 
          onClick={handleExport}
          disabled={isGenerating}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-md font-medium hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating PDF...
            </>
          ) : (
            'Export Executive Report (PDF)'
          )}
        </button>
      </div>
    </div>
  )
}
