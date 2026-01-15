'use client'

import { useState, useMemo, useEffect } from 'react'
import { PlusCircle, Briefcase, Calendar, User, Info, CheckCircle2, Clock, AlertCircle } from 'lucide-react'
import { AddProjectForm } from '@/components/projects/AddProjectForm'
import { createClient } from '@/lib/supabase/client'
import { ProjectStats } from '@/components/projects/ProjectStats'
import { ProjectFilters } from '@/components/projects/ProjectFilters'
import { ProjectCard } from '@/components/projects/ProjectCard'

export default function ProjectsPage() {
    const [projects, setProjects] = useState<any[]>([])
    const [clients, setClients] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    // Filter states
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [priorityFilter, setPriorityFilter] = useState('all')

    const supabase = createClient()

    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            const [projectsRes, clientsRes] = await Promise.all([
                supabase.from('projects').select('*, clients(name)').order('created_at', { ascending: false }),
                supabase.from('clients').select('id, name').order('name')
            ])

            setProjects(projectsRes.data || [])
            setClients(clientsRes.data || [])
            setLoading(false)
        }
        fetchData()
    }, [supabase])

    const filteredProjects = useMemo(() => {
        return projects.filter(project => {
            const matchesSearch =
                project.culture_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.clients?.name?.toLowerCase().includes(searchQuery.toLowerCase())

            const matchesStatus = statusFilter === 'all' || project.status === statusFilter
            const matchesPriority = priorityFilter === 'all' || project.priority === priorityFilter

            return matchesSearch && matchesStatus && matchesPriority
        })
    }, [projects, searchQuery, statusFilter, priorityFilter])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Briefcase className="h-6 w-6 text-indigo-400" />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-10 pb-20">
            {/* Header section */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Projets Agricoles</h1>
                    <p className="text-slate-500 mt-2 font-medium max-w-2xl">
                        Centralisez la gestion de vos cultures et le suivi des études techniques pour vos clients partenaires.
                    </p>
                </div>
                <div className="shrink-0">
                    <AddProjectForm clients={clients} />
                </div>
            </div>

            {/* Stats Overview */}
            <ProjectStats projects={projects} />

            <div className="space-y-8">
                {/* Search and Filter bar */}
                <ProjectFilters
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    priorityFilter={priorityFilter}
                    setPriorityFilter={setPriorityFilter}
                />

                {/* Grid of Projects */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project: any) => (
                            <ProjectCard key={project.id} project={project} />
                        ))
                    ) : (
                        <div className="col-span-full bg-white rounded-[3rem] border border-dashed border-slate-200 p-20 text-center shadow-inner">
                            <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
                                <AlertCircle className="h-12 w-12 text-slate-300" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-3">Aucun projet trouvé</h3>
                            <p className="text-slate-500 max-w-md mx-auto font-medium">
                                {searchQuery || statusFilter !== 'all' || priorityFilter !== 'all'
                                    ? "Nous n'avons trouvé aucun projet correspondant à vos filtres actuels. Réinitialisez-les pour voir plus de contenu."
                                    : "Votre liste de projets est vide. Prêt à lancer une nouvelle culture ? Utilisez le bouton d'ajout ci-dessus."}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

