
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ccjggzpkomwjzwrawmyr.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)