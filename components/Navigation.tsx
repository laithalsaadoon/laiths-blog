"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

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

	useEffect(() => {
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

	return (
		<nav className="relative flex items-center justify-between py-4">
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
								// Reset after animation
								setTimeout(() => setIsChanging(false), 200);
							}}
							className={clsx(
								"relative rounded-lg px-4 py-2.5 text-sm text-gray-700 transition-colors delay-150 hover:text-gray-900 hover:delay-0 dark:text-gray-400 dark:hover:text-gray-100",
								isActive && "text-gray-900 dark:text-gray-100",
							)}
						>
							<span className="relative z-10">{item.name}</span>
							{isActive && (
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
							)}
						</Link>
					);
				})}
			</div>
		</nav>
	);
}
