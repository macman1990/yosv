import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  scale?: number;
  as?: keyof React.JSX.IntrinsicElements;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  delay = 0,
  y = 24,
  scale = 0.98,
  as: Component = 'div',
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      as={Component}
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y, scale }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
};
