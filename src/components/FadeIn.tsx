import { motion, type HTMLMotionProps } from "framer-motion";
import { fadeInUp } from "@/lib/motionVariants";

interface FadeInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
  yOffset?: number;
}

export function FadeIn({
  children,
  delay = 0,
  duration,
  yOffset,
  className,
  ...props
}: FadeInProps) {
  // We can merge custom props if needed, but for now we'll just use the standard fadeInUp variants
  // and pass the delay via transition if a custom delay is provided.
  const customVariants = {
    ...fadeInUp,
    visible: {
      ...fadeInUp.visible,
      transition: {
        ...(fadeInUp.visible as any).transition,
        ...(delay ? { delay } : {}),
        ...(duration ? { duration } : {}),
      },
    },
    hidden: {
      ...fadeInUp.hidden,
      ...(yOffset !== undefined ? { y: yOffset } : {}),
    },
  };

  return (
    <motion.div
      variants={customVariants as any}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
