import { useUserData } from "@/features/auth/context/UserContext";
import { HomeIcon } from "@heroicons/react/20/solid";
import { PowerIcon } from "@heroicons/react/24/solid";
import Link from "next/link"
import { useRouter } from "next/navigation";


export default function Header() {
  const { id } = useUserData();
  const router = useRouter();
  
  return (
    <div className="flex items-center justify-between bg-blue-500 h-12 px-10">
      <Link href="/" className="font-bold text-white">TomoChat</Link>
      {
        id && 
        <nav className="flex gap-4">
          <Link href="/dashboard">
            <HomeIcon className="size-6 text-white" />
          </Link>
          <button onClick={() => {
            localStorage.setItem("cw-token", "");
            router.push("/login");
          }}>
            <PowerIcon className="size-6 text-white" />
          </button>
        </nav>
      }
    </div>
  )
}
