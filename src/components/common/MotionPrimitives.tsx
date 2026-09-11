import React from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';

interface MotionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  scale?: number;
}

const useMotionDisabled = () => {
  const { data } = usePortfolio();
  const systemReduced = useReducedMotion();
  return systemReduced || data.appearance?.motionMode === 'reduced' || data.appearance?.motionMode === 'off';
};

export const RevealOnScroll: React.FC<MotionProps> = ({ children, className, delay = 0, y = 24, scale = 0.98 }) => {
  const motionDisabled = useMotionDisabled();

  return (
    <motion.div
      className={className}
      initial={motionDisabled ? false : { opacity: 0, y, scale }}
      whileInView={motionDisabled ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: motionDisabled ? 0 : 0.7, ease: [0.22, 1, 0.36, 1], delay: motionDisabled ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
};

export const FadeUp: React.FC<MotionProps> = (props) => <RevealOnScroll {...props} />;

export const ScaleIn: React.FC<MotionProps> = ({ children, className, delay = 0 }) => (
  <RevealOnScroll className={className} delay={delay} y={8} scale={0.94}>{children}</RevealOnScroll>
);

export const ParallaxMedia: React.FC<{ children: React.ReactNode; className?: string; distance?: number }> = ({ children, className, distance = 24 }) => {
  const motionDisabled = useMotionDisabled();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], motionDisabled ? [0, 0] : [-distance, distance]);

  return <motion.div className={className} style={{ y }}>{children}</motion.div>;
};

export const StaggerChildren: React.FC<{ children: React.ReactNode; className?: string; stagger?: number }> = ({ children, className, stagger = 0.08 }) => {
  const motionDisabled = useMotionDisabled();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: motionDisabled ? 0 : stagger } },
      }}
    >
      {children}
    </motion.div>
  );
};
