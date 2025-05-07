"use client";

import React, { createContext, useContext, useEffect, useReducer } from "react";
import socket from "../socket";
import { Message } from "@/app/types";

type ChatState = {
  messages: Message[];
}

type ChatAction = 
  | { type: "LOAD_MESSAGES"; payload: Message[] }
  | { type: "ADD_MESSAGE"; payload: Message }

const ChatContext = createContext<ChatState | undefined>(undefined);
const ChatDispatchContext = createContext<React.Dispatch<ChatAction> | undefined>(undefined);

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch(action.type) {
    case "LOAD_MESSAGES":
        return {
          ...state,
          messages: action.payload,
        };
    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload]
      }
    default:
      return state;
  }
}

export function ChatProvider({ children }: { children: React.ReactNode}) {
  const [state, dispatch] = useReducer(chatReducer, { messages: [] });

  useEffect(() => {
    const newMessageHandler = (message: Message) => {
      console.log("message received", message);
      dispatch({ type: "ADD_MESSAGE", payload: message });
    }
    socket.on("newMessage", newMessageHandler);

    return () => {
      socket.off("newMessage", newMessageHandler);
    }
  }, []);

  return (
    <ChatContext.Provider value={state}>
      <ChatDispatchContext.Provider value={dispatch}>
        {children}
      </ChatDispatchContext.Provider>
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext);

  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}

export function useChatDispatch() {
  const context = useContext(ChatDispatchContext);

  if (context === undefined) {
    throw new Error("useChatDispatch must be used within a ChatProvider");
  }
  return context;
}
