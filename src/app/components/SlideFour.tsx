import { motion } from "motion/react";
import { Header } from "./Header";
import { Network, ArrowRight } from "lucide-react";

export function SlideFour() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full w-full bg-white text-gray-900"
    >
      <Header title="EMERSON CASE STUDY" theme="light" />

      <main className="flex-1 flex flex-col justify-center px-16 max-w-7xl mx-auto w-full">
        <div className="flex flex-col items-center mb-16 text-center">
          <p className="text-[#6D42D0] font-bold tracking-[0.2em] text-sm uppercase mb-4">Knowledge Graph</p>
          <h2 className="text-[3.5rem] font-serif font-thin text-[#0B051A] leading-tight mb-6">
            Context-Aware <span className="italic text-[#6D42D0]">Intelligence</span>
          </h2>
          <p className="text-xl text-gray-500 font-light max-w-2xl">
            Automatically maps abbreviations and synonyms. Recognizing BCom as Commerce, and HUL as Hindustan Unilever.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6 relative">
          {/* Decorative Connecting Lines (Background) */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#6D42D0]/20 to-transparent -translate-y-1/2 z-0 hidden md:block" />

          {[
            { from: "HUL", to: "Hindustan Unilever", context: "Tier 1 FMCG" },
            { from: "BCom", to: "Bachelor of Commerce", context: "Business Degree" },
            { from: "Big 4", to: "PwC, EY, Deloitte, KPMG", context: "Premium Experience" }
          ].map((mapping, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.2, type: "spring", stiffness: 100 }}
              className="relative z-10 bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(109,66,208,0.12)] transition-shadow group"
            >
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-[#f4f0ff] rounded-full flex items-center justify-center border-4 border-white">
                <Network className="w-4 h-4 text-[#6D42D0]" />
              </div>
              
              <div className="flex flex-col items-center text-center mt-4 space-y-4">
                <span className="text-2xl font-bold text-gray-300 group-hover:text-[#6D42D0] transition-colors">
                  {mapping.from}
                </span>
                <ArrowRight className="text-gray-300 w-6 h-6" />
                <span className="text-lg font-semibold text-gray-800">
                  {mapping.to}
                </span>
                <div className="pt-4 border-t border-gray-100 w-full">
                  <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                    {mapping.context}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </motion.div>
  );
}
