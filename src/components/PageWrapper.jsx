// src/components/PageWrapper.js
import { motion } from "framer-motion";
import { pageTransition } from "../utils/animations";

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
      transition={pageTransition.transition}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}

export default PageWrapper;