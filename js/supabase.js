
// PASTE YOUR SUPABASE VALUES HERE

const SUPABASE_URL = "PASTE_SUPABASE_URL";
const SUPABASE_KEY = "PASTE_SUPABASE_ANON_KEY";

export const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);
