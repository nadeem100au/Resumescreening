import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Bot, Clock, ShieldCheck, Users, Zap, Briefcase, FileSearch, Network, TrendingUp, Mic, Phone, Maximize2, FileText, AlertTriangle, ScanLine, Layers, CheckCircle2 } from "lucide-react";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import Lenis from "lenis";
import { ResumeScreeningHeroVisual } from "./components/ResumeScreeningHeroVisual";

/* ─── Animated Resume Scanner Component ─── */
function ResumeScanner() {
  const [scanPhase, setScanPhase] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setScanPhase(p => (p === 0 ? 1 : 0));
    }, 2500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full max-w-sm mx-auto aspect-[3/4] bg-[#1a1033] rounded-2xl border border-[#3B2875] p-8 shadow-2xl overflow-visible flex flex-col gap-5 select-none">
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#6D42D0] to-[#3B2875] flex items-center justify-center shrink-0">
          <FileText className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="h-3 w-24 bg-white/20 rounded-full mb-2" />
          <div className="h-2 w-16 bg-white/10 rounded-full" />
        </div>
      </div>
      
      {/* Document Lines Skeleton */}
      <div className="space-y-3">
        <div className="h-3 w-full bg-white/5 rounded-full" />
        <div className="h-3 w-5/6 bg-white/5 rounded-full" />
        <div className="h-3 w-4/6 bg-white/5 rounded-full" />
      </div>
      <div className="space-y-3 mt-4">
        <div className="h-3 w-full bg-white/5 rounded-full" />
        <div className="h-3 w-11/12 bg-white/5 rounded-full" />
        <div className="h-3 w-3/4 bg-white/5 rounded-full" />
      </div>

      {/* Laser Scanner */}
      <motion.div
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 w-full h-[2px] bg-[#8B61F6] shadow-[0_0_20px_#8B61F6] z-10"
      />

      {/* Extracted Data Points */}
      <AnimatePresence>
        {scanPhase === 1 && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: -10 }}
              transition={{ delay: 0.3 }}
              className="absolute top-[20%] -left-[15%] lg:-left-[25%] bg-[#0B051A] border border-[#8B61F6]/50 text-white px-4 py-2 rounded-xl text-sm shadow-2xl z-20 flex items-center gap-2 backdrop-blur-md"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>React.js Expert</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 10 }}
              transition={{ delay: 0.8 }}
              className="absolute top-[50%] -right-[15%] lg:-right-[25%] bg-[#0B051A] border border-[#8B61F6]/50 text-white px-4 py-2 rounded-xl text-sm shadow-2xl z-20 flex items-center gap-2 backdrop-blur-md"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>5+ Yrs Leadership</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ delay: 1.3 }}
              className="absolute bottom-[10%] -left-[10%] lg:-left-[15%] bg-[#0B051A] border border-[#8B61F6]/50 text-white px-4 py-2 rounded-xl text-sm shadow-2xl z-20 flex items-center gap-2 backdrop-blur-md"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>B.S. Computer Science</span>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Animated Skill Matching Component ─── */
function SkillMatcher() {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 py-10 relative">
      {/* Background connecting line (hidden on mobile) */}
      <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-gray-200 via-[#8B61F6] to-gray-200 -z-10" />

      {/* JD Side */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex-1 bg-white border border-gray-200 rounded-3xl p-8 shadow-xl relative z-10 w-full"
      >
        <p className="text-gray-400 uppercase tracking-widest text-xs font-bold mb-6">Job Requirements</p>
        <div className="space-y-4">
          {["Senior Frontend Engineering", "Team Leadership", "System Architecture"].map((req, i) => (
            <div key={i} className="px-5 py-3 bg-gray-50 rounded-xl text-gray-700 text-sm font-medium border border-gray-100 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-gray-300" />
              {req}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Fit Score Center */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center shrink-0"
      >
        <div className="w-32 h-32 rounded-full border-8 border-gray-100 bg-white shadow-2xl flex items-center justify-center relative">
          <svg className="absolute inset-0 w-full h-full -rotate-90 overflow-visible" viewBox="0 0 128 128">
            <motion.circle
              cx="64"
              cy="64"
              r="60"
              fill="transparent"
              stroke="#8B61F6"
              strokeWidth="8"
              strokeDasharray="377"
              initial={{ strokeDashoffset: 377 }}
              whileInView={{ strokeDashoffset: 30 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
              strokeLinecap="round"
              className="drop-shadow-[0_0_8px_rgba(139,97,246,0.5)]"
            />
          </svg>
          <div className="text-center z-10">
            <span className="text-4xl font-bold text-gray-900">92</span><span className="text-xl text-gray-500 font-medium">%</span>
          </div>
        </div>
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-[#6D42D0] text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg whitespace-nowrap z-20">
          Match Score
        </div>
      </motion.div>

      {/* Candidate Side */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex-1 bg-[#FAFAFA] border border-[#E0D4FF] rounded-3xl p-8 shadow-xl relative z-10 w-full"
      >
        <p className="text-[#6D42D0] uppercase tracking-widest text-xs font-bold mb-6">Extracted Profile</p>
        <div className="space-y-4">
          {["Lead UI Developer", "Mentored 5+ Engineers", "Micro-frontend Design"].map((skill, i) => (
            <div key={i} className="px-5 py-3 bg-white rounded-xl text-[#6D42D0] text-sm font-medium border border-[#E0D4FF] flex items-center gap-3">
               <ShieldCheck className="w-5 h-5 text-[#8B61F6]" />
               {skill}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export function LandingPage() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const DarkSection = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <section className={`relative py-32 px-6 md:px-12 bg-gradient-to-b from-[#110524] to-[#05010F] text-white overflow-hidden ${className}`}>
      {children}
    </section>
  );

  const WhiteSection = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <section className={`relative py-32 px-6 md:px-12 bg-[#FAFAFA] text-gray-900 border-y border-gray-100 overflow-hidden ${className}`}>
      {children}
    </section>
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.18, delayChildren: 0.3 }
    }
  };
  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
  };

  return (
    <div className="bg-gradient-to-b from-[#110524] to-[#05010F] text-white min-h-screen font-sans selection:bg-[#8B61F6]/30 overflow-x-hidden" style={{ zoom: 0.9 }}>
      
      {/* FLOATING PILL HEADER */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[1344px] rounded-full bg-white/80 backdrop-blur-xl border border-gray-200/80 py-3 px-8 flex justify-between items-center text-gray-900 shadow-xl transition-all">
        <div className="flex items-center">
          <img
            src="/black_logo.svg"
            alt="Intervue"
            className="h-6 w-auto object-contain brightness-0"
          />
        </div>
        <Link 
          to="/presentation" 
          className="px-6 py-2.5 bg-[#6D42D0] hover:bg-[#8B61F6] border border-[#8B61F6]/20 text-white rounded-full text-sm font-semibold transition-colors flex items-center gap-2 shadow-lg"
        >
          Get Started
        </Link>
      </header>

      {/* SECTION 1: HERO (WHITE THEME) */}
      <div className="relative min-h-screen bg-[#FAFAFA] border-b border-gray-200/60 flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-32 pb-20 overflow-hidden text-gray-900">
        <div
          className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-40"
          style={{ background: 'radial-gradient(circle at 75% 50%, #ECE9FD 0%, transparent 60%)' }}
        />
        <div className="absolute w-[600px] h-[600px] bg-purple-200/10 rounded-full blur-[120px] top-[-10%] left-[-10%] animate-[spin_40s_linear_infinite]" />

        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* LEFT: Hero Copy */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="lg:col-span-7 space-y-8"
          >
            <motion.p variants={itemVariants} className="text-[#8B61F6] font-bold tracking-[0.2em] text-sm uppercase">
              AI RESUME SCREENING
            </motion.p>
            <motion.h1 variants={itemVariants} className="text-[3.5rem] md:text-[4.5rem] lg:text-[5rem] font-sans font-extrabold tracking-tight leading-[1.05] text-gray-900">
              Screen resumes <br/>
              <span className="text-[#8B61F6]">at scale.</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl text-gray-600 font-light leading-relaxed max-w-xl">
              Conquer applicant overload. Screen 30,000 resumes instantly with zero bias, automated parsing, and precision scoring.
            </motion.p>

            <motion.div variants={containerVariants} className="space-y-6 pt-6 border-t border-gray-200/80">
              <motion.div variants={itemVariants} className="flex items-start gap-5 group">
                <div className="p-3 bg-[#6D42D0]/5 group-hover:bg-[#6D42D0]/10 rounded-xl border border-[#8B61F6]/30 transition-colors shrink-0 shadow-[0_0_15px_rgba(139,97,246,0.1)]">
                  <Zap className="w-6 h-6 text-[#8B61F6]" />
                </div>
                <div>
                  <h3 className="text-gray-900 font-semibold text-lg mb-1">Instant Processing</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">Turn weeks of manual review into minutes.</p>
                </div>
              </motion.div>
              <motion.div variants={itemVariants} className="flex items-start gap-5 group">
                <div className="p-3 bg-[#6D42D0]/5 group-hover:bg-[#6D42D0]/10 rounded-xl border border-[#8B61F6]/30 transition-colors shrink-0 shadow-[0_0_15px_rgba(139,97,246,0.1)]">
                  <ShieldCheck className="w-6 h-6 text-[#8B61F6]" />
                </div>
                <div>
                  <h3 className="text-gray-900 font-semibold text-lg mb-1">Zero Bias</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">100% objective, structured evaluations for every candidate.</p>
                </div>
              </motion.div>
              <motion.div variants={itemVariants} className="flex items-start gap-5 group">
                <div className="p-3 bg-[#6D42D0]/5 group-hover:bg-[#6D42D0]/10 rounded-xl border border-[#8B61F6]/30 transition-colors shrink-0 shadow-[0_0_15px_rgba(139,97,246,0.1)]">
                  <Users className="w-6 h-6 text-[#8B61F6]" />
                </div>
                <div>
                  <h3 className="text-gray-900 font-semibold text-lg mb-1">Infinite Scale</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">Effortlessly handle 20K+ inbound applications per month.</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* RIGHT: Interactive Demo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <ResumeScreeningHeroVisual />
          </motion.div>
        </div>
      </div>

      {/* SECTION 2: ANIMATED RESUME PARSING (DARK) */}
      <DarkSection>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-1/2 space-y-6"
          >
            <p className="text-[#6D42D0] font-bold tracking-[0.2em] text-sm uppercase">Data Extraction</p>
            <h2 className="text-[3.5rem] md:text-[4rem] font-medium leading-[1.1]">
              Intelligent <br/>
              <span className="font-serif italic text-gray-300 font-light">Document Parsing</span>
            </h2>
            <p className="text-xl text-gray-400 font-light leading-relaxed">
              Our AI doesn't just read keywords. It understands context, extracting complex technical skills, leadership experience, and education history from any resume format.
            </p>
            <ul className="space-y-4 pt-6">
              {[
                "Parses PDF, DOCX, and raw text flawlessly",
                "Understands semantic context, not just exact keywords",
                "Maps raw data into clean, structured candidate profiles"
              ].map((point, i) => (
                <li key={i} className="flex items-center gap-4 text-gray-300 font-light border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <ScanLine className="w-5 h-5 text-[#8B61F6] shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-1/2 relative flex justify-center py-10"
          >
            <div className="absolute w-[400px] h-[400px] bg-[#6D42D0]/20 rounded-full blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <ResumeScanner />
          </motion.div>
        </div>
      </DarkSection>

      {/* SECTION 3: SKILL MATCHING (WHITE) */}
      <WhiteSection>
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[#6D42D0] font-bold tracking-[0.2em] text-sm uppercase mb-4">Precision Scoring</p>
            <h2 className="text-[3.5rem] md:text-[4rem] font-medium tracking-tight text-gray-900 leading-[1.1] mb-6">
              Objective <span className="font-serif italic font-light text-gray-500">Scoring</span> at Scale
            </h2>
            <p className="text-xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
              Every resume is scored identically against your exact Job Description requirements, eliminating human bias and surfacing the perfect fit instantly.
            </p>
          </motion.div>
        </div>
        
        <SkillMatcher />
      </WhiteSection>

      {/* SECTION 4: OUTCOMES (DARK) */}
      <DarkSection className="border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center space-y-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[3rem] font-medium text-white"
          >
            High-Volume <span className="font-serif italic text-[#8B61F6] font-light">Performance</span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Parsing Speed", value: "5,000+", suffix: "/min", label: "Resumes processed instantly" },
              { title: "Manual Screening", value: "0", suffix: "hrs", label: "Time spent reading resumes" },
              { title: "Candidate Match", value: "99", suffix: "%", label: "Accuracy in skill extraction" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.8 }}
                className="bg-gradient-to-b from-[#161520] to-[#0D0D14] border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden group hover:border-[#8B61F6]/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(139,97,246,0.15)]"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#6D42D0]/5 rounded-bl-full pointer-events-none group-hover:bg-[#6D42D0]/15 transition-colors" />
                <p className="text-gray-400 font-semibold mb-4 uppercase tracking-widest text-xs">{stat.title}</p>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-5xl font-bold text-white">{stat.value}</span>
                  <span className="text-2xl text-[#8B61F6] font-light">{stat.suffix}</span>
                </div>
                <p className="text-gray-500 font-light text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </DarkSection>

      {/* FOOTER CTA (DARK) */}
      <footer className="bg-gradient-to-b from-[#110524] to-[#05010F] pt-40 pb-20 px-6 text-center border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#6D42D0]/30 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-[400px] bg-[#6D42D0]/10 blur-[100px] pointer-events-none rounded-full" />

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-3xl mx-auto flex flex-col items-center"
        >
          <h2 className="text-[3rem] md:text-[4.5rem] font-medium text-white tracking-tight leading-[1] mb-8">
            Ready to <span className="font-serif italic text-gray-300 font-light">automate</span> resume screening?
          </h2>
          <p className="text-xl text-gray-400 font-light mb-12">
            See how enterprise teams are using AI to screen tens of thousands of resumes accurately, instantly, and without bias.
          </p>
          <Link 
            to="/presentation" 
            className="px-10 py-5 bg-white text-black hover:bg-gray-200 rounded-full text-lg font-semibold transition-colors flex items-center gap-3 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </footer>
    </div>
  );
}
