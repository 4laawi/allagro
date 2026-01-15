import { createClient } from '@/lib/supabase/server'
import { PlusCircle, ShoppingCart, Package, User, Calendar, CheckCircle2, Clock, Truck, MoreHorizontal, DollarSign } from 'lucide-react'
import { AddOrderForm } from '@/components/orders/AddOrderForm'
import { OrderStatusUpdater } from '@/components/orders/OrderStatusUpdater'
import { OrderStats } from '@/components/orders/OrderStats'
import { cn } from '@/lib/utils'

async function getOrders() {
    const supabase = await createClient()
    const { data: orders } = await supabase
        .from('orders')
        .select('*, clients(name)')
        .order('created_at', { ascending: false })

    return orders || []
}

async function getClients() {
    const supabase = await createClient()
    const { data: clients } = await supabase
        .from('clients')
        .select('id, name')
        .order('name')

    return clients || []
}

export default async function OrdersPage() {
    const [orders, clients] = await Promise.all([getOrders(), getClients()])

    const statusMap: Record<string, { label: string, color: string, icon: any }> = {
        pending: { label: 'En attente', color: 'bg-amber-100 text-amber-700', icon: Clock },
        validated: { label: 'Validée', color: 'bg-indigo-100 text-indigo-700', icon: CheckCircle2 },
        delivered: { label: 'Livrée', color: 'bg-emerald-100 text-emerald-700', icon: Truck },
    }

    return (
        <div className="space-y-10 pb-20">
            {/* Header section */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Gestion des Commandes</h1>
                    <p className="text-slate-500 mt-2 font-medium max-w-2xl">
                        Suivez les flux de ventes et gérez les livraisons de matériel et produits pour vos clients.
                    </p>
                </div>
                <div className="shrink-0">
                    <AddOrderForm clients={clients} />
                </div>
            </div>

            {/* Stats Overview */}
            <OrderStats orders={orders} />

            {/* Table Section */}
            <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
                <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                    <h2 className="text-lg font-black text-slate-900 tracking-tight">Liste des commandes</h2>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Temps Réel</span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-50">
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Détails Produit</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Client Partenaire</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Volume & Prix</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Statut Flux</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Mise à jour</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {orders.length > 0 ? (
                                orders.map((order: any) => (
                                    <tr key={order.id} className="hover:bg-slate-50/80 transition-all group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className={cn(
                                                    "p-3 rounded-2xl transition-all group-hover:scale-110",
                                                    order.category === 'equipment' ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'
                                                )}>
                                                    {order.category === 'equipment' ? <Package className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-black text-slate-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{order.product_name}</span>
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">
                                                        {order.category === 'equipment' ? '🛠️ Matériel' : '🧪 Phytosanitaire'}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center text-slate-600 font-bold text-sm">
                                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-3 text-[10px] font-black text-slate-400">
                                                    {order.clients?.name?.substring(0, 2).toUpperCase()}
                                                </div>
                                                {order.clients?.name}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col">
                                                <span className="text-slate-900 font-black text-sm">{order.quantity} Unité(s)</span>
                                                <span className="text-emerald-600 font-black text-xs flex items-center mt-0.5">
                                                    {(order.total_amount || 0).toLocaleString()} <span className="text-[10px] ml-1 uppercase opacity-60">Dh</span>
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className={cn(
                                                "inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm border",
                                                statusMap[order.status]?.color,
                                                "border-current/10"
                                            )}>
                                                <div className="w-1.5 h-1.5 rounded-full bg-current mr-2 animate-pulse"></div>
                                                {statusMap[order.status]?.label}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex justify-end">
                                                <OrderStatusUpdater id={order.id} currentStatus={order.status} />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center">
                                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                                <ShoppingCart className="w-10 h-10 text-slate-200" />
                                            </div>
                                            <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Aucune commande enregistrée</p>
                                        </div>
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
