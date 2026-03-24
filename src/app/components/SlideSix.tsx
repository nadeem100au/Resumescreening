import { motion } from "motion/react";
import { Header } from "./Header";
import { Zap, TrendingUp } from "lucide-react";

export function SlideSix() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full w-full bg-[#FAFAFA] text-gray-900 overflow-hidden relative"
    >
      <Header title="RESUME SCREENING OUTCOME" theme="light" />

      {/* Large background typography */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-serif font-black text-gray-50 opacity-50 pointer-events-none select-none tracking-tighter whitespace-nowrap">
        80%
      </div>

      <main className="flex-1 flex flex-col justify-center px-16 max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-2 gap-20 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-[4rem] font-serif font-thin text-[#0B051A] leading-[1.1]">
              Instant <br/>
              <span className="italic text-[#6D42D0]">Shortlisting</span>
            </h2>
            <p className="text-xl text-gray-500 font-light leading-relaxed max-w-md">
              Identify the top 5–10% of candidates in minutes, drastically improving shortlist quality while eliminating the noise.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              className="bg-emerald-50 border border-emerald-100 p-8 rounded-3xl flex items-center justify-between"
            >
              <div>
                <p className="text-emerald-800 font-semibold mb-1">Manual Effort Reduced</p>
                <p className="text-sm text-emerald-600/80">From weeks to minutes</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-5xl font-light text-emerald-600">-80%</span>
                <TrendingUp className="w-8 h-8 text-emerald-500 rotate-180" />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
              className="bg-[#f4f0ff] border border-[#6D42D0]/10 p-8 rounded-3xl flex items-center justify-between"
            >
              <div>
                <p className="text-[#5334b7] font-semibold mb-1">Top Tier Identified</p>
                <p className="text-sm text-[#6D42D0]/70">Highly qualified pipeline</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-5xl font-light text-[#6D42D0]">5-10%</span>
                <Zap className="w-8 h-8 text-[#6D42D0]" />
              </div>
            </motion.div>
          </div>

        </div>
      </main>
    </motion.div>
  );
}
