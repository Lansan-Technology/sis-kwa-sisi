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
			<html lang='en'>
				<body className={"h-screen w-full m-0 p-0"}>
					<Header />
					<main className='overflow-y-scroll'>{children}</main>
					<Footer />
					<ToastContainer
						autoClose={3000}
						bodyClassName='text-sm p-2'
					/>
				</body>
			</html>
		</>
	);
}
