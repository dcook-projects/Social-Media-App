import { Link } from "react-router";

import { sidebarLinks } from "@/lib/linksIndex";
import { useSignOutAccount } from "@/lib/tanstack-query/queries";


// import { useNavigate } from "react-router";

function LeftSidebar() {
	// const navigate = useNavigate();
    const { mutate: signOut } = useSignOutAccount();

	return (
		<div className="hidden md:block fixed top-0 bottom-0 left-0 w-48 bg-neutral-900 text-[#ddd] p-4 z-10">
			<section className="flex flex-col h-full justify-between py-3 pl-3">
				<div className="flex flex-col gap-10">
					{sidebarLinks.map((link) => {
						return (
							<Link key={link.label} to={link.route}>
								{link.label}
							</Link>
						);
					})}
				</div>

				<div className="cursor-pointer" onClick={() => signOut}>
					<p>Logout</p>
				</div>
			</section>
		</div>
	);
}

export default LeftSidebar;
