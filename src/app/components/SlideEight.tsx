import { motion } from "motion/react";
import { Header } from "./Header";
import { FileSymlink, CheckCircle2 } from "lucide-react";

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
            className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden"
          >
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <span className="text-xs font-medium text-gray-500 uppercase ml-2 tracking-wider">Generated Assessment</span>
            </div>
            
            <div className="p-6 space-y-4">
              {[
                "Can you describe your experience managing high-volume operations?",
                "How have you handled cross-functional team coordination?",
                "Explain a scenario where you resolved a major stakeholder dispute."
              ].map((q, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.2 }}
                  className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
                >
                  <CheckCircle2 className="w-6 h-6 text-[#6D42D0] shrink-0" />
                  <p className="text-gray-700 font-medium">{q}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </main>
    </motion.div>
  );
}
