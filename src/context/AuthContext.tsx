import { useState, useEffect, createContext, useContext, type ReactNode } from 'react';
import type { Session, User } from '@supabase/supabase-js'

import { supabase } from "@/lib/supabaseClient"


type AuthContextType = {
    user: User | null;
    session: Session | null;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  async function currentSession() {
    const { data, error } = await supabase.auth.getSession();

    if(error) {
        console.error(error);
        return;
    }

    setSession(data.session);
    setIsLoading(false);
  }

  useEffect(() => {
    // determine if someone is logged in on initial load
    currentSession();

    // listen for login changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if(session) {
          setSession(session);
        }
      }
    );

    return () => subscription.unsubscribe()
  }, []);

  const value = {
    session,
    user: session?.user ?? null,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useUserContext() {
    const context = useContext(AuthContext);
    if(context === undefined) {
        throw new Error("The context is undefined");
    }

    return context;
}