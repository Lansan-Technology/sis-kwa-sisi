import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Footer, Header } from "@/components";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <body className={"h-screen w-full"}>
          <Header />
          <main className="">{children}</main>
          <Footer />
          <ToastContainer />
        </body>
      </html>
    </>
  );
}
