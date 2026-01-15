'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    LayoutDashboard,
    Users,
    Briefcase,
    ShoppingCart,
    LogOut,
    Leaf,
    ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { logout } from '@/app/auth/actions'

interface SidebarProps {
    role: string | null
}

export function Sidebar({ role }: SidebarProps) {
    const pathname = usePathname()

    const navigation = [
        { name: 'Tableau de bord', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Clients', href: '/clients', icon: Users },
        { name: 'Projets', href: '/projects', icon: Briefcase },
        { name: 'Commandes', href: '/orders', icon: ShoppingCart },
    ]

    return (
        <div className="flex h-full w-72 flex-col bg-white border-r border-slate-100 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
            <div className="flex h-24 items-center px-8 mb-4">
                <div className="p-2.5 bg-emerald-50 rounded-2xl mr-3">
                    <Leaf className="h-7 w-7 text-emerald-600" />
                </div>
                <span className="text-2xl font-black text-slate-900 tracking-tighter">Allagro</span>
            </div>

            <nav className="flex-1 space-y-2 px-4">
                {navigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                'group flex items-center px-5 py-4 text-sm font-bold rounded-[1.5rem] transition-all duration-300 relative overflow-hidden',
                                isActive
                                    ? 'bg-emerald-50 text-emerald-700 shadow-sm'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                            )}
                        >
                            <item.icon
                                className={cn(
                                    'mr-4 h-5 w-5 transition-all duration-300',
                                    isActive ? 'text-emerald-600 scale-110' : 'text-slate-400 group-hover:text-slate-600 group-hover:scale-110'
                                )}
                            />
                            <span className="relative z-10">{item.name}</span>
                            {isActive && (
                                <ChevronRight className="ml-auto h-4 w-4 text-emerald-500 animate-in slide-in-from-left-2 duration-300" />
                            )}
                        </Link>
                    )
                })}
            </nav>

            <div className="p-6 space-y-4">
                <div className="p-4 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center shadow-inner">
                    <div className="h-10 w-10 rounded-full bg-white shadow-sm flex items-center justify-center text-emerald-600 font-black text-xs border border-emerald-100">
                        {role === 'admin' ? 'AD' : 'EM'}
                    </div>
                    <div className="ml-3 overflow-hidden">
                        <p className="text-xs font-black text-slate-900 truncate leading-none mb-1">
                            {role === 'admin' ? 'Administrateur' : 'Collaborateur'}
                        </p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">
                            Personnel Allagro
                        </p>
                    </div>
                </div>

                <button
                    onClick={() => logout()}
                    className="flex w-full items-center justify-center gap-3 px-5 py-4 text-sm font-black text-slate-500 bg-slate-900 rounded-[1.5rem] hover:bg-red-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-red-200 active:scale-95 group"
                >
                    <LogOut className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                    <span>Déconnexion</span>
                </button>
            </div>
        </div>
    )
}
