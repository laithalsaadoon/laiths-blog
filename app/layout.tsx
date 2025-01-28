import "./globals.css";
import { AnimatedGrid } from "@/components/AnimatedGrid";
import AmplifyProvider from "@/components/ConfigureAmplify";
import { Navigation } from "@/components/Navigation";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-inter",
});

export const metadata: Metadata = {
	title: "Your Name - Software Designer & Developer",
	description:
		"Personal blog and portfolio showcasing software design, development, and thoughts on technology.",
	metadataBase: new URL("https://yourdomain.com"),
	openGraph: {
		title: "Your Name - Software Designer & Developer",
		description:
			"Personal blog and portfolio showcasing software design, development, and thoughts on technology.",
		url: "https://yourdomain.com",
		siteName: "Your Name",
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Your Name - Software Designer & Developer",
		description:
			"Personal blog and portfolio showcasing software design, development, and thoughts on technology.",
		creator: "@yourusername",
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={`${inter.variable} antialiased`}
		>
			<body className={`${inter.className} overflow-x-hidden`}>
				<div className="relative min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
					<AnimatedGrid />
					<div className="relative">
						<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
							<header className="pt-2 pb-4">
								<Navigation />
							</header>
							<AmplifyProvider>
								<main className="relative @container/main">{children}</main>
							</AmplifyProvider>
							<footer className="mt-24 sm:mt-28 lg:mt-32 pb-8 sm:pb-12 lg:pb-16">
								<div className="text-center">
									<p className="text-sm text-gray-500 dark:text-gray-400">
										&copy; {new Date().getFullYear()} Your Name. All rights
										reserved.
									</p>
									<div className="mt-4 flex justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
										<a
											href="/privacy"
											className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
										>
											Privacy Policy
										</a>
										<a
											href="/terms"
											className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
										>
											Terms of Service
										</a>
									</div>
								</div>
							</footer>
						</div>
					</div>
				</div>
			</body>
		</html>
	);
}
