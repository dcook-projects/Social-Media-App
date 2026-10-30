import { useUserContext } from "@/context/AuthContext";

function RightSidebar() {
	const { user, isLoading } = useUserContext();

	return (
		<div className="hidden md:block fixed top-0 bottom-0 right-0 w-48 bg-neutral-900 text-[#ddd] p-4 z-10">
			<section className="py-3 pr-3 text-right">
				<div>
					{isLoading
						? "Loading..."
						: user?.user_metadata?.username
                    }
				</div>
			</section>
		</div>
	);
}

export default RightSidebar;
