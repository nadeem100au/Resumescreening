import { motion } from "motion/react";
import { Header } from "./Header";
import { Timer, ArrowUpRight, ShieldCheck } from "lucide-react";

export function SlideTen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full w-full bg-white text-gray-900 overflow-hidden relative"
    >
      <Header title="HR SCREENING OUTCOME" theme="light" />

      {/* Decorative large circles */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-indigo-50 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-emerald-50 rounded-full blur-3xl opacity-50" />

      <main className="flex-1 flex flex-col justify-center px-16 max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-12 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="col-span-7 space-y-8"
          >
            <h2 className="text-[4.5rem] font-serif font-thin text-[#0B051A] leading-[1]">
              Bandwidth <br/>
              <span className="italic text-[#6D42D0]">Reclaimed</span>
            </h2>
            <p className="text-xl text-gray-500 font-light leading-relaxed max-w-lg">
              Save 50–70% of HR bandwidth while delivering significantly better, pre-vetted candidates to the Level 1 interview stage.
            </p>

            <div className="flex gap-4 pt-6">
              <div className="bg-emerald-50 text-emerald-700 px-6 py-3 rounded-full font-semibold flex items-center gap-2">
                <Timer className="w-5 h-5" /> 50-70% Time Saved
              </div>
              <div className="bg-[#f4f0ff] text-[#5334b7] px-6 py-3 rounded-full font-semibold flex items-center gap-2">
                <ArrowUpRight className="w-5 h-5" /> Higher L1 Quality
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 0.95 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="col-span-5"
          >
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_20px_60px_rgb(0,0,0,0.05)] relative">
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-[#6D42D0] rounded-2xl rotate-12 flex items-center justify-center text-white shadow-lg">
                <ShieldCheck className="w-8 h-8" />
              </div>
              
              <h3 className="text-xl font-semibold mb-6 pb-4 border-b border-gray-100">L1 Readiness Profile</h3>
              
              <ul className="space-y-5">
                {[
                  "Fully vetted on baseline technical requirements",
                  "Behavioral and communication scores recorded",
                  "Detailed summary provided to hiring manager prior to call"
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + (i * 0.15) }}
                    className="flex gap-4 items-start"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span className="text-gray-600">{item}</span>
                  </motion.div>
                ))}
              </ul>
            </div>
          </motion.div>

        </div>
      </main>
    </motion.div>
  );
}
