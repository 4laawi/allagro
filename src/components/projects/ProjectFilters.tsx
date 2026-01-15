'use client'

import { Search, Filter, ChevronDown } from 'lucide-react'

interface ProjectFiltersProps {
    searchQuery: string
    setSearchQuery: (query: string) => void
    statusFilter: string
    setStatusFilter: (status: string) => void
    priorityFilter: string
    setPriorityFilter: (priority: string) => void
}

export function ProjectFilters({
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter
}: ProjectFiltersProps) {
    return (
        <div className="bg-white p-2 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col lg:flex-row gap-2">
            <div className="flex-1 relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                    type="text"
                    placeholder="Rechercher un projet ou client..."
                    className="w-full pl-12 pr-4 py-4 rounded-[1.5rem] border-transparent bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/20 text-sm font-medium transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative group">
                    <select
                        className="w-full lg:w-48 appearance-none pl-4 pr-10 py-4 rounded-[1.5rem] border-transparent bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/20 text-sm font-bold text-slate-700 transition-all cursor-pointer"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="all">Tous les statuts</option>
                        <option value="planned">Planifié</option>
                        <option value="in_progress">En cours</option>
                        <option value="completed">Terminé</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none group-focus-within:text-indigo-500 transition-colors" />
                </div>

                <div className="relative group">
                    <select
                        className="w-full lg:w-48 appearance-none pl-4 pr-10 py-4 rounded-[1.5rem] border-transparent bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/20 text-sm font-bold text-slate-700 transition-all cursor-pointer"
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                    >
                        <option value="all">Toutes les priorités</option>
                        <option value="high">Haute</option>
                        <option value="medium">Moyenne</option>
                        <option value="low">Basse</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none group-focus-within:text-indigo-500 transition-colors" />
                </div>
            </div>
        </div>
    )
}
