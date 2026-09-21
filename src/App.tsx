import { Route, Routes } from "react-router";
import { Toaster } from "./components/ui/toast";

import AuthLayout from "@/auth/AuthLayout";
import RootLayout from "@/root/RootLayout"
import Signup from "@//auth/forms/SignupForm";
import Signin from "@/auth/forms/SigninForm";
import Home from "@/pages/Home";


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
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
}

export default App;
