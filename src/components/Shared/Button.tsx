import type { HTMLMotionProps } from 'framer-motion';
import { motion } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = "px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-1";
  const variants = {
    primary: "bg-primary text-white hover:bg-white hover:text-primary",
    secondary: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
