import React from "react";
import { validateServerProtectedRoute } from "../_lib/check-auth";

export default async function Dashboard() {
  const { user } = await validateServerProtectedRoute();
  return (
    <div>
      <b>Dashboard</b>
      <p>{JSON.stringify(user, null, 2)}</p>
    </div>
  );
}

// "use client";

// import { Button } from "@/components/ui/button";
// import { signOut } from "@/features/actions/auth/signout";
// import React from "react";
// import { ValidateClientProtectedRoute } from "@/lib/validate-client-protected-route";

// export default function Dashboard() {
//   const {user} = ValidateClientProtectedRoute()
//   return (
//     <div>
//       <b>Dashboard</b>
//       <p>Hi, this is client page</p>
//       <p>{JSON.stringify(user, null, 2)}</p>
//       <Button type="submit" onClick={() => signOut()}>
//         Sign out
//       </Button>
//     </div>
//   );
// }
