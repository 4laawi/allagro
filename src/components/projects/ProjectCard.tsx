'use client'

import { Calendar, User, Info, CheckCircle2, Briefcase, Map, Flag, ArrowUpRight } from 'lucide-react'
import { Project } from '@/lib/types'
import { StatusUpdater } from './StatusUpdater'
import { DeleteProjectButton } from './DeleteProjectButton'

interface ProjectCardProps {
    project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
    const statusMap: Record<string, { label: string, color: string, icon: React.ComponentType<{ className?: string }> }> = {
        planned: { label: 'Planifié', color: 'bg-slate-100 text-slate-700', icon: Calendar },
        in_progress: { label: 'En cours', color: 'bg-indigo-50 text-indigo-700', icon: CheckCircle2 },
        completed: { label: 'Terminé', color: 'bg-emerald-50 text-emerald-700', icon: CheckCircle2 },
    }

    const priorityMap: Record<string, { label: string, color: string }> = {
        high: { label: 'Haute', color: 'text-rose-600 bg-rose-50 border-rose-100' },
        medium: { label: 'Moyenne', color: 'text-amber-600 bg-amber-50 border-amber-100' },
        low: { label: 'Basse', color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
    }

    const isCompleted = project.status === 'completed'
    const StatusIcon = statusMap[project.status]?.icon || Info
    const priority = priorityMap[project.priority || 'medium']

    return (
        <div className={`bg-white rounded-[2.5rem] shadow-xl border border-slate-100 flex flex-col h-full transition-all duration-300 group overflow-hidden ${isCompleted ? 'grayscale-[0.4] opacity-80 blur-[0.2px] hover:grayscale-0 hover:opacity-100 hover:blur-0 hover:scale-[1.005]' : 'hover:shadow-2xl hover:scale-[1.01]'}`}>
            <div className="p-8 pb-6 relative">
                <div className="flex items-start justify-between gap-4 mb-6">
                    <div className={`p-4 rounded-2xl transition-all duration-300 ${isCompleted ? 'bg-slate-100' : 'bg-indigo-50 group-hover:bg-indigo-600 group-hover:text-white'}`}>
                        <Briefcase className={`h-6 w-6 transition-colors duration-300 ${isCompleted ? 'text-slate-400 group-hover:text-slate-600' : 'text-indigo-600 group-hover:text-white'}`} />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm ${priority.color}`}>
                            <Flag className="w-3 h-3 mr-1.5" />
                            {priority.label}
                        </span>
                        <DeleteProjectButton id={project.id} projectTitle={project.culture_type || ''} />
                    </div>
                </div>

                <div className="space-y-1">
                    <h3 className={`text-xl font-black transition-colors ${isCompleted ? 'text-slate-600 group-hover:text-indigo-600' : 'text-slate-900 group-hover:text-indigo-600'} line-clamp-1`}>{project.culture_type}</h3>
                    <div className="flex items-center text-slate-400 text-sm font-bold">
                        <User className="h-4 w-4 mr-2" />
                        <span>{project.clients?.name}</span>
                    </div>
                </div>
            </div>

            <div className="px-8 flex-1 space-y-6">
                <div className="grid grid-cols-2 gap-6 p-4 bg-slate-50 rounded-3xl">
                    <div className="space-y-1">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Créé le</span>
                        <div className="flex items-center text-slate-900 text-sm font-bold">
                            <Calendar className="h-4 w-4 mr-2 text-slate-400" />
                            {new Date(project.created_at).toLocaleDateString('fr-FR')}
                        </div>
                    </div>
                    {project.surface_area && (
                        <div className="space-y-1 border-l border-slate-200 pl-6">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Surface</span>
                            <div className="flex items-center text-slate-900 text-sm font-bold">
                                <Map className="h-4 w-4 mr-2 text-slate-400" />
                                {project.surface_area} Ha
                            </div>
                        </div>
                    )}
                </div>

                {project.status === 'completed' && project.completed_at && (
                    <div className="p-4 bg-emerald-50 rounded-[1.5rem] border border-emerald-100/50 shadow-inner">
                        <div className="flex items-center text-emerald-800 text-sm">
                            <CheckCircle2 className="h-5 w-5 mr-3 text-emerald-500" />
                            <div>
                                <p className="text-[10px] uppercase font-black tracking-widest leading-none mb-1 opacity-60">Livré le</p>
                                <p className="font-black">{new Date(project.completed_at).toLocaleDateString('fr-FR')}</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="space-y-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">À propos</span>
                    <p className="text-slate-500 text-sm font-medium italic line-clamp-3 leading-relaxed">
                        {project.description || 'Aucune description détaillée.'}
                    </p>
                </div>
            </div>

            <div className={`p-8 mt-auto border-t transition-colors duration-300 ${isCompleted ? 'border-slate-100 bg-slate-50/30' : 'border-slate-50'}`}>
                <StatusUpdater id={project.id} currentStatus={project.status} />
            </div>
        </div>
    )
}
