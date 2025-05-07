// "use client";

// import { signIn } from "next-auth/react";

// export default function LoginPage() {
//   return (
//     <div className="h-screen flex items-center justify-center flex-col gap-4">
//       <h1 className="text-2xl">
//         Login
//       </h1>
//       <button
//         onClick={() => signIn("google")}
//         className="p-2 bg-blue-500 text-white rounded"
//       >
//         Sign in with Google
//       </button>

//       <button
//         onClick={() => signIn("apple")}
//         className="p-2 bg-black text-white rounded"
//       >
//         Sign in with Apple
//       </button>
//     </div>
//   )
// }

import { redirect } from 'next/navigation';

export default function LoginAias() {
  redirect('/');
}
