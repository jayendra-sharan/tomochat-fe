// app/dashboard/page.tsx

"use client";

import { useUserDataDispatch } from "@/features/auth/context/UserContext";
import { fetchGraphQL } from "@/lib/fetchGraphQL";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type Member = {
  user: {
    displayName: string,
  }
}
type ChatGroup = {
  id: string;
  name: string;
  groupType: string;
  topic: string;
  inviteLink: string;
  createdAt: string;
  updatedAt: string;
  members: Member[];
};


export default function DashboardPage() {
  const [chatGroups, setChatGroups] = useState<ChatGroup[]>([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useUserDataDispatch();

  const router = useRouter();

  useEffect(() => {
    async function fetchMyGroups() {
      const result = await fetchGraphQL(`
        query {
          myGroups {
            id
            name
            groupType
            topic
            inviteLink
            createdAt
            updatedAt
            members {
              user {
                displayName
              }
            }
          }
        }
      `);
      
      setLoading(false);
      if (result.errors) {
        console.log("Error");
      } else {
        console.log(result.myGroups);
        setChatGroups(result.myGroups)
      }
    }
    fetchMyGroups();
  }, []);


  if (loading) {
    return (
      <div className="p-8">Loading...</div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Your Chats</h1>
      <ul className="space-y-2 my-3">
        {chatGroups.map((group) => (
          <li
            className="flex flex-col bg-white rounded-lg p-2"
            key={group.id}
          >
            <div className="flex items-center justify-between pb-2">
              <p>
                {group.name}
              </p>
              <button
                className="text-left cursor-pointer bg-blue-700 text-white p-2 mr-2 rounded-lg"
                onClick={() => {
                  dispatch({
                    type: 'SET_CURRENT_GROUP',
                    payload: group.id,
                  })
                  router.push(`/chat?group_id=${group.id}`);
                }}
              >
                  Start Chat
              </button>
            </div>
            <hr />
            <div className="pt-2">
              Memebers: {
                group.members.map(member => member?.user.displayName).join(", ")
              }
            </div>
            {/* <div className="">
              {`Invite Id: ${group.inviteLink}--${group.id}`}
            </div> */}
          </li>
        ))}
      </ul>
      <div className="space-x-4 mt-10">
          <Link href="/create-chat" className="px-4 py-2 bg-blue-500 text-white rounded">
            Create new chat
          </Link>
          <Link href="/join-group" 
            className="px-4 py-2 rounded bg-yellow-500 text-white"
          >
            Join chat
          </Link>
        </div>
    </div>
  );
}
