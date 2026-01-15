'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createOrderAction(formData: FormData) {
    const supabase = await createClient()

    const client_id = formData.get('client_id') as string
    const product_name = formData.get('product_name') as string
    const category = formData.get('category') as string
    const quantity = parseInt(formData.get('quantity') as string)
    const total_amount = parseFloat(formData.get('total_amount') as string) || 0

    const { error } = await supabase.from('orders').insert({
        client_id,
        product_name,
        category,
        quantity,
        total_amount,
        status: 'pending'
    })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/orders')
    return { success: true }
}

export async function updateOrderStatusAction(id: string, status: string) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/orders')
    return { success: true }
}
