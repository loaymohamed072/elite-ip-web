import { createClient } from '@/lib/supabase/server'
import type { Client, Matter, MatterUpdate, Profile } from '@/lib/supabase/types'

export async function getCurrentProfile(): Promise<Profile | null> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return data
}

export async function getClientRecord(): Promise<Client | null> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('clients')
    .select('*')
    .eq('profile_id', user.id)
    .single()

  return data
}

export async function getClientMatters(clientId: string): Promise<Matter[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('matters')
    .select('*')
    .eq('client_id', clientId)
    .order('updated_at', { ascending: false })

  return data ?? []
}

export async function getMatterUpdates(matterId: string): Promise<MatterUpdate[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('matter_updates')
    .select('*')
    .eq('matter_id', matterId)
    .eq('visible_to_client', true)
    .order('created_at', { ascending: false })

  return data ?? []
}

export async function adminGetAllClients(): Promise<Client[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('clients')
    .select('*')
    .order('created_at', { ascending: false })

  return data ?? []
}

export async function adminGetAllMatters(): Promise<Matter[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('matters')
    .select('*')
    .order('updated_at', { ascending: false })

  return data ?? []
}

export async function adminGetMatterUpdates(matterId: string): Promise<MatterUpdate[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('matter_updates')
    .select('*')
    .eq('matter_id', matterId)
    .order('created_at', { ascending: false })

  return data ?? []
}