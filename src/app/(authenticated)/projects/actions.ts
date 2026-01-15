'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createProjectAction(formData: FormData) {
    const supabase = await createClient()

    const client_id = formData.get('client_id') as string
    const culture_type = formData.get('culture_type') as string
    const description = formData.get('description') as string
    const priority = formData.get('priority') as string
    const surface_area = formData.get('surface_area') as string

    const { error } = await supabase.from('projects').insert({
        client_id,
        culture_type,
        description,
        priority: priority || 'medium',
        surface_area: surface_area ? parseFloat(surface_area) : null,
        status: 'planned'
    })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/projects')
    return { success: true }
}

export async function updateProjectStatusAction(id: string, status: string) {
    const supabase = await createClient()

    const updateData: any = { status }

    // If status is completed, set completed_at to now
    if (status === 'completed') {
        updateData.completed_at = new Date().toISOString()
    } else {
        // If changing from completed to something else, we might want to clear it
        // but often it's better to keep it or just null it. Let's null it for consistency.
        updateData.completed_at = null
    }

    const { error } = await supabase
        .from('projects')
        .update(updateData)
        .eq('id', id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/projects')
    return { success: true }
}

export async function deleteProjectAction(id: string) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/projects')
    return { success: true }
}
