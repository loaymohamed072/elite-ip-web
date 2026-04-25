'use server'

import { createClient } from '@/lib/supabase/server'
import { getProgressForStage } from '@/lib/supabase/types'
import { sendMatterUpdateEmail } from '@/lib/portal/email'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

async function requireAdmin() {
  const supabase = await createClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (!user || userError) throw new Error('Not authenticated')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle()

  if (!profile) throw new Error('Profile not found — contact support')
  if (profile.role !== 'admin') throw new Error('Unauthorized')
  return { supabase, user }
}

export async function signInAction(
  _prevState: { error: string | null },
  formData: FormData
): Promise<{ error: string | null }> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const redirectTo = formData.get('redirectTo') as string

  if (!email || !password) {
    return { error: 'Email and password are required.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { error: 'Invalid email or password. Please try again.' }
  }

  redirect(redirectTo || '/')
}

export async function signOutAction(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}

export async function createClientAction(
  _prevState: { error: string | null; success: boolean },
  formData: FormData
): Promise<{ error: string | null; success: boolean }> {
  try {
    const { supabase } = await requireAdmin()

    const full_name = (formData.get('full_name') as string)?.trim()
    const email = (formData.get('email') as string)?.trim()
    const phone = (formData.get('phone') as string)?.trim() || null
    const company_name = (formData.get('company_name') as string)?.trim() || null
    const profile_id = (formData.get('profile_id') as string)?.trim() || null

    if (!full_name || !email) {
      return { error: 'Name and email are required.', success: false }
    }

    const { error } = await supabase
      .from('clients')
      .insert({ full_name, email, phone, company_name, profile_id })

    if (error) return { error: error.message, success: false }

    revalidatePath('/admin/dashboard')
    return { error: null, success: true }
  } catch (e) {
    return { error: (e as Error).message, success: false }
  }
}

export async function createMatterAction(
  _prevState: { error: string | null; success: boolean },
  formData: FormData
): Promise<{ error: string | null; success: boolean }> {
  try {
    const { supabase } = await requireAdmin()

    const client_id = (formData.get('client_id') as string)?.trim()
    const title = (formData.get('title') as string)?.trim()
    const matter_type = (formData.get('matter_type') as string)?.trim()
    const current_stage = (formData.get('current_stage') as string)?.trim() || 'Intake Received'
    const status = (formData.get('status') as string)?.trim() || 'Active'
    const next_step = (formData.get('next_step') as string)?.trim() || null

    if (!client_id || !title || !matter_type) {
      return { error: 'Client, title, and type are required.', success: false }
    }

    const progress = getProgressForStage(current_stage)

    const { error } = await supabase
      .from('matters')
      .insert({ client_id, title, matter_type, current_stage, progress, status, next_step })

    if (error) return { error: error.message, success: false }

    revalidatePath('/admin/dashboard')
    return { error: null, success: true }
  } catch (e) {
    return { error: (e as Error).message, success: false }
  }
}

export async function updateMatterStageAction(
  _prevState: { error: string | null; success: boolean },
  formData: FormData
): Promise<{ error: string | null; success: boolean }> {
  try {
    const { supabase } = await requireAdmin()

    const matter_id = (formData.get('matter_id') as string)?.trim()
    const current_stage = (formData.get('current_stage') as string)?.trim()
    const status = (formData.get('status') as string)?.trim()
    const next_step = (formData.get('next_step') as string)?.trim() || null

    if (!matter_id || !current_stage || !status) {
      return { error: 'Matter, stage, and status are required.', success: false }
    }

    const progress = getProgressForStage(current_stage)

    const { error } = await supabase
      .from('matters')
      .update({ current_stage, progress, status, next_step, updated_at: new Date().toISOString() })
      .eq('id', matter_id)

    if (error) return { error: error.message, success: false }

    revalidatePath('/admin/dashboard')
    return { error: null, success: true }
  } catch (e) {
    return { error: (e as Error).message, success: false }
  }
}

export async function addMatterUpdateAction(
  _prevState: { error: string | null; success: boolean },
  formData: FormData
): Promise<{ error: string | null; success: boolean }> {
  try {
    const { supabase, user } = await requireAdmin()

    const matter_id = (formData.get('matter_id') as string)?.trim()
    const update_title = (formData.get('update_title') as string)?.trim()
    const update_body = (formData.get('update_body') as string)?.trim()
    const visible_to_client = formData.get('visible_to_client') === 'true'

    if (!matter_id || !update_title || !update_body) {
      return { error: 'Matter, title, and body are required.', success: false }
    }

    const { error } = await supabase
      .from('matter_updates')
      .insert({
        matter_id,
        update_title,
        update_body,
        visible_to_client,
        created_by: user.id,
      })

    if (error) return { error: error.message, success: false }

    if (visible_to_client) {
      const { data: matter } = await supabase
        .from('matters')
        .select('title, client_id')
        .eq('id', matter_id)
        .single()

      if (matter) {
        const { data: client } = await supabase
          .from('clients')
          .select('email, full_name')
          .eq('id', matter.client_id)
          .single()

        if (client?.email) {
          await sendMatterUpdateEmail({
            to: client.email,
            clientName: client.full_name,
            matterTitle: matter.title,
            updateTitle: update_title,
            updateBody: update_body,
          }).catch(() => {})
        }
      }
    }

    revalidatePath('/admin/dashboard')
    return { error: null, success: true }
  } catch (e) {
    return { error: (e as Error).message, success: false }
  }
}