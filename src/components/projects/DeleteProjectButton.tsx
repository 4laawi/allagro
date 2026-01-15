'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { deleteProjectAction } from '@/app/(authenticated)/projects/actions'
import { cn } from '@/lib/utils'

interface DeleteProjectButtonProps {
    id: string
    projectTitle: string
}

export function DeleteProjectButton({ id, projectTitle }: DeleteProjectButtonProps) {
    const [isConfirming, setIsConfirming] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleDelete() {
        setLoading(true)
        const result = await deleteProjectAction(id)
        if (result?.error) {
            alert('Erreur lors de la suppression du projet : ' + result.error)
            setLoading(false)
            setIsConfirming(false)
        }
        // revalidatePath will handle the UI update
    }

    if (isConfirming) {
        return (
            <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-2 duration-200">
                <span className="text-[10px] font-bold text-red-600 uppercase">Supprimer {projectTitle} ?</span>
                <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="p-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                >
                    {loading ? (
                        <div className="h-4 w-4 border-2 border-white border-t-transparent animate-spin rounded-full" />
                    ) : (
                        <Trash2 className="h-4 w-4" />
                    )}
                </button>
                <button
                    onClick={() => setIsConfirming(false)}
                    disabled={loading}
                    className="p-1.5 bg-slate-100 text-slate-600 rounded-md hover:bg-slate-200 disabled:opacity-50"
                >
                    <span className="text-xs font-bold px-1">Annuler</span>
                </button>
            </div>
        )
    }

    return (
        <button
            onClick={() => setIsConfirming(true)}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors group"
            title="Supprimer le projet"
        >
            <Trash2 className="h-5 w-5" />
        </button>
    )
}
