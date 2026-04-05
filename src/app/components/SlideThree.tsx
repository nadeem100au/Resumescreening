import { motion } from "motion/react";
import { Header } from "./Header";
import { BrainCircuit, MessageSquare, Sparkles } from "lucide-react";

export function SlideThree() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full w-full bg-[#0B051A] text-white"
    >
      <Header title="CASE STUDY" theme="dark" />

      <main className="flex-1 flex flex-col justify-center px-16 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-12 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="col-span-5 space-y-8"
          >
            <div>
              <p className="text-[#8B61F6] font-bold tracking-[0.2em] text-sm uppercase mb-3">IIIP Solution</p>
              <h2 className="text-[3.5rem] font-serif font-thin leading-[1.1]">
                Natural <span className="italic text-[#8B61F6]">Language</span>
              </h2>
            </div>
            
            <p className="text-xl text-gray-400 font-light leading-relaxed">
              IIIP intuitively understands conversational queries. "B.Tech + cloud infra" is instantly decoded without complex boolean strings.
            </p>

            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-4 text-gray-300">
                <BrainCircuit className="text-[#8B61F6] w-6 h-6" /> Semantic Parsing
              </div>
              <div className="flex items-center gap-4 text-gray-300">
                <MessageSquare className="text-emerald-400 w-6 h-6" /> Intent Recognition
              </div>
              <div className="flex items-center gap-4 text-gray-300">
                <Sparkles className="text-amber-400 w-6 h-6" /> Dynamic Filtering
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="col-span-7 bg-[#1A1033] rounded-3xl border border-[#3B2875] p-10 shadow-2xl relative overflow-hidden"
          >
            {/* Abstract Background Decoration */}
            <div className="absolute top-[-50%] right-[-50%] w-[100%] h-[100%] bg-gradient-to-br from-[#8B61F6]/20 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <p className="text-sm text-gray-400 mb-2 uppercase tracking-wider font-semibold">User criteria Query ( TEXT) </p>
                <p className="text-2xl font-serif italic">"B.Tech + cloud infra"</p>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-[#8B61F6] font-semibold uppercase tracking-wider pl-2">IIIP Understanding</p>
                {[
                  "Bachelor of Technology (or equivalent)",
                  "Experience in Cloud Infrastructure",
                  "Terraform, AWS & CI/CD pipelines inferred"
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + (i * 0.15) }}
                    className="flex items-center gap-4 bg-white/5 p-4 rounded-lg border border-white/5"
                  >
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-gray-200">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </main>
    </motion.div>
  );
}
