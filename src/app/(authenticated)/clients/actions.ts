'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createClientAction(formData: FormData) {
    const supabase = await createClient()

    const name = formData.get('name') as string
    const phone = formData.get('phone') as string
    const region = formData.get('region') as string

    const { error } = await supabase.from('clients').insert({
        name,
        phone,
        region,
    })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/clients')
    return { success: true }
}
