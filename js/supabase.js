
// PASTE YOUR SUPABASE VALUES HERE

const SUPABASE_URL = "https://mwtbqxycinvcipiizoqn.supabase.co";
const SUPABASE_KEY = "sb_publishable_EaJYZ5gN6CUh6iGfVV5juA_qjui6B5b";

export const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);
