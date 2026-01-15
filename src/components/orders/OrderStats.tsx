'use client'

import { ShoppingCart, Clock, CheckCircle2, TrendingUp, Package } from 'lucide-react'

interface OrderStatsProps {
    orders: any[]
}

export function OrderStats({ orders }: OrderStatsProps) {
    const total = orders.length
    const pending = orders.filter(o => o.status === 'pending').length
    const delivered = orders.filter(o => o.status === 'delivered').length

    // Calculate total revenue from orders with a total_amount
    const totalRevenue = orders.reduce((acc, curr) => acc + (Number(curr.total_amount) || 0), 0)

    const stats = [
        { label: 'Total Commandes', value: total, icon: ShoppingCart, color: 'bg-[#FF5A5F]', textColor: 'text-white', sub: 'Toutes catégories' },
        { label: 'En Attente', value: pending, icon: Clock, color: 'bg-amber-500', textColor: 'text-white', sub: 'À traiter' },
        { label: 'Livraisons', value: delivered, icon: Package, color: 'bg-emerald-600', textColor: 'text-white', sub: 'Réussies' },
        { label: 'Chiffre d\'Affaires', value: `${totalRevenue.toLocaleString()} Dh`, icon: TrendingUp, color: 'bg-white', textColor: 'text-slate-900', sub: 'Total encaissé' },
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
                                <stat.icon className={`h-5 w-5 ${stat.color === 'bg-white' ? 'text-amber-600' : 'text-white'}`} />
                            </div>
                        </div>
                        <div>
                            <p className={`text-xs font-bold uppercase tracking-widest ${stat.color === 'bg-white' ? 'text-slate-400' : 'text-white/70'}`}>{stat.label}</p>
                            <h3 className="text-2xl font-black mt-1 leading-none">{stat.value}</h3>
                            <p className={`text-[10px] mt-2 font-medium ${stat.color === 'bg-white' ? 'text-slate-400' : 'text-white/60'}`}>{stat.sub}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
