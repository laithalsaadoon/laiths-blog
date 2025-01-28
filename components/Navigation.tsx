"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const navigation = [
	{ name: "Home", href: "/" },
	{ name: "About", href: "/about" },
	{ name: "Projects", href: "/projects" },
	{ name: "Blog", href: "/blog" },
	{ name: "Speaking", href: "/speaking" },
];

export function Navigation() {
	const pathname = usePathname();
	const router = useRouter();
	const [isChanging, setIsChanging] = useState(false);
	const [activeHref, setActiveHref] = useState(pathname);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		// Handle hydration complete
		setIsMounted(true);
		// Prefetch all routes
		for (const item of navigation) {
			router.prefetch(item.href);
		}
	}, [router]);

	useEffect(() => {
		if (!isChanging) {
			setActiveHref(pathname);
		}
	}, [pathname, isChanging]);

	const handleMobileNavClick = (href: string) => {
		setIsChanging(true);
		setActiveHref(href);
		setIsMobileMenuOpen(false);
		setTimeout(() => setIsChanging(false), 200);
	};

	return (
		<nav className="relative">
			{/* Desktop Navigation */}
			<div className="hidden md:flex items-center justify-between py-4">
				<div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-gray-950 dark:via-gray-950/80 dark:to-transparent" />
				<div className="relative flex gap-8">
					{navigation.map((item) => {
						const isActive = item.href === activeHref;
						return (
							<Link
								key={item.href}
								href={item.href}
								onClick={() => {
									setIsChanging(true);
									setActiveHref(item.href);
									setTimeout(() => setIsChanging(false), 200);
								}}
								className={clsx(
									"relative rounded-lg px-4 py-2.5 text-sm text-gray-700 transition-colors delay-150 hover:text-gray-900 hover:delay-0 dark:text-gray-400 dark:hover:text-gray-100",
									isActive && "text-gray-900 dark:text-gray-100",
								)}
							>
								<span className="relative z-10">{item.name}</span>
								{isActive &&
									(isMounted ? (
										<motion.span
											layoutId="active-nav"
											className="absolute inset-0 rounded-lg bg-gray-100 dark:bg-gray-800"
											aria-hidden="true"
											transition={{
												type: "spring",
												stiffness: 200,
												damping: 25,
												mass: 0.5,
												duration: 0.2,
											}}
										/>
									) : (
										<span
											className="absolute inset-0 rounded-lg bg-gray-100 dark:bg-gray-800 transition-all duration-200"
											aria-hidden="true"
										/>
									))}
							</Link>
						);
					})}
				</div>
			</div>

			{/* Mobile Navigation */}
			<div className="md:hidden relative py-2">
				<button
					type="button"
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
					aria-label="Toggle menu"
					aria-expanded={isMobileMenuOpen}
				>
					<svg
						className="w-6 h-6 text-gray-700 dark:text-gray-300"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
						role="img"
					>
						{isMobileMenuOpen ? (
							<path d="M6 18L18 6M6 6l12 12" />
						) : (
							<path d="M4 6h16M4 12h16M4 18h16" />
						)}
					</svg>
				</button>

				<AnimatePresence mode="wait">
					{isMobileMenuOpen && (
						<motion.div
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{
								duration: 0.2,
								ease: "easeInOut",
							}}
							className="absolute top-[calc(100%-0.5rem)] left-0 right-0 bg-white dark:bg-gray-900 shadow-lg rounded-lg py-2 z-50"
						>
							{navigation.map((item) => {
								const isActive = item.href === activeHref;
								return (
									<Link
										key={item.href}
										href={item.href}
										onClick={() => handleMobileNavClick(item.href)}
										className={clsx(
											"block px-4 py-2 text-sm transition-colors",
											isActive
												? "text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800"
												: "text-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800",
										)}
									>
										{item.name}
									</Link>
								);
							})}
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</nav>
	);
}
