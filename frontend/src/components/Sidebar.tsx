import Link from 'next/link'
import { LayoutDashboard, Briefcase, ShieldAlert, SlidersHorizontal, FileText, BookOpen, Search } from 'lucide-react'

export function Sidebar() {
  return (
    <div className="w-64 border-r border-slate-800 bg-slate-950 flex flex-col h-screen fixed text-slate-300">
      <div className="p-6 border-b border-slate-800 flex items-center justify-between">
        <h1 className="text-xl font-bold text-white tracking-wide">CreditLens</h1>
      </div>
      
      <div className="p-4">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search (⌘K)" 
            className="w-full bg-slate-900 border border-slate-800 rounded-md pl-9 pr-4 py-2 text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        
        <nav className="space-y-1">
          <Link href="/" className="flex items-center px-3 py-2.5 rounded-md hover:bg-slate-900 hover:text-white group transition-colors">
            <LayoutDashboard className="h-5 w-5 mr-3 text-slate-400 group-hover:text-blue-400" />
            <span className="font-medium text-sm">Dashboard</span>
          </Link>
          <Link href="/portfolio" className="flex items-center px-3 py-2.5 rounded-md hover:bg-slate-900 hover:text-white group transition-colors">
            <Briefcase className="h-5 w-5 mr-3 text-slate-400 group-hover:text-blue-400" />
            <span className="font-medium text-sm">Portfolio</span>
          </Link>
          <Link href="/risk" className="flex items-center px-3 py-2.5 rounded-md hover:bg-slate-900 hover:text-white group transition-colors">
            <ShieldAlert className="h-5 w-5 mr-3 text-slate-400 group-hover:text-blue-400" />
            <span className="font-medium text-sm">Risk Intelligence</span>
          </Link>
          <Link href="/policy-studio" className="flex items-center px-3 py-2.5 rounded-md hover:bg-slate-900 hover:text-white group transition-colors">
            <SlidersHorizontal className="h-5 w-5 mr-3 text-slate-400 group-hover:text-blue-400" />
            <span className="font-medium text-sm">Policy Studio</span>
          </Link>
          <Link href="/reports" className="flex items-center px-3 py-2.5 rounded-md hover:bg-slate-900 hover:text-white group transition-colors">
            <FileText className="h-5 w-5 mr-3 text-slate-400 group-hover:text-blue-400" />
            <span className="font-medium text-sm">Reports</span>
          </Link>
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-slate-800">
        <Link href="#" className="flex items-center px-3 py-2 rounded-md hover:bg-slate-900 hover:text-white group transition-colors">
          <BookOpen className="h-4 w-4 mr-3 text-slate-400" />
          <span className="text-sm">Documentation</span>
        </Link>
      </div>
    </div>
  )
}
