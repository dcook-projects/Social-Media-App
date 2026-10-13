import type { User } from "@supabase/supabase-js";

import { supabase } from "@/lib/supabaseClient"
import type { NewUser, CompleteUser } from "@/types/Types";

// export async function getCompleteUserFromUser(sessionUser: User) : Promise<CompleteUser> {

//   // select a user from the database based on the passed in User's ID
//   const { data, error } = await supabase
//     .from("users")
//     .select()
//     .eq("id", sessionUser.id);

//   if(error) {
//     console.log(error);

//     //return an empty user if the some error occured
//     return {
//       id: "",
//       username: "",
//       bio: ""
//     };
//   }

//   const currentUser = data[0];
  
//   return {
//     id: currentUser.id,
//     username: currentUser.username,
//     bio: currentUser.bio,
//   }
// }

/* Connects to the Supabase API to create a new user in the app and the database */
export async function createUserAccount(myUser: NewUser) {
  try {
    checkForSignedInUser();

    //call Supabase API function to add a user to the app
    const { error } = await supabase.auth.signUp({
      email: myUser.email,
      password: myUser.password
    });

    if(error)
      throw Error;

    //call Supabase API to insert the new user into the database
    const newUser = insertUserIntoDB({
      username: myUser.username
    });

    return newUser;
  } catch(error) {
    console.error(error);
    return error;
  }
}

async function checkForSignedInUser() {
  // check if there is already someone signed in 
  const { data: { user } } = await supabase.auth.getUser();
  if(user) {
    console.error("There is already a signed in user!");
    throw Error;
  }
}

async function insertUserIntoDB(user: {
  username: string
}) {
  //insert the new user into the table and get the returned row
  const { data, error } = await supabase
    .from('Users')
    .insert(user)
    .select();

  if(error) {
    console.error("Could not insert this user into the database");
    return error;
  }

  return data;
}