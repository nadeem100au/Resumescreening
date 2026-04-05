import { motion } from "motion/react";
import { Header } from "./Header";
import { Users, Clock, AlertCircle } from "lucide-react";

export function SlideOne() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col h-full w-full bg-[#0B051A] text-white overflow-hidden relative"
    >
      <Header title="CASE STUDY" theme="dark" />

      {/* Background Graphic */}
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#6D42D0]" fill="currentColor">
          <circle cx="80" cy="50" r="40" />
          <circle cx="20" cy="20" r="10" />
        </svg>
      </div>

      <main className="flex-1 px-16 pb-12 flex flex-col justify-center max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
            className="space-y-6"
          >
            <p className="text-[#6D42D0] font-bold tracking-[0.2em] text-sm uppercase">RESUME SCREENING</p>
            <h1 className="text-[4rem] font-serif font-thin tracking-tight leading-[1.1]">
              The <span className="italic text-[#8B61F6]">Volume</span><br />Challenge
            </h1>
            <p className="text-xl text-gray-400 font-light leading-relaxed max-w-lg">
              Enterprises receive <span className="text-white font-medium">20K–30K resumes per month</span>. Manual screening is incredibly slow and highly inconsistent.
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              { title: "20K-30K Inbound/Month", desc: "Overwhelming application volume.", icon: <Users className="w-8 h-8 text-[#8B61F6]" /> },
              { title: "Manual Review Speed", desc: "Takes weeks to properly evaluate.", icon: <Clock className="w-8 h-8 text-rose-500" /> },
              { title: "Human Inconsistency", desc: "Susceptible to fatigue and bias.", icon: <AlertCircle className="w-8 h-8 text-amber-500" /> }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.2, duration: 0.6 }}
                className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm flex items-start gap-5 hover:bg-white/10 transition-colors"
              >
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 shrink-0">
                  {stat.icon}
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-1">{stat.title}</h3>
                  <p className="text-gray-400 text-sm">{stat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </motion.div>
  );
}
