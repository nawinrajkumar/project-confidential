"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function CameraTransition({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Dark overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.18 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-[9998]"
          />

          {/* Girl */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-[9999] pointer-events-none"

            initial={{
              x: "120vw",
              opacity: 0,
            }}

            animate={{
              x: ["120vw", "0vw", "0vw", "-120vw"],
              opacity: [0, 1, 1, 1, 0],
            }}

            transition={{
              duration: 2.3,
              times: [0, 0.35, 0.65, 1],
              ease: "easeInOut",
            }}
          >
            <motion.img
              src="/girl.png"
              alt=""
              className="w-48 sm:w-56 md:w-72 lg:w-80 select-none"

              animate={{
                y: [0, -5, 0, -5, 0],
                rotate: [0, -1.5, 0],
              }}

              transition={{
                duration: 0.6,
                repeat: Infinity,
              }}
            />

            {/* Camera Flash */}

            <motion.div
              className="absolute w-24 h-24 rounded-full bg-white blur-2xl"

              initial={{
                opacity: 0,
                scale: 0,
              }}

              animate={{
                opacity: [0, 0, 1, 0],
                scale: [0, 0, 3, 5],
              }}

              transition={{
                duration: 2.3,
                times: [0, 0.45, 0.5, 0.6],
              }}
            />

            {/* Whole Screen Flash */}

            <motion.div
              className="fixed inset-0 bg-white"

              initial={{
                opacity: 0,
              }}

              animate={{
                opacity: [0, 0, 0.9, 0],
              }}

              transition={{
                duration: 2.3,
                times: [0, 0.45, 0.5, 0.6],
              }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
