"use client";

import ChatWindowBody from "@/features/chat/ChatWindowBody";
import ChatWindowHeader from "@/features/chat/ChatWindowHeader";
import ChatWindowInput from "@/features/chat/ChatWindowInput";
import { ChatProvider } from "@/features/chat/context/ChatContext";
import { Suspense } from "react";

export default function ChatPage() {
  return (
    <ChatProvider>
      <Suspense fallback={null}>
        <ChatWindowHeader />
        <div className="flex-1 flex flex-col min-h-0">
          <ChatWindowBody  />
          <ChatWindowInput />
        </div>
      </Suspense>

    </ChatProvider>
  );
}
