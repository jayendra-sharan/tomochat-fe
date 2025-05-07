import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useUserData } from "../auth/context/UserContext";

export default function ChatWindowHeader() {
  const { currentGroup } = useUserData();
  return (
    <div className="h-10 flex items-center justify-between px-5 shadow-md">
      <div className="flex items-center space-x-2">
        <Link href="/dashboard">
          <ChevronLeftIcon className="size-6 text-black" />
        </Link>
        <p>
          { currentGroup?.name }
        </p>
      </div>
      <p>O</p>
    </div>
  );
}
