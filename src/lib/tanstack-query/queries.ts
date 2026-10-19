import { useMutation } from '@tanstack/react-query';

import type { NewUser, CompleteUser } from '@/types/Types'
import {
    createUserAccount,
    signUserIn,
    signUserOut
} from "@/lib/supabase/api";

export function useCreateUserAccount() {
    return useMutation({
        mutationFn: (user: NewUser) => createUserAccount(user),
    });
}

export function useSignInAccount() {
    return useMutation({
        mutationFn: (user: { email: string, password: string}) => signUserIn(user),
    })
}

export function useSignOutAccount() {
    return useMutation({
        mutationFn: signUserOut,
    })
}