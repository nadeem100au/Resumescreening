import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef, useCallback } from "react";
import { Phone, Plus, Upload, ArrowLeft, X, Bot, User, CheckCircle2, Sparkles, FileText, TrendingUp, AlertTriangle, XCircle, Clock, ScrollText, ChevronLeft, ChevronRight, Play } from "lucide-react";

/* ─── Types ─── */
interface CandidateInfo {
  name: string;
  email: string;
  phone: string;
  resumeName: string;
  avatar?: string;
  role?: string;
}

interface ChatMessage {
  sender: "screener" | "candidate";
  text: string;
}

type Verdict = "most_fit" | "borderline" | "least_fit";

interface ReportData {
  verdict: Verdict;
  summary: string;
  scores: { label: string; value: number }[];
}

/* ─── Mock verdicts per candidate ─── */
const MOCK_REPORTS: Record<string, ReportData> = {
  "Priya Sharma": {
    verdict: "most_fit",
    summary: "Priya demonstrated exceptional leadership skills and deep technical expertise. Her cloud migration experience directly aligns with the role requirements. Strong communicator with clear, structured responses.",
    scores: [
      { label: "Technical Skills", value: 92 },
      { label: "Communication", value: 88 },
      { label: "Leadership", value: 95 },
      { label: "Culture Fit", value: 85 },
    ],
  },
  "Marcus Johnson": {
    verdict: "borderline",
    summary: "Marcus shows strong product thinking and stakeholder management skills. However, his technical depth may need further evaluation. Good communication but lacked specific metrics in responses.",
    scores: [
      { label: "Technical Skills", value: 62 },
      { label: "Communication", value: 78 },
      { label: "Leadership", value: 70 },
      { label: "Culture Fit", value: 80 },
    ],
  },
  "Sarah Chen": {
    verdict: "most_fit",
    summary: "Sarah's data science expertise is outstanding. She articulated complex concepts clearly and demonstrated strong problem-solving abilities. Excellent cultural alignment with data-driven decision making.",
    scores: [
      { label: "Technical Skills", value: 96 },
      { label: "Communication", value: 90 },
      { label: "Leadership", value: 72 },
      { label: "Culture Fit", value: 88 },
    ],
  },
};

const DEFAULT_REPORT: ReportData = {
  verdict: "borderline",
  summary: "The candidate showed adequate knowledge and decent communication. Further evaluation is recommended to assess deeper technical competency and team collaboration style.",
  scores: [
    { label: "Technical Skills", value: 70 },
    { label: "Communication", value: 75 },
    { label: "Leadership", value: 65 },
    { label: "Culture Fit", value: 72 },
  ],
};

const VERDICT_CONFIG: Record<Verdict, { label: string; color: string; bg: string; border: string; icon: React.ReactNode }> = {
  most_fit: {
    label: "Most Fit",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    icon: <TrendingUp className="w-5 h-5 text-emerald-400" />,
  },
  borderline: {
    label: "Borderline",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    icon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
  },
  least_fit: {
    label: "Least Fit",
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    icon: <XCircle className="w-5 h-5 text-red-400" />,
  },
};

/* ─── Mock candidates ─── */
const MOCK_CANDIDATES: CandidateInfo[] = [
  {
    name: "Priya Sharma",
    email: "priya@acme.com",
    phone: "+91 98765 43210",
    resumeName: "Priya_Sharma_Resume.pdf",
    avatar: "/avatar_priya.png",
    role: "Senior Engineer",
  },
  {
    name: "Marcus Johnson",
    email: "marcus@techcorp.io",
    phone: "+1 (555) 234-5678",
    resumeName: "Marcus_Johnson_CV.pdf",
    avatar: "/avatar_marcus.png",
    role: "Product Manager",
  },
  {
    name: "Sarah Chen",
    email: "sarah@innovate.co",
    phone: "+44 7911 123456",
    resumeName: "Sarah_Chen_Resume.pdf",
    avatar: "/avatar_sarah.png",
    role: "Data Scientist",
  },
];

/* ─── Generate conversation for a candidate ─── */
function getConversation(name: string): ChatMessage[] {
  const firstName = name.split(" ")[0];
  return [
    { sender: "screener", text: `Hi ${firstName}, this is the AI Screening Agent from Intervue. Thanks for applying! Ready to begin?` },
    { sender: "candidate", text: "Yes, absolutely! I'm excited to chat." },
    { sender: "screener", text: "Great! Can you walk me through your most recent role and key responsibilities?" },
    { sender: "candidate", text: "I was leading a cross-functional team on a cloud migration project, managing architecture decisions and delivery timelines..." },
    { sender: "screener", text: "Impressive. How do you handle tight deadlines with competing priorities?" },
    { sender: "candidate", text: "I use a priority matrix and maintain close communication with stakeholders to manage expectations effectively." },
    { sender: "screener", text: "Last question — why are you interested in this opportunity?" },
    { sender: "candidate", text: "The chance to work on AI-driven products at enterprise scale really excites me. I'd love to contribute my expertise here." },
    { sender: "screener", text: `Thank you, ${firstName}! Your screening is complete. Our HR team will review your results shortly. 🎉` },
  ];
}

/* ─── Typing dots ─── */
function TypingIndicator({ isScreener }: { isScreener: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      className={`flex items-end gap-2 ${isScreener ? "" : "flex-row-reverse"}`}
    >
      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
        isScreener
          ? "bg-gradient-to-br from-[#8B61F6] to-[#6D42D0]"
          : "bg-gradient-to-br from-[#3B2875] to-[#1A1033] border border-white/20"
      }`}>
        {isScreener ? <Bot className="w-3.5 h-3.5 text-white" /> : <User className="w-3.5 h-3.5 text-white/70" />}
      </div>
      <div className={`px-4 py-3 rounded-2xl ${
        isScreener
          ? "bg-[#1A1033] border border-[#3B2875] rounded-bl-sm"
          : "bg-[#2a1a50] border border-[#4a2d8a] rounded-br-sm"
      }`}>
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-[#8B61F6]/60"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Single chat bubble ─── */
function ChatBubble({ msg, index }: { msg: ChatMessage; index: number }) {
  const isScreener = msg.sender === "screener";
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-end gap-2 ${isScreener ? "" : "flex-row-reverse"}`}
    >
      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
        isScreener
          ? "bg-gradient-to-br from-[#8B61F6] to-[#6D42D0] shadow-[0_0_12px_rgba(139,97,246,0.4)]"
          : "bg-gradient-to-br from-[#3B2875] to-[#1A1033] border border-white/20"
      }`}>
        {isScreener ? <Bot className="w-3.5 h-3.5 text-white" /> : <User className="w-3.5 h-3.5 text-white/70" />}
      </div>
      <div className={`max-w-[75%] px-4 py-2.5 text-[13px] leading-relaxed ${
        isScreener
          ? "bg-[#1A1033] border border-[#3B2875] rounded-2xl rounded-bl-sm text-white/90"
          : "bg-[#2a1a50] border border-[#4a2d8a] rounded-2xl rounded-br-sm text-white/80"
      }`}>
        {msg.text}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════ */
export function HeroInteractive() {
  // Phases:
  // "avatars"   → show 3 mock candidates + "Add Candidate" CTA
  // "form"      → show the add-candidate form
  // "chat"      → animated chat conversation
  // "report"    → post-call report with transcript, summary, verdict
  const [phase, setPhase] = useState<"avatars" | "form" | "chat" | "report">("avatars");
  const [reportData, setReportData] = useState<ReportData>(DEFAULT_REPORT);
  const [finalDuration, setFinalDuration] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [activeCandidate, setActiveCandidate] = useState<CandidateInfo | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [carouselIdx, setCarouselIdx] = useState(1); // start with center candidate focused

  // Form state
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formResume, setFormResume] = useState<string>("");

  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingSender, setTypingSender] = useState<"screener" | "candidate">("screener");
  const [chatDone, setChatDone] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const chatRef = useRef<HTMLDivElement>(null);
  const conversationRef = useRef<ChatMessage[]>([]);
  const msgIndexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-scroll chat
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages, isTyping]);

  // Timer during chat
  useEffect(() => {
    if (phase === "chat" && !chatDone) {
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
      return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [phase, chatDone]);

  const fmt = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  // Advance chat one message at a time
  const advanceChat = useCallback(() => {
    const conv = conversationRef.current;
    const idx = msgIndexRef.current;

    if (idx >= conv.length) {
      setChatDone(true);
      setIsTyping(false);
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const nextMsg = conv[idx];
    setTypingSender(nextMsg.sender);
    setIsTyping(true);

    const typingDelay = nextMsg.sender === "screener" ? 1200 : 1500;
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, nextMsg]);
      msgIndexRef.current = idx + 1;

      // Schedule next message
      setTimeout(() => advanceChat(), 600);
    }, typingDelay);
  }, []);

  // Start chat for a candidate
  const startChat = useCallback((candidate: CandidateInfo) => {
    setActiveCandidate(candidate);
    setMessages([]);
    setChatDone(false);
    setSeconds(0);
    msgIndexRef.current = 0;
    conversationRef.current = getConversation(candidate.name);
    setPhase("chat");

    // Begin after a short delay
    setTimeout(() => advanceChat(), 800);
  }, [advanceChat]);

  // Handle mock candidate click
  const handleMockClick = (candidate: CandidateInfo) => {
    startChat(candidate);
  };

  // Handle form submit
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formPhone.trim()) return;
    const candidate: CandidateInfo = {
      name: formName,
      email: formEmail,
      phone: formPhone,
      resumeName: formResume || "Resume.pdf",
    };
    startChat(candidate);
  };

  // Go to report phase
  const goToReport = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setFinalDuration(seconds);
    const report = activeCandidate ? (MOCK_REPORTS[activeCandidate.name] || DEFAULT_REPORT) : DEFAULT_REPORT;
    setReportData(report);
    setIsTyping(false);
    setChatDone(true);
    setPhase("report");
    setShowTranscript(false);
  };

  // Reset everything back to avatars
  const handleReset = () => {
    setPhase("avatars");
    setActiveCandidate(null);
    setMessages([]);
    setChatDone(false);
    setIsTyping(false);
    setSeconds(0);
    setFormName("");
    setFormEmail("");
    setFormPhone("");
    setFormResume("");
    msgIndexRef.current = 0;
    setShowTranscript(false);
  };

  /* ─── Waveform for chat header ─── */
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (phase !== "chat" || chatDone) return;
    const id = setInterval(() => setTick((t) => t + 1), 130);
    return () => clearInterval(id);
  }, [phase, chatDone]);

  const waveHeights = Array.from({ length: 12 }, (_, i) =>
    6 + 12 * Math.abs(Math.sin(tick * 0.38 + i * 0.72))
  );

  return (
    <div className="relative w-full max-w-[520px]">
      <AnimatePresence mode="wait">

        {/* ════════ PHASE: AVATARS (CAROUSEL) ════════ */}
        {phase === "avatars" && (
          <motion.div
            key="avatars"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#1A1033]/80 backdrop-blur-xl border border-[#3B2875] rounded-3xl p-8 pb-7 shadow-2xl relative overflow-hidden"
          >
            {/* Inner glow */}
            <div className="absolute top-[-50%] right-[-50%] w-[100%] h-[100%] bg-gradient-to-br from-[#8B61F6]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              {/* Title */}
              <p className="text-[#8B61F6] text-xs font-bold tracking-[0.2em] uppercase mb-2 text-center">Try It Live</p>
              <h2 className="text-2xl font-medium text-white leading-snug mb-1 text-center">
                Screen <span className="font-serif italic font-light text-gray-300">candidate agents</span>
              </h2>
              <p className="text-gray-400 text-sm font-light mb-8 text-center">
                Select a candidate and start an AI screening call.
              </p>

              {/* ── Carousel ── */}
              <div className="relative flex items-center justify-center mb-2" style={{ minHeight: "160px" }}>
                {/* Left arrow */}
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCarouselIdx((prev) => (prev - 1 + MOCK_CANDIDATES.length) % MOCK_CANDIDATES.length)}
                  className="absolute left-0 z-20 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4 text-white/60" />
                </motion.button>

                {/* Avatars row */}
                <div className="flex items-center justify-center gap-0 relative" style={{ width: "340px", height: "160px" }}>
                  {MOCK_CANDIDATES.map((c, i) => {
                    const offset = ((i - carouselIdx) + MOCK_CANDIDATES.length) % MOCK_CANDIDATES.length;
                    // Map to: 0 = center, 1 = right, 2 = left (for 3 items)
                    const isCenter = offset === 0;
                    const isRight = offset === 1;
                    const isLeft = offset === MOCK_CANDIDATES.length - 1;

                    const xPos = isCenter ? 0 : isRight ? 110 : -110;
                    const scale = isCenter ? 1 : 0.65;
                    const zIndex = isCenter ? 10 : 5;
                    const opacity = isCenter ? 1 : 0.5;
                    // Subtle float for side avatars
                    const yFloat = isCenter ? 0 : isRight ? 8 : -8;

                    return (
                      <motion.div
                        key={c.name}
                        animate={{
                          x: xPos,
                          scale,
                          opacity,
                          y: yFloat,
                        }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute flex flex-col items-center cursor-pointer"
                        style={{ zIndex }}
                        onClick={() => {
                          if (isCenter) {
                            handleMockClick(c);
                          } else {
                            setCarouselIdx(i);
                          }
                        }}
                      >
                        {/* Avatar circle */}
                        <div className="relative">
                          {/* Outer glow ring for center */}
                          {isCenter && (
                            <motion.div
                              animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.1, 0.3] }}
                              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                              className="absolute inset-[-6px] rounded-full border-2 border-[#8B61F6]/40"
                            />
                          )}
                          <motion.div
                            animate={isCenter ? { y: [0, -4, 0] } : {}}
                            transition={isCenter ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : {}}
                            className={`rounded-full overflow-hidden border-[3px] shadow-xl transition-colors duration-300 ${
                              isCenter
                                ? "w-[120px] h-[120px] border-[#8B61F6]/60 shadow-[0_0_40px_rgba(139,97,246,0.3)]"
                                : "w-[120px] h-[120px] border-white/10"
                            }`}
                          >
                            <img
                              src={c.avatar}
                              alt={c.name}
                              className="w-full h-full object-cover"
                            />
                          </motion.div>


                          {/* Online dot */}
                          {isCenter && (
                            <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-400 border-[3px] border-[#1A1033] z-10" />
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Right arrow */}
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCarouselIdx((prev) => (prev + 1) % MOCK_CANDIDATES.length)}
                  className="absolute right-0 z-20 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4 text-white/60" />
                </motion.button>
              </div>

              {/* Name + Role below carousel (for center candidate) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={carouselIdx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="text-center mb-6"
                >
                  <p className="text-white font-semibold text-base">{MOCK_CANDIDATES[carouselIdx].name}</p>
                  <p className="text-gray-400 text-sm font-light mb-3">{MOCK_CANDIDATES[carouselIdx].role}</p>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 24px rgba(255,255,255,0.2)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleMockClick(MOCK_CANDIDATES[carouselIdx])}
                    className="inline-flex items-center gap-2 bg-white text-[#1A1033] px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <Phone className="w-4 h-4 -rotate-12" />
                    Call
                  </motion.button>
                </motion.div>
              </AnimatePresence>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <span className="text-gray-500 text-xs font-medium uppercase tracking-wider">or</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </div>

              {/* Add Your Own Candidate CTA */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setPhase("form")}
                className="w-full bg-gradient-to-r from-[#8B61F6] to-[#6D42D0] hover:from-[#9B71FF] hover:to-[#7D52E0] text-white py-4 rounded-xl font-semibold text-sm tracking-wide transition-all flex items-center justify-center gap-2.5 shadow-[0_0_30px_rgba(139,97,246,0.3)] cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add Your Own Candidate
              </motion.button>

              <p className="text-xs text-gray-600 text-center font-light mt-3">
                Enter details and watch the AI screen them in real-time.
              </p>
            </div>
          </motion.div>
        )}

        {/* ════════ PHASE: FORM ════════ */}
        {phase === "form" && (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#1A1033]/80 backdrop-blur-xl border border-[#3B2875] rounded-3xl p-8 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-[-50%] right-[-50%] w-[100%] h-[100%] bg-gradient-to-br from-[#8B61F6]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              {/* Back button */}
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 text-gray-400 hover:text-white text-xs font-medium mb-5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to candidates
              </button>

              <p className="text-[#8B61F6] text-xs font-bold tracking-[0.2em] uppercase mb-2">Add Candidate</p>
              <h2 className="text-2xl font-medium text-white leading-snug mb-1">
                Enter <span className="font-serif italic font-light text-gray-300">candidate details</span>
              </h2>
              <p className="text-gray-400 text-sm font-light mb-6">
                Fill in the info and we'll start an AI screening call.
              </p>

              <form className="space-y-4" onSubmit={handleFormSubmit}>
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-500 font-medium uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#8B61F6]/60 focus:bg-white/10 transition-all"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-500 font-medium uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    placeholder="john@company.com"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#8B61F6]/60 focus:bg-white/10 transition-all"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-500 font-medium uppercase tracking-wider">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#8B61F6]/60 focus:bg-white/10 transition-all"
                  />
                </div>

                {/* Resume Upload */}
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-500 font-medium uppercase tracking-wider">Resume</label>
                  <label className="flex items-center gap-3 w-full bg-white/5 border border-dashed border-white/15 hover:border-[#8B61F6]/40 rounded-xl px-4 py-3 cursor-pointer transition-all group">
                    <Upload className="w-4 h-4 text-gray-500 group-hover:text-[#8B61F6] transition-colors shrink-0" />
                    <span className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors truncate">
                      {formResume || "Upload resume (PDF, DOC)"}
                    </span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setFormResume(e.target.files[0].name);
                        }
                      }}
                    />
                  </label>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#8B61F6] to-[#6D42D0] hover:from-[#9B71FF] hover:to-[#7D52E0] text-white py-4 rounded-xl font-semibold text-sm tracking-wide transition-all flex items-center justify-center gap-2.5 shadow-[0_0_30px_rgba(139,97,246,0.3)] mt-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4 -rotate-12" />
                  Start AI Screening Call
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}

        {/* ════════ PHASE: CHAT ════════ */}
        {phase === "chat" && activeCandidate && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl overflow-hidden border border-[#3B2875] shadow-2xl flex flex-col"
            style={{
              background: "linear-gradient(180deg, #1e153b 0%, #120a22 100%)",
              height: "480px",
            }}
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/8 shrink-0">
              <div className="flex items-center gap-3">
                {/* Avatar or initial */}
                <div className="relative">
                  {activeCandidate.avatar ? (
                    <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#8B61F6]/50 shadow-[0_0_12px_rgba(139,97,246,0.3)]">
                      <img src={activeCandidate.avatar} alt="" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#8B61F6] to-[#5B3FA6] flex items-center justify-center border-2 border-[#8B61F6]/50 shadow-[0_0_12px_rgba(139,97,246,0.3)]">
                      <span className="text-white text-sm font-medium">
                        {activeCandidate.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  {!chatDone && (
                    <motion.div
                      animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-[-3px] rounded-full border border-[#8B61F6]/40"
                    />
                  )}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold leading-tight">{activeCandidate.name}</p>
                  <div className="flex items-center gap-1.5">
                    <motion.div
                      animate={chatDone ? {} : { opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className={`w-1.5 h-1.5 rounded-full ${chatDone ? "bg-emerald-400" : "bg-[#8B61F6]"}`}
                    />
                    <span className="text-gray-400 text-[11px]">
                      {chatDone ? "Screening Complete" : "AI Screening in Progress"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Waveform */}
                {!chatDone && (
                  <div className="flex items-center gap-[2px] h-5">
                    {waveHeights.map((h, i) => (
                      <div
                        key={i}
                        className="w-[1.5px] rounded-full"
                        style={{
                          height: `${h}px`,
                          background: "linear-gradient(to top, #5531A7, #a78bfa)",
                          transition: "height 130ms ease-in-out",
                        }}
                      />
                    ))}
                  </div>
                )}
                {/* Timer */}
                <span className="text-[#a78bfa] text-xs font-mono">{fmt(seconds)}</span>
                {/* Close */}
                <button
                  onClick={handleReset}
                  className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div
              ref={chatRef}
              className="flex-1 overflow-y-auto px-5 py-4 space-y-3 scrollbar-thin"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(139,97,246,0.2) transparent",
              }}
            >
              {messages.map((msg, i) => (
                <ChatBubble key={i} msg={msg} index={i} />
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {isTyping && <TypingIndicator isScreener={typingSender === "screener"} />}
              </AnimatePresence>

              {/* Screening complete badge */}
              <AnimatePresence>
                {chatDone && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex justify-center pt-2"
                  >
                    <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-300 text-xs font-semibold">Screening Complete</span>
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom bar */}
            <div className="px-5 py-3 border-t border-white/5 shrink-0 flex items-center justify-between">
              {chatDone ? (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  onClick={goToReport}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-gradient-to-r from-[#8B61F6] to-[#6D42D0] text-white py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(139,97,246,0.3)] cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  View Screening Report
                </motion.button>
              ) : (
                <div className="flex items-center justify-between w-full">
                  <span className="text-gray-600 text-[10px] font-mono uppercase tracking-wider">Intervue AI</span>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 24px rgba(220,38,38,0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={goToReport}
                    className="flex items-center gap-2 bg-red-500/90 hover:bg-red-500 text-white px-5 py-2.5 rounded-full text-xs font-semibold transition-all shadow-[0_0_16px_rgba(220,38,38,0.3)] cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5 rotate-[135deg]" />
                    End Call
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* ════════ PHASE: REPORT ════════ */}
        {phase === "report" && activeCandidate && (
          <motion.div
            key="report"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl overflow-hidden border border-[#3B2875] shadow-2xl flex flex-col"
            style={{
              background: "linear-gradient(180deg, #1e153b 0%, #120a22 100%)",
              maxHeight: "540px",
            }}
          >
            {/* Report Header */}
            <div className="px-5 py-4 border-b border-white/8 shrink-0">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#8B61F6]" />
                  <span className="text-white/70 text-xs font-semibold tracking-widest uppercase">Screening Report</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3 text-gray-500" />
                  <span className="text-gray-500 text-[11px] font-mono">{fmt(finalDuration)}</span>
                </div>
              </div>

              {/* Candidate info row */}
              <div className="flex items-center gap-3">
                {activeCandidate.avatar ? (
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#8B61F6]/40 shadow-lg shrink-0">
                    <img src={activeCandidate.avatar} alt="" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B61F6] to-[#5B3FA6] flex items-center justify-center border-2 border-[#8B61F6]/40 shrink-0">
                    <span className="text-white text-sm font-medium">{activeCandidate.name.charAt(0)}</span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm truncate">{activeCandidate.name}</p>
                  <p className="text-gray-400 text-xs font-light truncate">{activeCandidate.role || activeCandidate.email}</p>
                </div>
                {/* Verdict badge */}
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${VERDICT_CONFIG[reportData.verdict].bg} ${VERDICT_CONFIG[reportData.verdict].border} border`}>
                  {VERDICT_CONFIG[reportData.verdict].icon}
                  <span className={`text-xs font-bold ${VERDICT_CONFIG[reportData.verdict].color}`}>
                    {VERDICT_CONFIG[reportData.verdict].label}
                  </span>
                </div>
              </div>
            </div>

            {/* Report Body — scrollable */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(139,97,246,0.2) transparent" }}>

              {/* AI Summary */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
              >
                <p className="text-[#8B61F6] text-[10px] font-bold tracking-[0.2em] uppercase mb-2">AI Summary</p>
                <p className="text-white/80 text-[13px] leading-relaxed font-light">
                  {reportData.summary}
                </p>
              </motion.div>

              {/* Score Bars */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <p className="text-[#8B61F6] text-[10px] font-bold tracking-[0.2em] uppercase mb-3">Evaluation Scores</p>
                <div className="space-y-2.5">
                  {reportData.scores.map((score, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white/60 text-xs">{score.label}</span>
                        <span className={`text-xs font-semibold font-mono ${
                          score.value >= 80 ? "text-emerald-400" : score.value >= 65 ? "text-amber-400" : "text-red-400"
                        }`}>{score.value}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${score.value}%` }}
                          transition={{ delay: 0.5 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                          className={`h-full rounded-full ${
                            score.value >= 80
                              ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                              : score.value >= 65
                                ? "bg-gradient-to-r from-amber-500 to-amber-400"
                                : "bg-gradient-to-r from-red-500 to-red-400"
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Transcript toggle */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
              >
                <button
                  onClick={() => setShowTranscript(!showTranscript)}
                  className="flex items-center gap-2 text-[#8B61F6] hover:text-[#a78bfa] text-xs font-semibold transition-colors cursor-pointer"
                >
                  <ScrollText className="w-3.5 h-3.5" />
                  {showTranscript ? "Hide Transcript" : "View Full Transcript"}
                  <motion.span
                    animate={{ rotate: showTranscript ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-xs"
                  >
                    ▼
                  </motion.span>
                </button>

                <AnimatePresence>
                  {showTranscript && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 space-y-2 bg-white/[0.02] border border-white/5 rounded-xl p-3 max-h-[180px] overflow-y-auto" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(139,97,246,0.2) transparent" }}>
                        {messages.map((msg, i) => (
                          <div key={i} className="flex gap-2">
                            <span className={`text-[10px] font-bold uppercase tracking-wider shrink-0 w-16 pt-0.5 ${
                              msg.sender === "screener" ? "text-[#8B61F6]" : "text-gray-500"
                            }`}>
                              {msg.sender === "screener" ? "Agent" : "Candidate"}
                            </span>
                            <p className="text-white/60 text-xs leading-relaxed">{msg.text}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Report Footer */}
            <div className="px-5 py-3 border-t border-white/5 shrink-0">
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                onClick={handleReset}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-gradient-to-r from-[#8B61F6] to-[#6D42D0] text-white py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(139,97,246,0.3)] cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Screen Mock Candidates
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
