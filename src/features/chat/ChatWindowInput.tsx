"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchGraphQL } from "@/lib/fetchGraphQL";

export default function ChatWindowInput() {
  const [userMessage, setUserMessage] = useState<string>("");
  const urlSearchParam = useSearchParams();
  const groupId = urlSearchParam.get("group_id");


  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserMessage(value);
  }

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetchGraphQL(`
      mutation SendMessage($input: SendMessageInput!) {
        sendMessage(input: $input) {
          id
          content
          createdAt
          suggestion {
            original
            aiReply
            english
            issues
          }
          sender {
            id
            displayName
          }
        }
      }
    `, {
      input: {
        groupId,
        content: userMessage,
      }
    });

    if (response.errors) {
      console.log("Error in sending message");
    } else {
      console.log("Message sent, OK.");
    }

    setUserMessage('');
  }

  return (
    <form
      className="h-16 bg-dark-grey border-t flex items-center px-4"
      onSubmit={handleSendMessage}
    >
      <input
        className="border w-full my-4 h-10 rounded-xl px-4"
        type="text"
        value={userMessage}
        onChange={handleUserInput}
      />
      <button className="px-2">Send</button>
    </form>
  );
}
