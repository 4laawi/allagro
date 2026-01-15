'use client'

import { useState } from 'react'
import { updateOrderStatusAction } from '@/app/(authenticated)/orders/actions'
import { cn } from '@/lib/utils'

interface OrderStatusUpdaterProps {
    id: string
    currentStatus: string
}

export function OrderStatusUpdater({ id, currentStatus }: OrderStatusUpdaterProps) {
    const [status, setStatus] = useState(currentStatus)
    const [loading, setLoading] = useState(false)

    const statuses = [
        { value: 'pending', label: 'Attente', color: 'hover:border-amber-500 hover:text-amber-600', active: 'bg-amber-500 text-white' },
        { value: 'validated', label: 'Validé', color: 'hover:border-blue-500 hover:text-blue-600', active: 'bg-blue-500 text-white' },
        { value: 'delivered', label: 'Livré', color: 'hover:border-emerald-500 hover:text-emerald-600', active: 'bg-emerald-500 text-white' },
    ]

    async function handleStatusChange(newStatus: string) {
        if (newStatus === status) return

        setLoading(true)
        const result = await updateOrderStatusAction(id, newStatus)

        if (!result?.error) {
            setStatus(newStatus)
        }
        setLoading(false)
    }

    return (
        <div className="flex items-center gap-1.5 p-1 bg-slate-100/50 rounded-xl w-fit">
            {statuses.map((s) => (
                <button
                    key={s.value}
                    onClick={() => handleStatusChange(s.value)}
                    disabled={loading}
                    title={s.label}
                    className={cn(
                        "w-8 h-8 flex items-center justify-center text-[11px] font-black uppercase rounded-lg transition-all duration-300",
                        status === s.value
                            ? s.active
                            : "text-slate-400 hover:bg-white " + s.color
                    )}
                >
                    {s.label[0]}
                </button>
            ))}
        </div>
    )
}
