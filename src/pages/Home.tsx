import { useNavigate } from "react-router";

import { useSignOutAccount } from "@/lib/tanstack-query/queries";


function Home() {

  return (
    <main className="flex min-h-svh flex-col items-center justify-center">
      <h1>This is the Home Page!</h1>
    </main>
  );
}

export default Home;