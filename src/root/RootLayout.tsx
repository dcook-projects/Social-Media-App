import { Outlet, Navigate, useNavigate } from "react-router";

// import LeftSidebar from "./components/shared/LeftSidebar";
// import TopSidebar from "./components/shared/TopSidebar";
// import RightSidebar from "./components/shared/RightSidebar";
// import BottomSidebar from "./components/shared/BottomSidebar";
import { useUserContext } from "@/context/AuthContext";

function RootLayout() {
  const context = useUserContext();
  const navigate = useNavigate();

  if(context) {
	const { user, isLoading } = context;
	if(isLoading) {
		return <span>Loading...</span>;
	}
	else if(!user) {
		navigate("/signin");
	}
	else {
      return (
  	    <div>
  	      {/* <TopSidebar />
  	      <LeftSidebar />
  	      <RightSidebar /> */}
  	      <Outlet />
  	      {/* <BottomSidebar /> */}
  	    </div>
      );
	}
  }
  
}

export default RootLayout;
