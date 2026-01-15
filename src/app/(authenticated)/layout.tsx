import { createClient } from '@/lib/supabase/server'
import { Sidebar } from '@/components/layout/Sidebar'
import { redirect } from 'next/navigation'

export default async function AuthenticatedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Get user profile for role
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            {/* Static sidebar for desktop */}
            <div className="hidden md:flex md:flex-shrink-0">
                <Sidebar role={profile?.role || null} />
            </div>

            {/* Main content area */}
            <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
                {/* Mobile header would go here if needed */}
                <main className="flex-1 relative overflow-y-auto focus:outline-none p-6 md:p-8">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
