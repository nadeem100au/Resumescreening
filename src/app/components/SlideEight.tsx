import { motion, AnimatePresence } from "motion/react";
import { Header } from "./Header";
import { FileSymlink, Phone, Mic, Maximize2 } from "lucide-react";
import { useState, useEffect } from "react";

const CursorSVG = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.4))" }}>
    <path d="M5.5 3.21V20.8C5.5 21.43 6.24 21.78 6.72 21.36L11.58 17.1L15.34 24.36C15.53 24.73 15.98 24.87 16.34 24.68L18.66 23.47C19.03 23.28 19.17 22.84 18.98 22.47L15.22 15.21H20.46C21.09 15.21 21.44 14.47 21.01 13.99L6.5 2.37C6.06 1.94 5.5 2.25 5.5 2.82V3.21Z" fill="#1C1C1E" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);

function CandidateCallingAnimation() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // phase 0: show cards (1.5s)
    // phase 1: cursor moves and clicks (1.5s)
    // phase 2: icon turns red (0.5s)
    // phase 3: small window appears (2s)
    // phase 4: full screen expands & starts scrolling (5s)
    const durations = [1500, 1500, 500, 2000, 6000];
    const timer = setTimeout(() => {
      setPhase((p) => (p >= 4 ? 0 : p + 1));
    }, durations[phase]);
    return () => clearTimeout(timer);
  }, [phase]);

  return (
    <div className="relative w-full h-[520px] bg-[#f9fafb] rounded-3xl border border-gray-200 shadow-xl overflow-hidden flex items-center justify-center">
      
      {/* Phases 0-3: Two candidate cards */}
      <AnimatePresence>
        {phase <= 3 && (
          <motion.div 
            className="absolute inset-0 flex flex-col justify-center gap-6 px-10"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            {/* Card 1: Target */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-md flex items-center justify-between z-10">
              <div className="flex items-center gap-5">
                <img src="/layla_avatar.svg" alt="Layla" className="w-14 h-14 rounded-full object-cover border border-gray-100" />
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">Layla Munoz</h3>
                  <p className="text-sm text-gray-500">Senior Marketer III</p>
                </div>
              </div>
              
              <div className="relative">
                {/* Call Button */}
                <motion.div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${phase >= 2 ? 'bg-red-500 shadow-lg shadow-red-500/30' : 'bg-[#f4f0ff]'}`}
                >
                  <Phone className={`w-5 h-5 ${phase >= 2 ? 'text-white' : 'text-[#6D42D0]'}`} />
                </motion.div>

                {/* Cursor */}
                {phase >= 1 && (
                  <motion.div
                    className="absolute z-50 pointer-events-none"
                    initial={{ top: "80px", right: "-40px", scale: 1 }}
                    animate={{ 
                      top: "24px", 
                      right: "12px",
                      scale: phase >= 2 ? 0.8 : 1
                    }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  >
                    <CursorSVG />
                  </motion.div>
                )}
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between opacity-60">
              <div className="flex items-center gap-5">
                <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Zoya" className="w-14 h-14 rounded-full object-cover border border-gray-100" />
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">Zoya Khan</h3>
                  <p className="text-sm text-gray-500">Junior Data Engineer</p>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#f4f0ff] flex items-center justify-center">
                <Phone className="w-5 h-5 text-[#6D42D0]" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 3: Small calling window */}
      <AnimatePresence>
        {phase === 3 && (
          <motion.div
            className="absolute bottom-8 right-8 w-56 bg-gradient-to-b from-[#1a1033] to-[#140c24] rounded-2xl p-5 shadow-2xl shadow-black/40 border border-[#a78bfa]/40 z-20 flex flex-col items-center"
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#a78bfa]/50 mb-3">
              <img src="/layla_avatar.svg" alt="Layla" className="w-full h-full object-cover" />
            </div>
            <p className="text-white font-medium text-lg">Layla Munoz</p>
            <p className="text-gray-400 text-sm mt-1">Connecting...</p>
            <div className="flex gap-3 mt-4">
              <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center shadow-lg">
                <Phone className="w-5 h-5 text-white rotate-[135deg]" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 4: Fullscreen mode with Question Bank */}
      <AnimatePresence>
        {phase === 4 && (
          <motion.div
            className="absolute inset-0 z-30 flex overflow-hidden bg-gradient-to-br from-[#120a21] to-[#0B051A]"
            initial={{ opacity: 0, scale: 0.85, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {/* Left side: Avatar and Call info */}
            <div className="flex-1 flex flex-col items-center justify-center border-r border-[#4c3b7a]/40 relative bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-5">
              <motion.div
                className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#a78bfa]/40 mb-5 shadow-[0_0_40px_rgba(167,139,250,0.3)] relative"
              >
                <img src="/layla_avatar.svg" alt="Layla" className="w-full h-full object-cover z-10 relative" />
                <motion.div
                  className="absolute inset-0 border-4 border-[#a78bfa] rounded-full z-20"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
              <h3 className="text-white text-2xl font-medium tracking-wide">Layla Munoz</h3>
              <div className="flex flex-col items-center">
                <p className="text-[#a78bfa] mt-2 font-mono text-lg">01:24</p>
                <div className="flex gap-1 mt-3">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-[#a78bfa] rounded-full"
                      animate={{ height: ["10px", "24px", "6px", "18px", "10px"] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex gap-5 mt-10">
                <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5 text-white rotate-[135deg]" />
                </div>
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Mic className="w-5 h-5 text-white" />
                </div>
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Maximize2 className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

            {/* Right side: Auto-scrolling question bank */}
            <div className="w-[320px] bg-[#0F081E]/60 flex flex-col relative overflow-hidden backdrop-blur-sm">
              <div className="p-5 border-b border-[#4c3b7a]/40 bg-[#0B051A]/80 z-10 shrink-0 flex items-center gap-3">
                <div className="w-2 h-4 bg-[#a78bfa] rounded-sm" />
                <h4 className="text-[#a78bfa] font-semibold text-xs tracking-widest uppercase">Question Bank</h4>
              </div>
              
              <div className="relative flex-1" style={{ maskImage: "linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)" }}>
                <motion.div 
                  className="flex flex-col gap-4 px-5 py-6 absolute w-full"
                  animate={{ y: [0, -600] }}
                  transition={{ duration: 18, ease: "linear", repeat: Infinity }}
                >
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex flex-col gap-4">
                      {["Can you describe your experience managing high-volume operations?", "How have you handled cross-functional team coordination?", "Explain a scenario where you resolved a major stakeholder dispute.", "What metrics do you track to ensure successful event execution?", "How do you align your team's goals with the broader company strategy?"].map((q, idx) => (
                        <div key={idx} className="bg-[#1e153b]/50 border border-[#4c3b7a]/40 rounded-xl p-4 shadow-md">
                          <p className="text-gray-200 text-sm font-medium leading-relaxed">{q}</p>
                          <div className="mt-3 bg-[#0B051A]/60 p-3 rounded-lg border border-[#4c3b7a]/30">
                            <span className="text-[10px] text-[#a78bfa] font-bold tracking-wider uppercase block mb-1.5">Expected Answer</span>
                            <span className="text-xs text-gray-400 leading-relaxed block">Structured response demonstrating leadership and actionable metrics.</span>
                          </div>
                        </div>
                      ))}
                    </div>
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

export function SlideEight() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full w-full bg-white text-gray-900"
    >
      <Header title="IIIP SOLUTION" theme="light" />

      <main className="flex-1 flex flex-col justify-center px-16 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-[3.5rem] font-serif font-thin text-[#0B051A] leading-[1.1] mb-6">
                Automated <span className="italic text-[#6D42D0]">JD-Based</span> Q&A
              </h2>
              <p className="text-xl text-gray-500 font-light leading-relaxed">
                IIIP dynamically generates relevant screening questions directly from the Job Description, ensuring structural consistency for every candidate.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-4 bg-[#f4f0ff] text-[#5334b7] px-6 py-4 rounded-2xl w-max"
            >
              <FileSymlink className="w-5 h-5" />
              <span className="font-semibold tracking-wide">100% Structural Consistency</span>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="w-full"
          >
            <CandidateCallingAnimation />
          </motion.div>

        </div>
      </main>
    </motion.div>
  );
}
