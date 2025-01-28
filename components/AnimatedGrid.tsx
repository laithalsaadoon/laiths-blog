"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export function AnimatedGrid() {
	const [isMobile, setIsMobile] = useState(false);
	const mouseXSpring = useSpring(0, { damping: 50, stiffness: 400 });
	const mouseYSpring = useSpring(0, { damping: 50, stiffness: 400 });

	const translateX = useTransform(mouseXSpring, [-0.5, 0.5], ["-2%", "2%"]);
	const translateY = useTransform(mouseYSpring, [-0.5, 0.5], ["-2%", "2%"]);

	useEffect(() => {
		const checkIfMobile = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		checkIfMobile();
		window.addEventListener("resize", checkIfMobile);

		return () => window.removeEventListener("resize", checkIfMobile);
	}, []);

	useEffect(() => {
		if (!isMobile) {
			const handleMouseMove = (e: MouseEvent) => {
				const x = e.clientX / window.innerWidth - 0.5;
				const y = e.clientY / window.innerHeight - 0.5;

				mouseXSpring.set(x);
				mouseYSpring.set(y);
			};

			window.addEventListener("mousemove", handleMouseMove);
			return () => window.removeEventListener("mousemove", handleMouseMove);
		}
	}, [isMobile, mouseXSpring, mouseYSpring]);

	// For mobile, we'll automatically animate the springs
	useEffect(() => {
		if (isMobile) {
			const interval = setInterval(() => {
				const time = Date.now() / 2000; // Slow, gentle movement
				mouseXSpring.set(Math.sin(time) * 0.3);
				mouseYSpring.set(Math.cos(time * 0.8) * 0.2);
			}, 16);

			return () => clearInterval(interval);
		}
	}, [isMobile, mouseXSpring, mouseYSpring]);

	return (
		<div className="absolute inset-0 overflow-hidden">
			<motion.div
				className="absolute inset-0 bg-[linear-gradient(to_right,#80808030_1px,transparent_1px),linear-gradient(to_bottom,#80808030_1px,transparent_1px)] bg-[size:24px_24px] sm:bg-[size:32px_32px] lg:bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
				style={{
					x: translateX,
					y: translateY,
					scale: 1.1,
				}}
				initial={{ opacity: 0.5 }}
				animate={{
					opacity: [0.5, 0.7, 0.5],
				}}
				transition={{
					opacity: {
						duration: 8,
						ease: "easeInOut",
						repeat: Number.POSITIVE_INFINITY,
					},
				}}
			/>
		</div>
	);
}
