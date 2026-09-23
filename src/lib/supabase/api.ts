import { supabase } from "@/lib/supabaseClient"

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getSession();

  if(!data.session) {
      console.error(error);
      return null;
  }

  return data.session.user;
}