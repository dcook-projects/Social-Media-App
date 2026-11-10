import { Outlet, Navigate } from "react-router";

import LeftSidebar from "@/components/shared/LeftBar";
import TopSidebar from "@/components/shared/TopBar";
import RightSidebar from "@/components/shared/RightBar";
import BottomSidebar from "@/components/shared/BottomBar";
import { useUserContext } from "@/context/AuthContext";

function RootLayout() {
  const context = useUserContext();

  if(context) {
	const { user, isLoading } = context;
	if(isLoading) {
		return <span>Loading...</span>;
	}
	else if(!user) {
		return <Navigate to="/signin" replace />;
	}
	else {
      return (
  	    <div>
  	      <TopSidebar />
  	      <LeftSidebar />
  	      <RightSidebar />
  	      <Outlet />
  	      <BottomSidebar />
  	    </div>
      );
	}
  }
  
}

export default RootLayout;
