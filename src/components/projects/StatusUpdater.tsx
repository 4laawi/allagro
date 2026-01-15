'use client'

import { useState } from 'react'
import { updateProjectStatusAction } from '@/app/(authenticated)/projects/actions'
import { cn } from '@/lib/utils'

interface StatusUpdaterProps {
    id: string
    currentStatus: string
}

export function StatusUpdater({ id, currentStatus }: StatusUpdaterProps) {
    const [status, setStatus] = useState(currentStatus)
    const [loading, setLoading] = useState(false)

    const statuses = [
        { value: 'planned', label: 'Planifié', index: 0 },
        { value: 'in_progress', label: 'En cours', index: 1 },
        { value: 'completed', label: 'Terminé', index: 2 },
    ]

    const currentIndex = statuses.find(s => s.value === status)?.index ?? 0

    async function handleStatusChange(newStatus: string) {
        if (newStatus === status || loading) return

        setLoading(true)
        const result = await updateProjectStatusAction(id, newStatus)

        if (!result?.error) {
            setStatus(newStatus)
        }
        setLoading(false)
    }

    return (
        <div className="w-full space-y-4">
            <div className="flex items-center justify-between px-0.5">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Progression du projet</span>
                <span className={cn(
                    "text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border shadow-sm transition-all duration-300",
                    status === 'completed' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-indigo-50 text-indigo-600 border-indigo-100"
                )}>
                    {statuses[currentIndex].label}
                </span>
            </div>

            <div className="relative group/segments">
                {/* Background Track */}
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden flex relative border border-slate-200/50 shadow-inner">
                    {/* Active Progress Fill */}
                    <div
                        className={cn(
                            "absolute top-0 left-0 h-full transition-all duration-700 ease-in-out z-0",
                            status === 'completed' ? "bg-emerald-500" : "bg-indigo-600"
                        )}
                        style={{ width: `${((currentIndex + 1) / statuses.length) * 100}%` }}
                    />

                    {/* Tick markers */}
                    <div className="absolute inset-0 flex justify-evenly pointer-events-none">
                        <div className="w-px h-full bg-black/5 z-10" />
                        <div className="w-px h-full bg-black/5 z-10" />
                    </div>
                </div>

                {/* Invisible Clickable Segments */}
                <div className="absolute -inset-1 flex z-20">
                    {statuses.map((s) => (
                        <button
                            key={s.value}
                            onClick={() => handleStatusChange(s.value)}
                            disabled={loading}
                            className="flex-1 cursor-pointer group/seg relative"
                            title={`Changer en : ${s.label}`}
                        >
                            <div className="absolute inset-0 opacity-0 group-hover/seg:opacity-10 dark:group-hover/seg:opacity-20 bg-white transition-opacity rounded-sm" />
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex justify-between px-0.5">
                {statuses.map((s, idx) => (
                    <button
                        key={s.value}
                        onClick={() => handleStatusChange(s.value)}
                        disabled={loading}
                        className={cn(
                            "text-[9px] font-black uppercase tracking-tighter transition-all duration-300 flex flex-col items-center gap-1",
                            idx <= currentIndex
                                ? (status === 'completed' ? "text-emerald-600" : "text-indigo-600")
                                : "text-slate-400 hover:text-slate-600"
                        )}
                    >
                        <span>{s.label}</span>
                        <div className={cn(
                            "w-1 h-1 rounded-full transition-all duration-300",
                            idx === currentIndex
                                ? (status === 'completed' ? "bg-emerald-600 scale-150" : "bg-indigo-600 scale-150")
                                : "bg-transparent"
                        )} />
                    </button>
                ))}
            </div>
        </div>
    )
}
