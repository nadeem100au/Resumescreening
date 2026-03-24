import { motion } from "motion/react";
import { Header } from "./Header";
import { PhoneOff, Clock, Layers } from "lucide-react";

export function SlideSeven() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full w-full bg-[#0B051A] text-white"
    >
      <Header title="HR SCREENING" theme="dark" />

      <main className="flex-1 flex flex-col justify-center items-center px-16 max-w-7xl mx-auto w-full">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mb-16"
        >
          <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <PhoneOff className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-[3.5rem] font-serif font-thin leading-[1.1] mb-6">
            The Screening <span className="italic text-red-400">Bottleneck</span>
          </h2>
          <p className="text-xl text-gray-400 font-light leading-relaxed">
            Manual HR calls consume massive bandwidth. They lack standardization, produce no structured data, and slow down the hiring pipeline.
          </p>
        </motion.div>

        <div className="flex gap-8 w-full max-w-4xl">
          {[
            { title: "No Standardization", desc: "Inconsistent questioning across different candidates", icon: <Layers className="text-amber-400" /> },
            { title: "Wasted Bandwidth", desc: "Hours lost to unqualified or mismatched profiles", icon: <Clock className="text-indigo-400" /> }
          ].map((card, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.2 }}
              className="flex-1 bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center hover:bg-white/10 transition-colors"
            >
              <div className="mb-4 bg-[#170E32] p-4 rounded-full border border-white/5">
                {card.icon}
              </div>
              <h3 className="text-xl font-medium mb-2">{card.title}</h3>
              <p className="text-sm text-gray-400">{card.desc}</p>
            </motion.div>
          ))}
        </div>

      </main>
    </motion.div>
  );
}
