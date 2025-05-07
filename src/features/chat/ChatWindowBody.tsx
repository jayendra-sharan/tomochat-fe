"use client";

import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import { useChat, useChatDispatch } from "./context/ChatContext";
import { fetchGraphQL } from "@/lib/fetchGraphQL";
import { useSearchParams } from "next/navigation";
import socket from "./socket";

export default function ChatWindowBody() {

  const dispatch = useChatDispatch();
  const searchParams = useSearchParams();
  const groupId = searchParams.get('group_id');

  const chat = useChat();

  useEffect(() => {

    async function loadChats() {
      const result = await fetchGraphQL(`
        query GetMessages($groupId: ID!) {
          messages(groupId: $groupId) {
            id
            content
            createdAt
            suggestion {
              original
              aiReply
              english
              improved
              issues
            }
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
        dispatch({
          type: "LOAD_MESSAGES",
          payload: result.messages,
        })
        console.log("messages", result.messages)
      }
    }

    socket.emit("joinRoom", groupId);
    loadChats();

    return () => {
      socket.emit("leaveRoom", groupId);
    }
  }, [])

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "instant" });
  }, [chat.messages.length]);

  return (
    <div className="flex-1 overflow-auto bg-white">
      <div className="p-4 space-y-2">
        {chat.messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
