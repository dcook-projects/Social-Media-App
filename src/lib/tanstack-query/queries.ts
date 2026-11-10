import { useMutation, useQuery } from '@tanstack/react-query';
import type { User } from '@supabase/supabase-js';

import type { NewUser, CompleteUser } from '@/types/Types'
import {
    createUserAccount,
    getUserDataFromAuthUser,
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

export function useGetUserData(id: string | undefined) {
    return useQuery({
        queryKey: ["get_user_by_id", id],
        queryFn: () => getUserDataFromAuthUser(id),
        enabled: !!id,
    })
}