import { createClient } from '@/lib/supabase/server'
import {
    Briefcase,
    ShoppingCart,
    Users,
    TrendingUp,
    ArrowUpRight,
    Activity,
    Package,
    ChevronRight,
    Clock
} from 'lucide-react'
import Link from 'next/link'

async function getStats() {
    const supabase = await createClient()

    const [
        { count: projectsCount },
        { count: ordersCount },
        { count: clientsCount },
        { data: recentProjects },
        { data: recentOrders }
    ] = await Promise.all([
        supabase.from('projects').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('*', { count: 'exact', head: true }),
        supabase.from('clients').select('*', { count: 'exact', head: true }),
        supabase.from('projects').select('*, clients(name)').order('created_at', { ascending: false }).limit(5),
        supabase.from('orders').select('*, clients(name)').order('created_at', { ascending: false }).limit(5)
    ])

    return {
        projectsCount: projectsCount || 0,
        ordersCount: ordersCount || 0,
        clientsCount: clientsCount || 0,
        recentProjects: recentProjects || [],
        recentOrders: recentOrders || []
    }
}

export default async function DashboardPage() {
    const stats = await getStats()

    const cards = [
        {
            title: 'Projets Actifs',
            value: stats.projectsCount,
            change: '+14%',
            icon: Briefcase,
            color: 'bg-[#5850EC]', // Vibrant Indigo
            textColor: 'text-white',
            details: 'Progression mensuelle'
        },
        {
            title: 'Commandes Totales',
            value: stats.ordersCount,
            change: '+28%',
            icon: ShoppingCart,
            color: 'bg-[#FF5A5F]', // Vibrant Coral
            textColor: 'text-white',
            details: 'Transactions réussies'
        },
        {
            title: 'Clients Global',
            value: stats.clientsCount,
            change: '+5%',
            icon: Users,
            color: 'bg-white',
            textColor: 'text-slate-900',
            details: 'Nouveaux partenaires'
        },
        {
            title: 'Performance',
            value: '94%',
            change: '+12%',
            icon: TrendingUp,
            color: 'bg-[#059669]', // Vibrant Emerald
            textColor: 'text-white',
            details: 'Taux de satisfaction'
        }
    ]

    return (
        <div className="space-y-8 pb-10">
            {/* Header section with welcome message */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Bonjour, Équipe Allagro</h1>
                    <p className="text-slate-500 mt-1">Voici ce qui se passe sur votre plateforme aujourd'hui.</p>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100">
                    <Clock className="w-4 h-4 text-emerald-500" />
                    <span>Mis à jour il y a 5 min</span>
                </div>
            </div>

            {/* Main Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">

                {/* Stats Cards - Bento Style */}
                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {cards.map((card, idx) => (
                        <div
                            key={idx}
                            className={`${card.color} ${card.textColor} p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group transition-all duration-300 hover:scale-[1.02] border ${card.color === 'bg-white' ? 'border-slate-100' : 'border-transparent'}`}
                        >
                            {/* Decorative background circle */}
                            <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-current opacity-[0.05] group-hover:scale-150 transition-transform duration-500" />

                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <div className="flex justify-between items-start">
                                    <div className={`p-3 rounded-2xl ${card.color === 'bg-white' ? 'bg-slate-50' : 'bg-white/20 shadow-inner'}`}>
                                        <card.icon className={`w-6 h-6 ${card.color === 'bg-white' ? 'text-indigo-600' : 'text-white'}`} />
                                    </div>
                                    <div className={`flex items-center px-3 py-1 rounded-full text-xs font-bold ${card.color === 'bg-white' ? 'bg-emerald-50 text-emerald-600' : 'bg-white/20 text-white'}`}>
                                        {card.change}
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <p className={`text-sm font-medium ${card.color === 'bg-white' ? 'text-slate-500' : 'text-white/80'}`}>{card.title}</p>
                                    <div className="flex items-baseline gap-2 mt-1">
                                        <h2 className="text-4xl font-black">{card.value}</h2>
                                        <span className={`text-xs ${card.color === 'bg-white' ? 'text-slate-400' : 'text-white/60'}`}>{card.details}</span>
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <div className={`p-2 rounded-full ${card.color === 'bg-white' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900 shadow-lg'}`}>
                                        <ArrowUpRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Big Info Card / Quick Links */}
                <div className="lg:col-span-4 bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col justify-between border border-white/5">
                    {/* Abstract background pattern */}
                    <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
                        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-500 rounded-full blur-[100px]" />
                        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-emerald-500 rounded-full blur-[100px]" />
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10">
                                <Activity className="w-6 h-6 text-indigo-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">Actions Rapides</h3>
                                <p className="text-slate-400 text-xs">Gestion quotidienne</p>
                            </div>
                        </div>

                        <div className="space-y-3 mt-10">
                            {[
                                { label: 'Nouveau Projet', sub: 'Lancer une culture', color: 'bg-indigo-500', href: '/projects' },
                                { label: 'Nouvelle Commande', sub: 'Matériel & Physio', color: 'bg-emerald-500', href: '/orders' },
                                { label: 'Rapport Annuel', sub: 'Bilan de performance', color: 'bg-amber-500', href: '#' }
                            ].map((action, i) => (
                                <Link
                                    key={i}
                                    href={action.href}
                                    className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-colors group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-10 rounded-full ${action.color}`} />
                                        <div>
                                            <p className="font-semibold text-sm">{action.label}</p>
                                            <p className="text-[10px] text-slate-500">{action.sub}</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="relative z-10 mt-10 p-6 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl shadow-xl overflow-hidden group cursor-pointer">
                        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
                        <p className="text-xs font-medium text-white/70 uppercase tracking-widest">Support Client</p>
                        <h4 className="text-lg font-bold mt-1">Besoin d'aide ?</h4>
                        <p className="text-xs text-indigo-100/60 mt-2">Notre équipe est disponible 24/7 pour vous assister.</p>
                        <div className="mt-4 flex -space-x-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-indigo-700 bg-slate-200" />
                            ))}
                            <div className="w-8 h-8 rounded-full border-2 border-indigo-700 bg-indigo-500 flex items-center justify-center text-[10px] font-bold">
                                +12
                            </div>
                        </div>
                    </div>
                </div>

                {/* Second Row: Recent Lists */}
                <div className="lg:col-span-12 grid grid-cols-1 xl:grid-cols-2 gap-8 mt-4">

                    {/* Recent Projects List */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100 flex flex-col">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-emerald-50 rounded-2xl">
                                    <Activity className="w-6 h-6 text-emerald-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">Projets Récents</h3>
                            </div>
                            <Link href="/projects" className="text-sm font-semibold text-emerald-600 hover:underline">Voir tout</Link>
                        </div>

                        <div className="space-y-4 flex-grow">
                            {stats.recentProjects.length > 0 ? (
                                stats.recentProjects.map((project: any) => (
                                    <div key={project.id} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-3xl transition-colors border border-transparent hover:border-slate-100">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center font-bold text-slate-400">
                                                {project.culture_type.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900">{project.culture_type}</p>
                                                <p className="text-xs text-slate-500 font-medium">{project.clients?.name}</p>
                                            </div>
                                        </div>
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${project.status === 'completed' ? 'bg-emerald-50 text-emerald-700' :
                                                project.status === 'in_progress' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-600'
                                            }`}>
                                            {project.status === 'completed' ? 'Terminé' :
                                                project.status === 'in_progress' ? 'En cours' : 'Planifié'}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center py-10 opacity-30">
                                    <Activity className="w-12 h-12 mb-2" />
                                    <p className="text-sm italic">Aucun projet récent</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Recent Orders List */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100 flex flex-col">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-amber-50 rounded-2xl">
                                    <Package className="w-6 h-6 text-amber-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">Commandes Récentes</h3>
                            </div>
                            <Link href="/orders" className="text-sm font-semibold text-amber-600 hover:underline">Voir tout</Link>
                        </div>

                        <div className="space-y-4 flex-grow">
                            {stats.recentOrders.length > 0 ? (
                                stats.recentOrders.map((order: any) => (
                                    <div key={order.id} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-3xl transition-colors border border-transparent hover:border-slate-100">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center">
                                                <ShoppingCart className="w-5 h-5 text-slate-400" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900">{order.product_name}</p>
                                                <p className="text-xs text-slate-500 font-medium">Cpt: {order.clients?.name}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-black text-slate-900">{order.total_amount ? `${order.total_amount} Dh` : '---'}</p>
                                            <p className={`text-[10px] font-bold uppercase tracking-widest ${order.status === 'delivered' ? 'text-emerald-500' :
                                                    order.status === 'validated' ? 'text-blue-500' : 'text-amber-500'
                                                }`}>
                                                {order.status === 'delivered' ? 'Livré' :
                                                    order.status === 'validated' ? 'Validé' : 'Attente'}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center py-10 opacity-30">
                                    <Package className="w-12 h-12 mb-2" />
                                    <p className="text-sm italic">Aucune commande récente</p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}
