import { ReactNode } from "react";

export default function BottomBar ({ children }: { children: ReactNode}) {
  return (
    <div className="fixed bottom-0 right-0 left-0 p-4 h-20">
      { children }
    </div>
  )
}
