import { supabase } from "@/lib/supabaseClient"
import type { NewUser, CompleteUser } from "@/types/Types";


/* Connects to the Supabase API to create a new user in the app and the database */
export async function createUserAccount(myUser: NewUser) {
  try {
    await checkForSignedInUser();

    // call Supabase API function to add a user to the app
    const { error } = await supabase.auth.signUp({
      email: myUser.email,
      password: myUser.password
    });

    if(error)
      throw Error;

    // call Supabase API to insert the new user into the database
    const newUser = insertUserIntoDB({
      username: myUser.username
    });

    return newUser;
  } catch(error) {
    console.error(error);
    throw error;
  }
}

async function checkForSignedInUser() {
  // the call to check if there is already someone signed in 
  const { data: { user } } = await supabase.auth.getUser();
  if(user) {
    console.error("There is already a signed in user!");
    throw Error;
  }
}

async function insertUserIntoDB(user: {
  username: string
}) {
  // insert the new user into the table and get the returned row
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

export async function signUserIn(user: { email: string, password: string }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: user.password
  });

  if(error) {
    console.error(error);
    throw error;
  }

  return data;
}

export async function signUserOut() {
  // local scope only signs the user out on the current session and not on all devices
  const { error } = await supabase.auth.signOut({ scope: 'local' });

  if(error) {
    console.error(error);
    throw error;
  }

  return error;  // this is null on successful sign out
}
