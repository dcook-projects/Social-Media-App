import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/tanstack-query/queries";
// import { supabase } from "@/lib/supabaseClient";


function TopSidebar() {
	const { user, isLoading } = useUserContext();
    const { mutate: signOut } = useSignOutAccount();
    // var name = "";

    // if(user) {
    //     const { data, error } = await supabase
    //       .from('Users')
    //       .select('username')
    //       .eq('id', user.id)
    //       .single();
        

    //     name = data?.username;
    // }

	return (
		<div className="md:hidden fixed top-0 left-0 w-full h-16 bg-neutral-900 text-[#ddd] flex items-center px-4 z-20">
			<section className="flex justify-between w-full px-3">
				<div>
					{isLoading
						? "Loading..."
						: !user
							? "BLANK"
							: user?.user_metadata?.username
                            
                    }
				</div>
				<div onClick={() => signOut}>Logout</div>
			</section>
		</div>
	);
}

export default TopSidebar;
