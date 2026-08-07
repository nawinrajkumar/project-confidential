"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { DATE_OPTIONS, LOADING_MESSAGES, YES_COPY } from "./constants";

const STAGES = {
  MISSION: "mission",
  OPTIONS: "options",
  CONFIRMATION: "confirmation",
  FINAL: "final",
};

const screenTransition = { duration: 0.5, ease: "easeOut" };

function GlassCard({ children, className = "" }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -18, scale: 0.98 }}
      transition={screenTransition}
      className={`rounded-[2rem] border border-white/70 bg-white/55 p-6 shadow-[0_24px_80px_rgba(87,62,47,0.18)] backdrop-blur-xl sm:p-10 ${className}`}
    >
      {children}
    </motion.section>
  );
}

function MissionScreen({ onComplete }) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const messageTimer = window.setInterval(() => {
      setMessageIndex((current) => (current + 1) % LOADING_MESSAGES.length);
    }, 700);
    const completionTimer = window.setTimeout(onComplete, 7000);

    return () => {
      window.clearInterval(messageTimer);
      window.clearTimeout(completionTimer);
    };
  }, [onComplete]);

  return (
    <GlassCard className="w-full max-w-xl text-center">
      <motion.div
        animate={{ rotate: [0, 3, -3, 0], y: [0, -5, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="mb-7 text-5xl"
      >
        {YES_COPY.missionIcon}
      </motion.div>
      <h1 className="font-heading text-4xl font-bold text-stone-900 sm:text-5xl">
        {YES_COPY.missionTitle}
      </h1>
      <p className="mt-4 text-lg text-stone-600 sm:text-xl">
        {YES_COPY.missionSubtitle}
      </p>
      <p className="mt-3 text-sm italic text-stone-500 sm:text-base">
        {YES_COPY.missionStatus}
      </p>
      <div className="mt-12 h-3 overflow-hidden rounded-full bg-stone-200/80">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 7, ease: "easeInOut" }}
          className="h-full rounded-full bg-gradient-to-r from-rose-400 via-amber-400 to-emerald-400"
        />
      </div>
      <div className="mt-6 h-7 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={LOADING_MESSAGES[messageIndex]}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="text-sm font-medium text-stone-600 sm:text-base"
          >
            {LOADING_MESSAGES[messageIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    </GlassCard>
  );
}

function DateOptionCard({ option, index, isSelected, onSelect }) {
  const [ripple, setRipple] = useState(0);

  const selectOption = () => {
    setRipple((current) => current + 1);
    onSelect(option);
  };

  return (
    <motion.button
      type="button"
      onClick={selectOption}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: [0, -4, 0] }}
      whileHover={{ y: -7, scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      transition={{
        opacity: { duration: 0.35, delay: index * 0.06 },
        y: { duration: 3.2, delay: index * 0.14, repeat: Infinity, ease: "easeInOut" },
        scale: { duration: 0.2 },
      }}
      className={`relative min-h-44 overflow-hidden rounded-3xl border p-6 text-left shadow-lg backdrop-blur-xl transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-300/70 ${
        isSelected
          ? "border-rose-300 bg-rose-50/85 shadow-rose-200/70 ring-2 ring-rose-300/70"
          : "border-white/75 bg-white/55 hover:bg-white/75"
      }`}
    >
      <AnimatePresence>
        {ripple > 0 && (
          <motion.span
            key={ripple}
            initial={{ scale: 0, opacity: 0.45 }}
            animate={{ scale: 7, opacity: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="pointer-events-none absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-300"
          />
        )}
      </AnimatePresence>
      <div className="relative flex items-start justify-between gap-4">
        <h2 className="text-xl font-semibold text-stone-900">{option.title}</h2>
        <AnimatePresence>
          {isSelected && (
            <motion.span
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 45 }}
              className="grid size-7 shrink-0 place-items-center rounded-full bg-rose-500 text-sm font-bold text-white"
            >
              {YES_COPY.selectedIcon}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <p className="relative mt-4 whitespace-pre-line text-sm leading-6 text-stone-600 sm:text-base">
        {option.description}
      </p>
    </motion.button>
  );
}

function OptionsScreen({ selectedOption, onSelect, onContinue }) {
  return (
    <GlassCard className="w-full max-w-5xl">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-heading text-3xl font-bold text-stone-900 sm:text-5xl">
          {YES_COPY.questionTitle}
        </h1>
        <p className="mt-5 text-lg text-stone-600 sm:text-xl">{YES_COPY.questionBody}</p>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {DATE_OPTIONS.map((option, index) => (
          <DateOptionCard
            key={option.id}
            option={option}
            index={index}
            isSelected={selectedOption?.id === option.id}
            onSelect={onSelect}
          />
        ))}
      </div>
      <AnimatePresence>
        {selectedOption && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-9 text-center"
          >
            <motion.button
              type="button"
              onClick={onContinue}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="rounded-full bg-stone-900 px-9 py-4 text-base font-semibold text-white shadow-xl shadow-stone-900/20"
            >
              {YES_COPY.continueLabel}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}

function ConfirmationScreen({ selectedOption, onContinue }) {
  return (
    <GlassCard className="w-full max-w-2xl text-center">
      <h1 className="font-heading text-4xl font-bold text-stone-900 sm:text-5xl">
        {YES_COPY.confirmationTitle}
      </h1>
      <p className="mt-7 whitespace-pre-line text-base leading-7 text-stone-600 sm:text-lg sm:leading-8">
        {YES_COPY.confirmationBody}
      </p>
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 18 }}
        className="mt-9 rounded-3xl border border-rose-200 bg-gradient-to-br from-rose-50 to-amber-50 p-6 shadow-lg shadow-rose-100"
      >
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-rose-500">
          {YES_COPY.selectedDateLabel}
        </p>
        <p className="mt-3 text-2xl font-semibold text-stone-900">{selectedOption.title}</p>
      </motion.div>
      <motion.button
        type="button"
        onClick={onContinue}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="mt-10 rounded-full bg-rose-500 px-9 py-4 text-base font-semibold text-white shadow-xl shadow-rose-300/40"
      >
        {YES_COPY.confirmationButton}
      </motion.button>
    </GlassCard>
  );
}

function FinalScreen() {
  return (
    <GlassCard className="w-full max-w-2xl text-center">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 14 }}
        className="text-5xl"
      >
        {YES_COPY.finalIcon}
      </motion.div>
      <h1 className="mt-6 font-heading text-4xl font-bold text-stone-900 sm:text-5xl">
        {YES_COPY.finalTitle}
      </h1>
      <p className="mt-7 whitespace-pre-line text-base leading-7 text-stone-600 sm:text-lg sm:leading-8">
        {YES_COPY.finalBody}
      </p>
      <div className="mt-10 border-t border-stone-200 pt-7 text-sm leading-7 text-stone-500">
        {YES_COPY.finalFooter.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </GlassCard>
  );
}

export default function YesExperience() {
  const [stage, setStage] = useState(STAGES.MISSION);
  const [selectedOption, setSelectedOption] = useState(null);
  const completeMission = useCallback(() => setStage(STAGES.OPTIONS), []);

  const showConfirmation = () => {
    if (!selectedOption) return;

    void fetch("/api/response", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answer: "yes", dateType: selectedOption.title }),
    });
    setStage(STAGES.CONFIRMATION);
  };

  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-8 sm:px-8 sm:py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(244,114,182,0.2),transparent_38%)]" />
      <AnimatePresence mode="wait">
        <motion.div
          key={stage}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={screenTransition}
          className="relative z-10 flex w-full justify-center"
        >
          {stage === STAGES.MISSION && (
            <MissionScreen onComplete={completeMission} />
          )}
          {stage === STAGES.OPTIONS && (
            <OptionsScreen
              selectedOption={selectedOption}
              onSelect={setSelectedOption}
              onContinue={showConfirmation}
            />
          )}
          {stage === STAGES.CONFIRMATION && (
            <ConfirmationScreen
              selectedOption={selectedOption}
              onContinue={() => setStage(STAGES.FINAL)}
            />
          )}
          {stage === STAGES.FINAL && <FinalScreen />}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
