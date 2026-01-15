import { createClient } from '@/lib/supabase/server'
import { PlusCircle, Search, Phone, MapPin, User } from 'lucide-react'
import { AddClientForm } from '@/components/clients/AddClientForm'

async function getClients() {
    const supabase = await createClient()
    const { data: clients } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false })

    return clients || []
}

export default async function ClientsPage() {
    const clients = await getClients()

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Gestion des Clients</h1>
                    <p className="text-slate-500">Consultez et gérez la liste de vos clients agricoles.</p>
                </div>
                <AddClientForm />
            </div>

            {/* Clients Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Client</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Téléphone</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Région</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date d'Ajout</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {clients.length > 0 ? (
                                clients.map((client: any) => (
                                    <tr key={client.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="h-9 w-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold mr-3">
                                                    <User className="h-5 w-5" />
                                                </div>
                                                <span className="font-medium text-slate-900">{client.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center text-slate-600">
                                                <Phone className="h-4 w-4 mr-2" />
                                                {client.phone || 'Non renseigné'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center text-slate-600">
                                                <MapPin className="h-4 w-4 mr-2" />
                                                {client.region || 'Non renseigné'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500">
                                            {new Date(client.created_at).toLocaleDateString('fr-FR')}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic">
                                        Aucun client enregistré pour le moment.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
