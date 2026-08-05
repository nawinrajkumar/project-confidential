"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function CameraTransition({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 200 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-0 right-0 z-[999999] pointer-events-none"
        >
          <img
            src="/girl.png"
            alt="Girl taking photo"
            className="w-72 h-auto"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}