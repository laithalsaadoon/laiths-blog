'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';

export function AnimatedGrid() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    
    const mouseXSpring = useSpring(0, { damping: 50, stiffness: 400 });
    const mouseYSpring = useSpring(0, { damping: 50, stiffness: 400 });

    const translateX = useTransform(mouseXSpring, [-0.5, 0.5], ['-2%', '2%']);
    const translateY = useTransform(mouseYSpring, [-0.5, 0.5], ['-2%', '2%']);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) - 0.5;
            const y = (e.clientY / window.innerHeight) - 0.5;
            
            mouseXSpring.set(x);
            mouseYSpring.set(y);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseXSpring, mouseYSpring]);

    return (
        <div className="absolute inset-0 overflow-hidden">
            <motion.div 
                className="absolute inset-0 bg-[linear-gradient(to_right,#80808030_1px,transparent_1px),linear-gradient(to_bottom,#80808030_1px,transparent_1px)] bg-[size:24px_24px] sm:bg-[size:32px_32px] lg:bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
                style={{
                    x: translateX,
                    y: translateY,
                    scale: 1.1, // Slightly larger to prevent edges from showing
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
                    }
                }}
            />
        </div>
    );
} 
