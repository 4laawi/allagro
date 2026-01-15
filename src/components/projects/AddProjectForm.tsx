'use client'

import { useState } from 'react'
import { PlusCircle, X, Leaf } from 'lucide-react'
import { createProjectAction } from '@/app/(authenticated)/projects/actions'

interface AddProjectFormProps {
    clients: { id: string, name: string }[]
}

export function AddProjectForm({ clients }: AddProjectFormProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        setError(null)
        const result = await createProjectAction(formData)

        if (result?.error) {
            setError(result.error)
            setLoading(false)
        } else {
            setIsOpen(false)
            setLoading(false)
        }
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-sm text-sm font-semibold"
            >
                <PlusCircle className="w-5 h-5 mr-2" />
                Nouveau Projet
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-emerald-50/50">
                            <div className="flex items-center gap-2">
                                <Leaf className="w-5 h-5 text-emerald-600" />
                                <h3 className="text-xl font-bold text-slate-900">Nouveau Projet Agricole</h3>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form action={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Client</label>
                                <select
                                    name="client_id"
                                    required
                                    className="block w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all bg-white text-slate-900"
                                >
                                    <option value="">Sélectionnez un client...</option>
                                    {clients.map(client => (
                                        <option key={client.id} value={client.id}>{client.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Type de culture</label>
                                <input
                                    name="culture_type"
                                    required
                                    className="block w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all bg-white text-slate-900 placeholder-slate-500"
                                    placeholder="Ex: Agrumes, Olives, Maraîchage..."
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Priorité</label>
                                    <select
                                        name="priority"
                                        className="block w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all bg-white text-slate-900"
                                        defaultValue="medium"
                                    >
                                        <option value="low">Basse</option>
                                        <option value="medium">Moyenne</option>
                                        <option value="high">Haute</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Surface (Ha)</label>
                                    <input
                                        name="surface_area"
                                        type="number"
                                        step="0.01"
                                        className="block w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all bg-white text-slate-900 placeholder-slate-500"
                                        placeholder="Ex: 10.5"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Description du projet</label>
                                <textarea
                                    name="description"
                                    rows={3}
                                    className="block w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all bg-white text-slate-900 placeholder-slate-500"
                                    placeholder="Détails de l'étude ou du projet..."
                                />
                            </div>

                            {error && (
                                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border-l-4 border-red-500">
                                    {error}
                                </div>
                            )}

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="flex-1 py-3 px-4 border border-slate-200 text-slate-600 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 py-3 px-4 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 disabled:opacity-50 transition-all shadow-md"
                                >
                                    {loading ? 'Création...' : 'Lancer le projet'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}
