import { Outlet } from "react-router";
// import LeftSidebar from "./components/shared/LeftSidebar";
// import TopSidebar from "./components/shared/TopSidebar";
// import RightSidebar from "./components/shared/RightSidebar";
// import BottomSidebar from "./components/shared/BottomSidebar";

function RootLayout() {
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

export default RootLayout;
