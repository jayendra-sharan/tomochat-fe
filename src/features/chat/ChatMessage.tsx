'use client';

import { Message } from "@/app/types";
import { useState } from "react";
import { useUserData } from "../auth/context/UserContext";
import { ChevronDoubleDownIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function ChatMessage({
  message
}: { message: Message} ) {
  const userData = useUserData();
  const [showBot, setShowBot] = useState<boolean>(false);
  const self = userData.id === message.sender.id;

  return (
    <div
      className={`flex flex-col ${self ? "items-end" : "items-start"}`}
    >
      <div
        className={`px-6 py-2 rounded-3xl max-w-xs text-s ${
          self
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-gray-600 text-white rounded-bl-none"
        }`}
      >
        <strong>{message.sender.displayName}</strong>
        <p>{message.content}</p>
        <div className="flex text-xs">
          <button className="px-1" onClick={() => setShowBot((prev) => !prev)}>
            { showBot ? <XMarkIcon className="size-4 text-white" /> : <ChevronDoubleDownIcon className="size-4 text-white" /> }
          </button>
        </div>
      </div>
      <div
        onClick={() => setShowBot(false)}
        className={`${showBot ? 'block' : 'hidden'} px-2 py-2 my-1 rounded-lg text-s ${
          self
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-gray-200 text-black rounded-bl-none"
        }`}
      >
        <strong>CW Bot</strong>
        {
          (message.suggestion?.aiReply.toLowerCase() === message.suggestion?.original.toLowerCase())
          ?
            <p>Alles goed! Goed gedaan!</p>
          :
            <>
              <p>You said: {message.suggestion?.original}</p>
              <p>Improved: {message.suggestion?.improved}</p>
              <p>English version: {message.suggestion?.english}</p>
              <p>Possible issues: {message.suggestion?.issues?.join(", ")}</p>
            </>
        }
        
      </div>
    </div>
  )
}