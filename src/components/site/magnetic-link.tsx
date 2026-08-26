"use client";

import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

import { Button, type ButtonProps } from "@/components/ui/button";

type MagneticLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  variant?: ButtonProps["variant"];
};

export function MagneticLink({ href, children, className, target, rel, variant = "primary" }: MagneticLinkProps) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 20 });
  const springY = useSpring(y, { stiffness: 260, damping: 20 });

  return (
    <motion.div
      style={reduce ? undefined : { x: springX, y: springY }}
      onMouseMove={(event) => {
        if (reduce) {
          return;
        }
        const bounds = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - bounds.left - bounds.width / 2) * 0.14);
        y.set((event.clientY - bounds.top - bounds.height / 2) * 0.14);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={className}
    >
      <Button asChild variant={variant}>
        <Link href={href} target={target} rel={rel}>
          {children}
        </Link>
      </Button>
    </motion.div>
  );
}
