"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchGraphQL } from "@/lib/fetchGraphQL";

export default function ChatWindowInput() {
  const [userMessage, setUserMessage] = useState<string>("");
  const urlSearchParam = useSearchParams();
  const groupId = urlSearchParam.get("group_id");
  const [loading, setLoading] = useState<boolean>(false);

  const handleUserInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setUserMessage(value);
  }

  const handleSendMessage = async () => {
    setLoading(true);
    const msgBackUp = userMessage;
    setUserMessage("");
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

    setLoading(false);
    if (response.errors) {
      console.log("Error in sending message");
      setUserMessage(msgBackUp);
    } else {
      console.log("Message sent, OK.");
    }
  }

  return (
    <div
      className="h-16 bg-dark-grey border-t flex items-center px-4"
    >
      <textarea
        className="border w-full my-4 h-10 rounded-xl px-4 py-1"
        value={userMessage}
        onChange={handleUserInput}
      />
      <button className="px-2" onClick={handleSendMessage}>
        {
          loading ? "...." : "Send"
        }</button>
    </div>
  );
}
