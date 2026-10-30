import { Route, Routes } from "react-router";
import { Toaster } from "./components/ui/toast";

import AuthLayout from "@/auth/AuthLayout";
import RootLayout from "@/root/RootLayout"
import Signup from "@//auth/forms/SignupForm";
import Signin from "@/auth/forms/SigninForm";
import Home from "@/pages/Home";
import CreatePost from "@/pages/CreatePost";
import LikedPosts from "@/pages/LikedPosts";


function App() {
  return (
    <main>
      <Routes>
        { /* public routes */ }
        <Route element={<AuthLayout />}>
          <Route path="/signin" element={<Signin />} />
					<Route path="/signup" element={<Signup />} />
        </Route>

        { /* private routes */ }
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/liked-posts" element={<LikedPosts />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
}

export default App;
