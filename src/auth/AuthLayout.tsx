import { Outlet } from "react-router";
import hs from "@/assets/react.svg";

function AuthLayout() {

  return (
	<div className="flex h-screen">
	  <section className="flex flex-1 justify-center items-center flex-col w-1/2 py-10">
		<Outlet />
	  </section>
	  <img
		src={hs}
		alt="logo"
		className="hidden lg:block h-screen w-1/2 object-cover bg-no-repeat"
	  />
	</div>	
  );
}

export default AuthLayout;
