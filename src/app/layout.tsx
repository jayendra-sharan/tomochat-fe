'use client';
import "../styles/globals.css";
import Header from "@/components/layout/Header";
import { UserDataProvider } from "@/features/auth/context/UserContext";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <UserDataProvider>
          <div id="parent" className="h-screen flex flex-col">
          <Header />
          {/* <main className="flex-1 flex flex-col bg-gray-100"> */}
          <div className="flex-1 flex flex-col bg-gray-100 min-h-0 md:w-1/2 md:mx-auto md:border">
            {children}
          </div>
          {/* </main> */}
          </div>
        </UserDataProvider>
      </body>
    </html>
  );
}
