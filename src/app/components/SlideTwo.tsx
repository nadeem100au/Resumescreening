import { motion } from "motion/react";
import { Header } from "./Header";
import { SearchX, Filter, LayoutList } from "lucide-react";

export function SlideTwo() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full w-full bg-[#FAFAFA] text-gray-900"
    >
      <Header title="EMERSON CASE STUDY" theme="light" />

      <main className="flex-1 flex flex-col items-center justify-center px-12 pt-8 pb-16 relative">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 space-y-4 max-w-3xl"
        >
          <p className="text-[#6D42D0] font-bold tracking-[0.2em] text-sm uppercase">Legacy System</p>
          <h2 className="text-[3.5rem] font-serif font-thin text-[#0B051A] leading-tight">
            Oracle Recruit <span className="italic text-[#6D42D0]">Flaws</span>
          </h2>
          <p className="text-xl text-gray-500 font-light">
            Basic filtering fails to capture context, meaning top candidates are easily missed.
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-3 gap-8 w-full max-w-6xl"
        >
          {[
            { 
              icon: <SearchX className="w-10 h-10 text-red-500" />,
              title: "Rigid Keyword Matching", 
              desc: "Exact strings only. Fails to recognize 'Commerce' as 'BCom'."
            },
            { 
              icon: <LayoutList className="w-10 h-10 text-amber-500" />,
              title: "No Context Parsing", 
              desc: "Cannot infer operational skills from general descriptions."
            },
            { 
              icon: <Filter className="w-10 h-10 text-indigo-500" />,
              title: "Basic Boolean Filters", 
              desc: "Complex and brittle logical operators required."
            }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              variants={item}
              className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 shadow-sm border border-gray-100">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </motion.div>
  );
}
