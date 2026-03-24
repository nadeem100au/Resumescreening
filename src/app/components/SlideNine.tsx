import { motion } from "motion/react";
import { Header } from "./Header";
import { Speech, UserSearch, HeartHandshake } from "lucide-react";

export function SlideNine() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full w-full bg-[#0B051A] text-white"
    >
      <Header title="IIIP SOLUTION" theme="dark" />

      <main className="flex-1 flex flex-col justify-center px-16 max-w-7xl mx-auto w-full">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-[3.5rem] font-serif font-thin leading-[1.1] mb-6">
            Deep Candidate <span className="italic text-[#8B61F6]">Insight</span>
          </h2>
          <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
            Evaluate communication skills, intent, and cultural fit simultaneously. Automatically generating comprehensive summaries for Hiring Managers.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 gap-8">
          {[
            { title: "Communication", score: "8.5/10", desc: "Articulate, structures thoughts well", icon: <Speech className="text-indigo-400 w-8 h-8" /> },
            { title: "Intent Signals", score: "High", desc: "High eagerness, asks relevant role-specific questions", icon: <UserSearch className="text-purple-400 w-8 h-8" /> },
            { title: "Cultural Fit", score: "Strong", desc: "Aligns well with fast-paced, matrixed environments", icon: <HeartHandshake className="text-emerald-400 w-8 h-8" /> }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.2, type: "spring" }}
              className="bg-gradient-to-b from-[#170E32] to-[#0B051A] border border-[#3B2875] rounded-3xl p-8 relative overflow-hidden group hover:border-[#8B61F6] transition-colors"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B61F6]/10 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150" />
              
              <div className="relative z-10">
                <div className="mb-6">{item.icon}</div>
                <h3 className="text-xl font-medium text-gray-200 mb-2">{item.title}</h3>
                <div className="text-3xl font-light text-white mb-4">{item.score}</div>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </main>
    </motion.div>
  );
}
