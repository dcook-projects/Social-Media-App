import { useUserContext } from "@/context/AuthContext";
import { useGetUserData } from "@/lib/tanstack-query/queries";

function RightSidebar() {
	const { user, isLoading } = useUserContext();
	const { isPending, isError, data: userEntry } = useGetUserData(user?.id);

	return (
		<div className="hidden md:block fixed top-0 bottom-0 right-0 w-48 bg-neutral-900 text-[#ddd] p-4 z-10">
			<section className="py-3 pr-3 text-right">
				<div>
					{isLoading || isPending
						? "Loading..."
						: isError 
							? "Error loading the name"
							: userEntry.username
                    }
				</div>
			</section>
		</div>
	);
}

export default RightSidebar;
