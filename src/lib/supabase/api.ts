import type { User } from "@supabase/supabase-js";

import { supabase } from "@/lib/supabaseClient"
import type { CompleteUser } from "@/types/Types";

export async function getCompleteUserFromUser(sessionUser: User) : Promise<CompleteUser> {

  // select a user from the database based on the passed in User's ID
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("id", sessionUser.id);

  if(error) {
    console.log(error);

    //return an empty user if the some error occured
    return {
      id: "",
      username: "",
      bio: ""
    };
  }

  const currentUser = data[0];
  
  return {
    id: currentUser.id,
    username: currentUser.username,
    bio: currentUser.bio,
  }
}