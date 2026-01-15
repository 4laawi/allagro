'use client'

import { useState } from 'react'
import { PlusCircle, X, ShoppingCart, DollarSign } from 'lucide-react'
import { createOrderAction } from '@/app/(authenticated)/orders/actions'

interface AddOrderFormProps {
    clients: { id: string, name: string }[]
}

export function AddOrderForm({ clients }: AddOrderFormProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        setError(null)
        const result = await createOrderAction(formData)

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
                className="inline-flex items-center px-6 py-3 bg-[#FF5A5F] text-white rounded-2xl hover:bg-[#FF4449] transition-all shadow-lg hover:shadow-xl font-black uppercase tracking-widest text-xs"
            >
                <PlusCircle className="w-5 h-5 mr-2" />
                Nouvelle Commande
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
                    <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in duration-300 border border-white/20">
                        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-[#FF5A5F]/5">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[#FF5A5F] rounded-xl">
                                    <ShoppingCart className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-xl font-black text-slate-900">Nouvelle Commande</h3>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form action={handleSubmit} className="p-8 space-y-5">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Client Partenaire</label>
                                <select
                                    name="client_id"
                                    required
                                    className="block w-full px-5 py-4 rounded-2xl border-none bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#FF5A5F]/20 focus:outline-none transition-all text-slate-900 font-bold"
                                >
                                    <option value="">Sélectionnez un client...</option>
                                    {clients.map(client => (
                                        <option key={client.id} value={client.id}>{client.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Désignation du Produit</label>
                                <input
                                    name="product_name"
                                    required
                                    className="block w-full px-5 py-4 rounded-2xl border-none bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#FF5A5F]/20 focus:outline-none transition-all text-slate-900 font-bold placeholder-slate-400"
                                    placeholder="Ex: Pompe à eau, Engrais NPK..."
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Catégorie</label>
                                    <select
                                        name="category"
                                        required
                                        className="block w-full px-5 py-4 rounded-2xl border-none bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#FF5A5F]/20 focus:outline-none transition-all text-slate-900 font-bold"
                                    >
                                        <option value="equipment">🛠️ Matériel</option>
                                        <option value="phytosanitary">🧪 Phytosanitaire</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Quantité</label>
                                    <input
                                        name="quantity"
                                        type="number"
                                        min="1"
                                        defaultValue="1"
                                        required
                                        className="block w-full px-5 py-4 rounded-2xl border-none bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#FF5A5F]/20 focus:outline-none transition-all text-slate-900 font-bold"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Montant Total (Dh)</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        name="total_amount"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        required
                                        className="block w-full pl-12 pr-5 py-4 rounded-2xl border-none bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#FF5A5F]/20 focus:outline-none transition-all text-slate-900 font-bold placeholder-slate-400"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="text-rose-600 text-[11px] font-bold bg-rose-50 p-4 rounded-2xl border border-rose-100 animate-shake">
                                    ⚠️ {error}
                                </div>
                            )}

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="flex-1 py-4 px-4 bg-slate-50 text-slate-500 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-100 transition-all border border-slate-100"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 py-4 px-4 bg-[#FF5A5F] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#FF4449] disabled:opacity-50 transition-all shadow-lg hover:shadow-[#FF5A5F]/30"
                                >
                                    {loading ? 'Traitement...' : 'Enregistrer'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}
