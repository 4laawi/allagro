'use client'

import { Briefcase, Clock, CheckCircle2, TrendingUp } from 'lucide-react'

import { Project } from '@/lib/types'

interface ProjectStatsProps {
    projects: Project[]
}

export function ProjectStats({ projects }: ProjectStatsProps) {
    const total = projects.length
    const active = projects.filter(p => p.status === 'in_progress' || p.status === 'planned').length
    const completed = projects.filter(p => p.status === 'completed').length
    const completedRate = total > 0 ? Math.round((completed / total) * 100) : 0

    const stats = [
        { label: 'Total Projets', value: total, icon: Briefcase, color: 'bg-indigo-600', textColor: 'text-white', sub: 'Toutes les cultures' },
        { label: 'Actifs', value: active, icon: Clock, color: 'bg-amber-500', textColor: 'text-white', sub: 'Planifiés & En cours' },
        { label: 'Terminés', value: completed, icon: CheckCircle2, color: 'bg-emerald-600', textColor: 'text-white', sub: 'Projets clôturés' },
        { label: 'Réussite', value: `${completedRate}%`, icon: TrendingUp, color: 'bg-white', textColor: 'text-slate-900', sub: 'Taux de livraison' },
    ]

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className={`${stat.color} ${stat.textColor} p-6 rounded-[2rem] border ${stat.color === 'bg-white' ? 'border-slate-100 shadow-sm' : 'border-transparent shadow-lg'} relative overflow-hidden group hover:scale-[1.02] transition-all`}
                >
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-2 rounded-xl ${stat.color === 'bg-white' ? 'bg-slate-50' : 'bg-white/20'}`}>
                                <stat.icon className={`h-5 w-5 ${stat.color === 'bg-white' ? 'text-indigo-600' : 'text-white'}`} />
                            </div>
                        </div>
                        <div>
                            <p className={`text-xs font-bold uppercase tracking-widest ${stat.color === 'bg-white' ? 'text-slate-400' : 'text-white/70'}`}>{stat.label}</p>
                            <h3 className="text-3xl font-black mt-1 leading-none">{stat.value}</h3>
                            <p className={`text-[10px] mt-2 font-medium ${stat.color === 'bg-white' ? 'text-slate-400' : 'text-white/60'}`}>{stat.sub}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
