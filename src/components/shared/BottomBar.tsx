import { Link } from 'react-router'

import { sidebarLinks } from "@/lib/linksIndex";

function BottomBar() {
	return (
		<div className="fixed bottom-0 left-0 w-full h-16 bg-neutral-900 text-[#ddd] flex items-center px-4 z-20 md:hidden">
			<section className="flex justify-between w-full px-3">
				{sidebarLinks.map((link) => {
					return (
						<Link key={link.label} to={link.route}>
							{link.label}
						</Link>
					);
				})}
			</section>
		</div>
	);
}

export default BottomBar;