"use client";
import { useEffect, useRef } from "react";
import { useSearchParams } from 'next/navigation';

import { useChatDispatch } from "@/features/chat/context/ChatContext";
import { fetchGraphQL } from "@/lib/fetchGraphQL";


export default function ChatWindow() {
  const dispatch = useChatDispatch();
  const searchParams = useSearchParams();
  const groupId = searchParams.get('group_id');

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function loadChats() {
      const result = await fetchGraphQL(`
        query GetMessages($groupId: ID!) {
          messages(groupId: $groupId) {
            id
            content
            createdAt
            sender {
              id
              displayName
            }
          }
        }
      `, {
        groupId
      });

      if (result.errors) {
        console.log("Error");
      } else {
        console.log("messages", result.messages)
      }
    }

    loadChats();
  }, [])
  // Scroll to bottom when messages load
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "instant" });
  }, [dummyMessages.length]); // When messages change → scroll

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 overflow-auto">
        <div className="p-4 space-y-2">
          {dummyMessages.map((msg) => (
            <div key={msg.id} className="mb-2">
              <strong>{msg.user}</strong> {msg.text}
            </div>
          ))}

          {/* Scroll target */}
          <div ref={bottomRef} />
        </div>

      </div>
    </div>
  );
}
