import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Bot, Clock, ShieldCheck, Users, Zap, Briefcase, FileSearch, Network, TrendingUp, Mic, Phone, Maximize2, FileText } from "lucide-react";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import Lenis from "lenis";

/* ─── Animated JD Q&A Interview Widget ─── */
// Phase sequence:
// 0 → Candidate list, cursor moves toward Layla's call button
// 1 → Cursor clicks, button turns red, ripple
// 2 → Mini connecting modal appears bottom-right
// 3 → Modal expands to fullscreen Q&A with scrolling questions
// → repeats

const PHASES = [2600, 900, 2200, 6000] as const;

function JDInterviewWidget() {
  const [phase, setPhase] = useState(0);
  const [tick, setTick]   = useState(0);
  const [seconds, setSeconds] = useState(84);
  const [scrollStep, setScrollStep] = useState(0);

  // Phase runner — loops
  useEffect(() => {
    const t = setTimeout(() => setPhase(p => (p + 1) % 4), PHASES[phase]);
    return () => clearTimeout(t);
  }, [phase]);

  // Reset scroll on phase 3 entry
  useEffect(() => {
    if (phase === 3) {
      setScrollStep(0);
      setSeconds(84);
    }
  }, [phase]);

  // Waveform tick (only phase 3)
  useEffect(() => {
    if (phase !== 3) return;
    const id = setInterval(() => setTick(t => t + 1), 130);
    return () => clearInterval(id);
  }, [phase]);

  // Clock (only phase 3)
  useEffect(() => {
    if (phase !== 3) return;
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(id);
  }, [phase]);

  // Auto-scroll questions every 1.6 s (phase 3)
  useEffect(() => {
    if (phase !== 3) return;
    const id = setInterval(() => setScrollStep(s => Math.min(s + 1, 3)), 1600);
    return () => clearInterval(id);
  }, [phase]);

  const fmt = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const waveHeights = Array.from({ length: 16 }, (_, i) =>
    10 + 18 * Math.abs(Math.sin(tick * 0.38 + i * 0.72))
  );

  const questions = [
    { q: "How have you handled cross-functional team coordination?",  a: "Structured response demonstrating leadership and actionable metrics." },
    { q: "Describe a time you improved an inefficient process.",       a: "Structured response demonstrating leadership and actionable metrics." },
    { q: "Explain a scenario where you resolved a major stakeholder dispute.", a: "Structured response demonstrating leadership and actionable metrics." },
  ];

  // Cursor positions: idle → over row → on button
  const cursorX = phase === 0 ? "82%" : phase === 1 ? "88%" : "88%";
  const cursorY = phase === 0 ? "58%" : phase === 1 ? "15%" : "15%";

  return (
    <div className="relative w-full max-w-[520px] h-[360px] select-none scale-[1.05] md:scale-[1.15] origin-center">
      
      {/* ── PHASES 0, 1 & 2: Candidate List (Background) ── */}
      <motion.div
        animate={{
          opacity: phase >= 3 ? 0 : (phase === 2 ? 0.3 : 1),
          scale: phase >= 3 ? 0.95 : 1,
          pointerEvents: phase >= 2 ? "none" : "auto"
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 w-full rounded-[2rem] overflow-hidden shadow-2xl border border-gray-200/80 bg-[#f3f4f8] p-5 z-10"
      >
        <div className="space-y-3">
          {/* Layla's row */}
          <motion.div
            className="relative bg-white rounded-2xl px-5 py-4 flex items-center gap-4 shadow-sm border border-gray-100"
            animate={phase === 1 || phase === 2 ? { borderColor: "#7c3aed", boxShadow: "0 0 0 3px rgba(124,58,237,0.15)" } : {}}
            transition={{ duration: 0.3 }}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7c5cbf] to-[#3d2080] flex items-center justify-center shrink-0 border-2 border-[#a78bfa]/40 overflow-hidden">
              <span className="text-white text-lg font-light">L</span>
            </div>
            <div className="flex-1">
              <p className="text-gray-900 font-bold text-base">Layla Munoz</p>
              <p className="text-gray-400 text-sm">Senior Marketer III</p>
            </div>
            <motion.div
              animate={phase === 1 || phase === 2
                ? { backgroundColor: "#e02020", scale: phase === 1 ? [1, 0.88, 1.1, 1] : 1, boxShadow: "0 0 18px rgba(224,32,32,0.55)" }
                : { backgroundColor: "#ede9fe", scale: 1 }
              }
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
            >
              <Phone
                className="w-5 h-5 -rotate-12"
                style={{ color: phase === 1 || phase === 2 ? "#ffffff" : "#7c3aed" }}
              />
            </motion.div>
          </motion.div>

          {/* Zoya's row */}
          <div className="bg-white rounded-2xl px-5 py-4 flex items-center gap-4 shadow-sm border border-gray-100 opacity-80">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#bfa87c] to-[#7d6b3d] flex items-center justify-center shrink-0 border-2 border-amber-200/40 overflow-hidden">
              <span className="text-white text-lg font-light">Z</span>
            </div>
            <div className="flex-1">
              <p className="text-gray-900 font-bold text-base">Zoya Khan</p>
              <p className="text-gray-400 text-sm">Junior Data Engineer</p>
            </div>
            <div className="w-11 h-11 rounded-full bg-[#ede9fe] flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 -rotate-12 text-[#7c3aed]" />
            </div>
          </div>

          {/* David's row */}
          <div className="bg-white rounded-2xl px-5 py-4 flex items-center gap-4 shadow-sm border border-gray-100 opacity-60">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4b8fb3] to-[#25526b] flex items-center justify-center shrink-0 border-2 border-blue-200/40 overflow-hidden">
              <span className="text-white text-lg font-light">D</span>
            </div>
            <div className="flex-1">
              <p className="text-gray-900 font-bold text-base">David Kim</p>
              <p className="text-gray-400 text-sm">Product Manager</p>
            </div>
            <div className="w-11 h-11 rounded-full bg-[#ede9fe] flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 -rotate-12 text-[#7c3aed]" />
            </div>
          </div>

          {/* Sarah's row */}
          <div className="bg-white rounded-2xl px-5 py-4 flex items-center gap-4 shadow-sm border border-gray-100 opacity-40">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c95b74] to-[#732f40] flex items-center justify-center shrink-0 border-2 border-rose-200/40 overflow-hidden">
              <span className="text-white text-lg font-light">S</span>
            </div>
            <div className="flex-1">
              <p className="text-gray-900 font-bold text-base">Sarah Jenkins</p>
              <p className="text-gray-400 text-sm">UX Designer</p>
            </div>
            <div className="w-11 h-11 rounded-full bg-[#ede9fe] flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 -rotate-12 text-[#7c3aed]" />
            </div>
          </div>
        </div>

        {/* Animated cursor (only in phases 0 and 1) */}
        <AnimatePresence>
          {(phase === 0 || phase === 1) && (
            <motion.div
              className="absolute pointer-events-none z-30"
              animate={{ left: cursorX, top: cursorY }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: phase === 0 ? 1.8 : 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <svg width="22" height="26" viewBox="0 0 22 26" fill="none">
                <path d="M2 2L2 20L7 15L10 22L13 21L10 14L17 14L2 2Z" fill="white" stroke="#111" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase 1: red ripple on button */}
        <AnimatePresence>
          {phase === 1 && (
            <motion.div
              className="absolute pointer-events-none z-20 rounded-full border-2 border-red-400"
              style={{ right: "34px", top: "calc(28px + 9px)", width: 44, height: 44 }}
              initial={{ scale: 1, opacity: 0.7 }}
              animate={{ scale: 2.2, opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── PHASE 2: Mini connecting modal (overlaid bottom-right) ── */}
      <AnimatePresence>
        {phase === 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.4, x: 20, y: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.55, ease: [0.34, 1.3, 0.64, 1] }}
            className="absolute bottom-6 right-6 w-44 rounded-2xl overflow-hidden shadow-2xl border border-[#4c3b7a]/60 z-20"
            style={{ background: "linear-gradient(160deg, #1e153b 0%, #140c24 100%)" }}
          >
            <div className="relative flex flex-col items-center justify-center py-6 gap-2">
              <motion.div
                animate={{ scale: [1, 1.7, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="absolute w-16 h-16 rounded-full border border-[#a78bfa]/40"
              />
              <div className="w-14 h-14 rounded-full border-2 border-[#a78bfa]/50 bg-gradient-to-br from-[#5B3FA6] to-[#1e153b] flex items-center justify-center z-10 shadow-lg">
                <span className="text-white text-xl font-light">L</span>
              </div>
              <p className="text-white font-semibold text-sm z-10">Layla Munoz</p>
              <p className="text-gray-400 text-xs z-10">Connecting...</p>
              <div className="w-9 h-9 rounded-full bg-[#B22D34] flex items-center justify-center mt-1 z-10 shadow-md">
                <Phone className="w-4 h-4 text-white rotate-[135deg]" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── PHASE 3: Fullscreen Q&A ── */}
      <AnimatePresence>
        {phase === 3 && (
          <motion.div
            key="fullscreen"
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full rounded-[2rem] overflow-hidden border border-[#3B2875] shadow-2xl z-30 flex flex-col"
            style={{ background: "linear-gradient(180deg, #1e153b 0%, #140c24 100%)" }}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 shrink-0">
              <div className="flex items-center gap-2">
                <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.1, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-[#a78bfa]" />
                <span className="text-white/70 text-xs font-semibold tracking-widest uppercase">Question Bank</span>
              </div>
              <span className="text-white/30 text-xs">Live Session</span>
            </div>

            <div className="flex flex-1 min-h-0">
              {/* Left caller panel */}
              <div className="w-[175px] shrink-0 flex flex-col items-center justify-center py-7 px-4 border-r border-white/5 relative overflow-hidden h-full">
                {/* Hex grid bg */}
                <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
                  style={{
                    backgroundImage: "linear-gradient(rgba(167,139,250,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.8) 1px, transparent 1px)",
                    backgroundSize: "18px 18px",
                  }}
                />
                <div className="flex flex-col items-center justify-center h-full">
                  {/* Avatar */}
                  <div className="relative mb-3 z-10">
                    <div className="w-20 h-20 rounded-full border-2 border-[#a78bfa]/60 bg-gradient-to-br from-[#5B3FA6] to-[#1e153b] flex items-center justify-center shadow-[0_0_30px_rgba(167,139,250,0.5)]">
                      <span className="text-white text-2xl font-light">L</span>
                    </div>
                    <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-[-6px] rounded-full border border-[#a78bfa]/40" />
                  </div>
                  <p className="text-white font-semibold text-sm z-10 mb-0.5">Layla Munoz</p>
                  <p className="text-[#a78bfa] text-sm font-mono z-10 mb-4">{fmt(seconds)}</p>
                  {/* Live waveform */}
                  <div className="flex items-center gap-[2.5px] h-8 mb-5 z-10 shrink-0">
                    {waveHeights.map((h, i) => (
                      <div key={i} className="w-[2px] rounded-full"
                        style={{ height: `${h}px`, background: "linear-gradient(to top, #5531A7, #a78bfa)", transition: "height 130ms ease-in-out" }} />
                    ))}
                  </div>
                  {/* Controls */}
                  <div className="flex items-center gap-3 z-10">
                    <div className="w-10 h-10 rounded-full bg-[#B22D34] flex items-center justify-center shadow-lg">
                      <Phone className="w-4 h-4 text-white rotate-[135deg]" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center">
                      <Mic className="w-4 h-4 text-white" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center">
                      <Maximize2 className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: auto-scrolling Q&A */}
              <div className="flex-1 overflow-hidden h-full relative">
                <motion.div
                  animate={{ y: -scrollStep * 88 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="py-4 px-4 space-y-3 absolute top-0 left-0 w-full"
                >
                  {/* Faded old question at top */}
                  <div className="opacity-35 pl-1 pb-2 border-b border-white/5">
                    <p className="text-white/50 text-xs leading-snug">managing high-volume operations?</p>
                    <p className="text-[#a78bfa] text-[10px] font-bold tracking-widest uppercase mt-1 mb-0.5">Expected Answer</p>
                    <p className="text-white/40 text-xs leading-relaxed">Structured response demonstrating leadership and actionable metrics.</p>
                  </div>

                  {questions.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.18, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-2"
                    >
                      <div className="bg-[#1a1033]/70 border border-white/8 rounded-xl p-3">
                        <p className="text-white text-xs leading-relaxed font-medium">{item.q}</p>
                      </div>
                      <div className="pl-1">
                        <p className="text-[#a78bfa] text-[10px] font-bold tracking-widest uppercase mb-0.5">Expected Answer</p>
                        <p className="text-white/60 text-xs leading-relaxed">{item.a}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

}

export function LandingPage() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const DarkSection = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <section className={`relative py-32 px-6 md:px-12 bg-gradient-to-b from-[#110524] to-[#05010F] text-white ${className}`}>
      {children}
    </section>
  );

  const WhiteSection = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <section className={`relative py-32 px-6 md:px-12 bg-[#FAFAFA] text-gray-900 border-y border-gray-100 ${className}`}>
      {children}
    </section>
  );

  // Stagger variants - borrowed from SlideHRAutomation
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.18, delayChildren: 0.3 }
    }
  };
  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
  };

  return (
    <div className="bg-gradient-to-b from-[#110524] to-[#05010F] text-white min-h-screen font-sans selection:bg-[#8B61F6]/30 overflow-x-hidden" style={{ zoom: 0.9 }}>
      
      {/* FLOATING PILL HEADER */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[1344px] rounded-full bg-[#111116]/80 backdrop-blur-xl border border-white/10 py-3 px-8 flex justify-between items-center text-white shadow-2xl transition-all">
        <div className="flex items-center">
          <img
            src="/black_logo.svg"
            alt="Intervue"
            className="h-6 w-auto object-contain"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </div>
        <Link 
          to="/presentation" 
          className="px-6 py-2.5 bg-[#6D42D0] hover:bg-[#8B61F6] border border-white/10 text-white rounded-full text-sm font-semibold transition-colors flex items-center gap-2 shadow-lg"
        >
          Get Started
        </Link>
      </header>

      {/* SECTION 1: HERO — LEFT ALIGNED + FORM */}
      <div className="relative min-h-screen bg-transparent flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-32 pb-20 overflow-hidden">
        {/* Radial glow — matches SlideHRAutomation decor */}
        <div
          className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-20"
          style={{ background: 'radial-gradient(circle at 75% 50%, #3B2875 0%, transparent 55%)' }}
        />
        <div className="absolute w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] top-[-10%] left-[-10%] animate-[spin_40s_linear_infinite]" />

        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* LEFT: Staggered text — SlideHRAutomation / SlideThree animation style */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="lg:col-span-7 space-y-8"
          >

            {/* Main headline — mixed sans + serif italic (SlideOne / IntroSlide style) */}
            <motion.h1
              variants={itemVariants}
              className="text-[3rem] md:text-[4rem] lg:text-[4.5rem] font-medium tracking-tight leading-[1.05]"
            >
              AI-Powered{" "}<br />
              <span className="font-serif font-thin text-gray-300">HR Screening,</span><br />
              <span className="font-serif italic text-[#8B61F6] font-light">at enterprise scale.</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p variants={itemVariants} className="text-xl text-gray-400 font-light leading-relaxed max-w-xl">
              Automate your entire HR screening pipeline — from initial candidate outreach to structured interviews — with AI agents that never sleep.
            </motion.p>

            {/* Stats row — SlideOne stat card pattern */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10"
            >
              {[
                { val: "80%", label: "Less HR effort" },
                { val: "20K+", label: "Candidates screened/mo" },
                { val: "3x", label: "Faster time-to-hire" },
              ].map((stat, i) => (
                <motion.div key={i} variants={itemVariants} className="flex flex-col gap-1">
                  <span className="text-3xl font-medium text-white">{stat.val}</span>
                  <span className="text-sm text-gray-500 font-light">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT: Glassmorphic form card — SlideThree card style */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 bg-[#1A1033] border border-[#3B2875] rounded-3xl p-8 shadow-2xl relative overflow-hidden"
          >
            {/* Inner glow — matches SlideThree */}
            <div className="absolute top-[-50%] right-[-50%] w-[100%] h-[100%] bg-gradient-to-br from-[#8B61F6]/20 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div>
                <p className="text-[#8B61F6] text-xs font-bold tracking-[0.2em] uppercase mb-2">Get Early Access</p>
                <h2 className="text-2xl font-medium text-white leading-snug">
                  See the platform <span className="font-serif italic font-light text-gray-300">in action</span>
                </h2>
                <p className="text-gray-400 text-sm mt-2 font-light">
                  Schedule a live demo with our team and transform your hiring within weeks.
                </p>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-500 font-medium uppercase tracking-wider">First Name</label>
                    <input
                      type="text"
                      placeholder="Priya"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#8B61F6]/60 focus:bg-white/10 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-500 font-medium uppercase tracking-wider">Last Name</label>
                    <input
                      type="text"
                      placeholder="Sharma"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#8B61F6]/60 focus:bg-white/10 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-gray-500 font-medium uppercase tracking-wider">Work Email</label>
                  <input
                    type="email"
                    placeholder="priya@company.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#8B61F6]/60 focus:bg-white/10 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-gray-500 font-medium uppercase tracking-wider">Company</label>
                  <input
                    type="text"
                    placeholder="Acme Corp"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#8B61F6]/60 focus:bg-white/10 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-gray-500 font-medium uppercase tracking-wider">Monthly Hiring Volume</label>
                  <select className="w-full bg-[#111116] border border-white/10 rounded-xl px-4 py-3 text-gray-300 text-sm focus:outline-none focus:border-[#8B61F6]/60 transition-all appearance-none cursor-pointer">
                    <option value="">Select range...</option>
                    <option>1–500 applicants/month</option>
                    <option>500–5,000 applicants/month</option>
                    <option>5,000–20,000 applicants/month</option>
                    <option>20,000+ applicants/month</option>
                  </select>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-[#8B61F6] hover:bg-[#6D42D0] text-white py-4 rounded-xl font-semibold text-sm tracking-wide transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(139,97,246,0.4)]"
                >
                  Request a Demo
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </form>

              <p className="text-xs text-gray-600 text-center font-light">No spam. Cancel anytime. Trusted by enterprise HR teams.</p>
            </div>
          </motion.div>
        </div>
      </div>



      {/* SECTION 3: THE CHALLENGE (DARK) */}
      <DarkSection>
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[#6D42D0] font-bold tracking-[0.2em] text-sm uppercase mb-6">The Challenge</p>
            <h2 className="text-[3.5rem] md:text-[4.5rem] font-medium tracking-tight leading-[1.1] mb-8">
              The <span className="font-serif italic text-gray-300 font-light">Screening</span><br />Bottleneck
            </h2>
            <p className="text-xl text-gray-400 font-light leading-relaxed max-w-lg">
              HR teams spend 80% of their time on repetitive screening tasks — phone calls, initial assessments, and scheduling — leaving little room for strategic hiring decisions.
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              { title: "Thousands of Applicants", desc: "HR teams drowning in unqualified candidates.", icon: <Users className="w-6 h-6 text-white" /> },
              { title: "Slow Screening Cycles", desc: "Manual calls take weeks to complete.", icon: <Clock className="w-6 h-6 text-white" /> },
              { title: "Inconsistent Evaluation", desc: "Different interviewers, different standards.", icon: <ShieldCheck className="w-6 h-6 text-white" /> }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#1a0b3b] border border-[#8B61F6]/20 p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5 rounded-[2rem] hover:bg-[#241052] transition-colors"
              >
                <div className="p-4 bg-[#6D42D0]/20 rounded-2xl border border-[#8B61F6]/30 shrink-0">
                  {stat.icon}
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-xl font-medium text-white mb-1">{stat.title}</h3>
                  <p className="text-gray-400">{stat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </DarkSection>

      {/* SECTION 3.5: JD-BASED Q&A INTERVIEW ANIMATION (WHITE) */}
      <WhiteSection>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <p className="text-[#6D42D0] font-bold tracking-[0.2em] text-sm uppercase">AI HR Screening</p>
            <h2 className="text-[3rem] md:text-[4rem] font-medium text-gray-900 tracking-tight leading-[1.05]">
              Automated{" "}
              <span className="font-serif italic text-[#6D42D0] font-light">HR Screening</span>{" "}
              Calls
            </h2>
            <p className="text-xl text-gray-500 font-light leading-relaxed max-w-md">
              AI agents conduct structured screening calls with every candidate, asking JD-specific questions and evaluating responses in real time.
            </p>

            <div className="space-y-4 pt-2">
              {[
                "Screening questions auto-generated from Job Description",
                "Every candidate evaluated with identical criteria",
                "Real-time scoring and instant HR feedback reports",
              ].map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-3 text-gray-600 font-light"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6D42D0] shrink-0" />
                  {point}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Live interview widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center lg:justify-end"
          >
            <JDInterviewWidget />
          </motion.div>
        </div>
      </WhiteSection>

      {/* SECTION 4: OUTCOMES (WHITE) */}
      <WhiteSection className="bg-white">
        <div className="grid md:grid-cols-2 gap-20 items-center max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <h2 className="text-[3.5rem] md:text-[4.5rem] font-medium text-gray-900 leading-[1.1]">
              Instant <br/>
              <span className="font-serif italic text-gray-400 font-light">HR Insights</span>
            </h2>
            <p className="text-xl text-gray-500 font-light leading-relaxed max-w-md">
              Your HR team gets structured screening reports instantly — candidate scores, communication assessments, and hiring recommendations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#FAFAFA] border border-gray-100 p-8 rounded-[2rem] flex items-center justify-between shadow-sm"
            >
              <div>
                <p className="text-gray-900 font-semibold mb-1 text-lg">HR Screening Time Saved</p>
                <p className="text-sm text-gray-500">From weeks to hours</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-4xl font-medium text-gray-900">-80%</span>
                <TrendingUp className="w-6 h-6 text-gray-400 rotate-180" />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#FAFAFA] border border-gray-100 p-8 rounded-[2rem] flex items-center justify-between shadow-sm"
            >
              <div>
                <p className="text-gray-900 font-semibold mb-1 text-lg">Qualified Candidates Surfaced</p>
                <p className="text-sm text-gray-500">Pre-screened and ready for HR review</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-4xl font-medium text-[#6D42D0]">5-10%</span>
                <Zap className="w-6 h-6 text-[#6D42D0]/50" />
              </div>
            </motion.div>
          </div>
        </div>
      </WhiteSection>

      {/* SECTION 5: VOICE AI INTRO (DARK) */}
      <DarkSection>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-1/2 relative"
          >
            <div className="aspect-square rounded-[3rem] bg-[#111116] border border-white/5 flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-md shadow-2xl">
              <div className="relative z-10 w-32 h-32 rounded-full bg-[#111116] border border-white/10 flex items-center justify-center shadow-[0_0_100px_rgba(255,255,255,0.05)]">
                {[1, 2, 3].map((ring) => (
                  <motion.div
                    key={ring}
                    animate={{ 
                      scale: [1, 1.8, 1],
                      opacity: [0.05, 0.2, 0.05]
                    }}
                    transition={{ 
                      duration: 4,
                      delay: ring * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute top-1/2 left-1/2 w-40 h-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white pointer-events-none"
                  />
                ))}
                <Mic className="w-12 h-12 text-[#6D42D0] relative z-20" />
              </div>
              <div className="mt-12 text-center relative z-10">
                <p className="text-gray-400 uppercase tracking-[0.2em] text-xs font-semibold mb-4">HR Screening Agent</p>
                <p className="text-white text-2xl font-serif font-light">"Walk me through your experience..."</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-1/2 space-y-6"
          >
            <p className="text-[#6D42D0] font-bold tracking-[0.2em] text-sm uppercase">Voice-Powered HR Screening</p>
            <h2 className="text-[3.5rem] md:text-[4rem] font-medium leading-[1.1]">
              Conversational <br/>
              <span className="font-serif italic text-gray-300 font-light">HR Screening</span>
            </h2>
            <p className="text-xl text-gray-400 font-light leading-relaxed">
              AI voice agents conduct structured HR screening calls, assessing communication, domain expertise, and cultural fit — all without human intervention.
            </p>
            <ul className="space-y-4 pt-6">
              {[
                "Every candidate receives the same HR screening experience",
                "Zero interviewer fatigue or scheduling conflicts",
                "Structured HR feedback reports generated instantly"
              ].map((point, i) => (
                <li key={i} className="flex items-center gap-4 text-gray-300 font-light border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <div className="w-2 h-2 rounded-full bg-[#8B61F6] shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </DarkSection>

      {/* SECTION 6: SOLUTION FEATURES (WHITE) */}
      <WhiteSection>
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[#6D42D0] font-bold tracking-[0.2em] text-sm uppercase mb-4">HR Screening Platform</p>
            <h2 className="text-[3rem] md:text-[4rem] font-medium tracking-tight text-gray-900 leading-[1.1] mb-6">
              Automated. <span className="font-serif italic font-light text-gray-500">Consistent.</span> Fair.
            </h2>
            <p className="text-xl text-gray-500 font-light max-w-3xl mx-auto leading-relaxed mb-20">
              Replace manual HR screening with AI agents that call, evaluate, and rank every candidate — giving your HR team superpowers.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              { title: "AI Screening Calls", desc: "Conduct automated HR screening calls with natural, human-like conversation.", icon: <FileSearch className="w-8 h-8 text-[#8B61F6]" /> },
              { title: "JD-Based Evaluation", desc: "Every screening question generated directly from the Job Description.", icon: <Bot className="w-8 h-8 text-[#6D42D0]" /> },
              { title: "Hiring Intelligence", desc: "Structured scorecards and HR-ready reports for every screened candidate.", icon: <Briefcase className="w-8 h-8 text-[#5334b7]" /> }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-shadow"
              >
                <div className="h-full rounded-2xl p-8 cursor-default">
                  <div className="mb-6 bg-[#f4f0ff] w-16 h-16 flex items-center justify-center rounded-xl border border-[#6D42D0]/10">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-medium mb-4 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </WhiteSection>

      {/* FOOTER CTA (DARK) */}
      <footer className="bg-gradient-to-b from-[#110524] to-[#05010F] pt-40 pb-20 px-6 text-center border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#6D42D0]/30 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-[400px] bg-[#6D42D0]/10 blur-[100px] pointer-events-none rounded-full" />

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-3xl mx-auto flex flex-col items-center"
        >
          <h2 className="text-[3rem] md:text-[4.5rem] font-medium text-white tracking-tight leading-[1] mb-8">
            Ready to <span className="font-serif italic text-gray-300 font-light">automate</span> your HR screening?
          </h2>
          <p className="text-xl text-gray-400 font-light mb-12">
            See how enterprise teams are using AI to screen thousands of candidates — with zero manual calls.
          </p>
          <Link 
            to="/presentation" 
            className="px-10 py-5 bg-white text-black hover:bg-gray-200 rounded-full text-lg font-semibold transition-colors flex items-center gap-3 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </footer>

    </div>
  );
}
