import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { 
  CheckCircle2, FileText, RotateCcw, Sparkles, 
  Trash2, Plus, GripVertical, FileUp, XCircle, 
  ArrowRight, User, Briefcase, Loader2 
} from "lucide-react";

interface CandidateTemplate {
  name: string;
  role: string;
  avatar: string;
  fileName: string;
  fileSize: string;
  skills: string[];
}

const TEMPLATES: CandidateTemplate[] = [
  {
    name: "Priya Sharma",
    role: "Senior Frontend Engineer",
    avatar: "/avatar_priya.png",
    fileName: "Priya_Sharma_Resume.pdf",
    fileSize: "142 KB",
    skills: ["react", "typescript", "next.js", "system design", "agile", "javascript", "computer science", "frontend"]
  },
  {
    name: "Alex Mercer",
    role: "Customer Success Manager",
    avatar: "/avatar_marcus.png",
    fileName: "Alex_Mercer_CS_Resume.pdf",
    fileSize: "118 KB",
    skills: ["customer success", "crm", "onboarding", "agile", "communication", "salesforce", "zendesk"]
  },
  {
    name: "Sarah Chen",
    role: "UI/UX Designer",
    avatar: "/avatar_sarah.png",
    fileName: "Sarah_Chen_Portfolio.pdf",
    fileSize: "284 KB",
    skills: ["figma", "ui design", "design systems", "prototyping", "html", "css", "usability testing"]
  }
];

const getRecommendedCriteria = (role: string): string[] => {
  const r = role.toLowerCase();
  if (r.includes("front") || r.includes("react") || r.includes("web") || r.includes("software") || r.includes("engineer") || r.includes("developer")) {
    return [
      "3+ years of Javascript, Typescript, or Python experience",
      "Experience working in an agile environment",
      "Bachelor's degree in computer science or related field",
      "Solid understanding of data structures and algorithms"
    ];
  }
  if (r.includes("design") || r.includes("ui") || r.includes("ux") || r.includes("product")) {
    return [
      "Expertise in interface design tools (Figma, Sketch)",
      "Strong portfolio demonstrating design system construction",
      "Experience conducting usability testing and user research",
      "Basic understanding of HTML/CSS front-end development"
    ];
  }
  if (r.includes("success") || r.includes("support") || r.includes("customer") || r.includes("account") || r.includes("manager")) {
    return [
      "2+ years experience in Customer Success or Account Management",
      "Hands-on experience with CRM tools like Salesforce or Zendesk",
      "Proven track record of managing customer onboarding cycles",
      "Experience working in an agile team environment"
    ];
  }
  return [
    "Strong communication and presentation skills",
    "3+ years of industry experience in a similar role",
    "Experience working in a cross-functional team",
    "Proven problem-solving capabilities under pressure"
  ];
};

export function ResumeScreeningHeroVisual() {
  const [step, setStep] = useState<"FORM" | "CRITERIA" | "SCREENING" | "REPORT">("FORM");
  const [candidateName, setCandidateName] = useState("");
  const [role, setRole] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [uploadedFile, setUploadedFile] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  
  const [criteria, setCriteria] = useState<string[]>([]);
  const [autoReject, setAutoReject] = useState(true);
  const [fitThreshold, setFitThreshold] = useState(31);
  const [currentScreeningCriterionIndex, setCurrentScreeningCriterionIndex] = useState(0);
  const [criteriaResults, setCriteriaResults] = useState<{ text: string; matched: boolean }[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFileSize(`${Math.round(file.size / 1024)} KB`);
      setUploadedFile(true);
      setSelectedTemplate(null);
    }
  };

  const getCandidateSkills = (): string[] => {
    if (selectedTemplate !== null) {
      return TEMPLATES[selectedTemplate].skills;
    }
    const r = role.toLowerCase();
    const f = fileName.toLowerCase();
    const skillsSet = new Set<string>();
    
    skillsSet.add("communication");
    skillsSet.add("problem-solving");
    skillsSet.add("agile");

    if (r.includes("front") || r.includes("react") || r.includes("web") || r.includes("engineer") || r.includes("developer") || f.includes("dev") || f.includes("resume")) {
      skillsSet.add("javascript");
      skillsSet.add("typescript");
      skillsSet.add("react");
      skillsSet.add("html");
      skillsSet.add("css");
      skillsSet.add("computer science");
    }
    if (r.includes("design") || r.includes("ui") || r.includes("ux") || r.includes("product") || f.includes("portfolio") || f.includes("design")) {
      skillsSet.add("figma");
      skillsSet.add("ui design");
      skillsSet.add("design systems");
      skillsSet.add("prototyping");
      skillsSet.add("html");
      skillsSet.add("css");
    }
    if (r.includes("success") || r.includes("customer") || r.includes("account") || r.includes("manager") || f.includes("sales") || f.includes("cs")) {
      skillsSet.add("customer success");
      skillsSet.add("crm");
      skillsSet.add("salesforce");
      skillsSet.add("zendesk");
      skillsSet.add("onboarding");
    }
    return Array.from(skillsSet);
  };

  const runMatching = () => {
    const skills = getCandidateSkills();
    return criteria.map(crit => {
      const text = crit.toLowerCase();
      const isMatched = skills.some(skill => {
        const s = skill.toLowerCase();
        return text.includes(s) || s.includes(text);
      });
      return {
        text: crit,
        matched: isMatched
      };
    });
  };

  // Screening simulation state machine
  useEffect(() => {
    if (step !== "SCREENING") return;
    
    const results = runMatching();
    setCriteriaResults(results);
    
    let currentIndex = 0;
    setCurrentScreeningCriterionIndex(0);
    
    const interval = setInterval(() => {
      currentIndex++;
      if (currentIndex < criteria.length) {
        setCurrentScreeningCriterionIndex(currentIndex);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setStep("REPORT");
        }, 800);
      }
    }, 800);
    
    return () => clearInterval(interval);
  }, [step]);

  return (
    <div className="w-full bg-white border border-gray-200 rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between select-none max-w-lg mx-auto min-h-[580px]">
      {/* Background decoration blur */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#8B61F6]/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-200/10 rounded-full blur-[80px] pointer-events-none" />

      {/* HEADER BANNER */}
      {step !== "REPORT" && (
        <div className="flex justify-between items-center border-b border-gray-100 pb-4 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-gray-700 font-bold text-xs uppercase tracking-wider font-sans">AI Screen Processor v2.0</span>
          </div>
          <div className="flex items-center gap-2 bg-[#8B61F6]/10 border border-[#8B61F6]/20 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#8B61F6]" />
            <span className="text-xs text-[#8B61F6] font-semibold font-sans">
              {step === "FORM" ? "Candidate Input" : step === "CRITERIA" ? "Define Criteria" : "Analyzing..."}
            </span>
          </div>
        </div>
      )}

      {/* STEP 1: FORM */}
      {step === "FORM" && (
        <div className="flex-1 flex flex-col justify-between gap-5 py-2">
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 font-semibold uppercase tracking-wider block mb-1.5 font-sans">Candidate Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-sans focus:outline-none focus:border-[#8B61F6] focus:bg-white text-gray-900 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-500 font-semibold uppercase tracking-wider block mb-1.5 font-sans">Target Role</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Senior Frontend Engineer"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-sans focus:outline-none focus:border-[#8B61F6] focus:bg-white text-gray-900 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-500 font-semibold uppercase tracking-wider block mb-1.5 font-sans">Candidate Resume</label>
              <input
                type="file"
                id="resume-file-input"
                accept=".pdf,.docx,.doc,.txt"
                onChange={handleFileChange}
                className="hidden"
              />
              {!uploadedFile ? (
                <label
                  htmlFor="resume-file-input"
                  className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl p-6 cursor-pointer hover:border-[#8B61F6] hover:bg-purple-50/10 transition-all text-center"
                >
                  <FileUp className="w-8 h-8 text-[#8B61F6] mb-2" />
                  <span className="text-xs text-gray-700 font-semibold font-sans">Upload candidate resume</span>
                  <span className="text-[10px] text-gray-400 mt-1 font-sans">Drag & drop or click to choose file</span>
                </label>
              ) : (
                <div className="flex items-center justify-between border border-gray-200 bg-gray-50 rounded-2xl p-4">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="bg-purple-100 p-2.5 rounded-xl text-[#8B61F6] shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs text-gray-900 font-semibold truncate font-sans max-w-[200px]">{fileName}</p>
                      <p className="text-[10px] text-gray-400 font-sans">{fileSize}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setUploadedFile(false);
                      setFileName("");
                      setFileSize("");
                      setSelectedTemplate(null);
                    }}
                    className="text-xs text-rose-600 hover:text-rose-700 font-semibold font-sans px-3 py-1.5 hover:bg-rose-50 rounded-lg transition-colors shrink-0"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>

          <button
            disabled={!candidateName || !role || !uploadedFile}
            onClick={() => {
              setCriteria(getRecommendedCriteria(role));
              setStep("CRITERIA");
            }}
            className="w-full py-3 bg-[#6D42D0] hover:bg-[#8B61F6] disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-100 disabled:shadow-none border border-[#8B61F6]/20 text-white rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-[#8B61F6]/10 active:scale-[0.98] font-sans cursor-pointer shrink-0"
          >
            Next: Configure Criteria
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 2: CRITERIA CONFIGURATION */}
      {step === "CRITERIA" && (
        <div className="flex-1 flex flex-col justify-between gap-4 py-2">
          <div className="space-y-4">
            <div className="flex flex-col gap-1 border-b border-gray-100 pb-2">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-900 font-bold text-sm font-sans">Modify screening criteria</h3>
                <span className="text-[10px] bg-purple-50 text-[#8B61F6] border border-purple-100 px-2 py-0.5 rounded-full font-bold font-sans">
                  {criteria.length} / 5
                </span>
              </div>
              <p className="text-gray-400 text-[11px] font-sans font-light">Add, edit and remove screening criteria</p>
            </div>

            <div className="flex items-start gap-2 bg-[#8B61F6]/5 border border-[#8B61F6]/10 p-3 rounded-xl">
              <Sparkles className="w-3.5 h-3.5 text-[#8B61F6] shrink-0 mt-0.5" />
              <p className="text-[11px] text-gray-700 font-sans leading-relaxed">
                Based on the role <strong className="text-[#8B61F6]">{role}</strong>, we recommend the following criterias:
              </p>
            </div>

            <div className="space-y-2 max-h-[170px] overflow-y-auto pr-1">
              {criteria.map((crit, idx) => (
                <div key={idx} className="flex items-center gap-2 border border-gray-100 bg-gray-50/50 rounded-xl p-2 group hover:border-[#8B61F6]/30 transition-all">
                  <GripVertical className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                  <input
                    type="text"
                    value={crit}
                    onChange={(e) => {
                      const updated = [...criteria];
                      updated[idx] = e.target.value;
                      setCriteria(updated);
                    }}
                    className="flex-1 bg-transparent border-0 outline-none text-xs text-gray-800 font-sans font-medium"
                  />
                  <button
                    onClick={() => {
                      setCriteria(criteria.filter((_, i) => i !== idx));
                    }}
                    className="text-gray-400 hover:text-rose-600 transition-colors cursor-pointer shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <button
                disabled={criteria.length >= 5}
                onClick={() => {
                  if (criteria.length < 5) {
                    setCriteria([...criteria, "New screening criterion"]);
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-transparent rounded-lg text-xs font-semibold text-gray-700 font-sans transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add criteria
              </button>
              {criteria.length >= 5 && (
                <span className="text-[10px] text-amber-600 font-semibold font-sans">Max 5 criteria reached</span>
              )}
            </div>

            <div className="border-t border-gray-100 pt-3 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-900 font-bold font-sans">Auto reject candidates based on their score</p>
                  <p className="text-[10px] text-gray-400 font-sans font-light">Candidates will be disqualified if they don't match the criteria</p>
                </div>
                <button
                  onClick={() => setAutoReject(!autoReject)}
                  className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ${
                    autoReject ? "bg-[#6D42D0]" : "bg-gray-200"
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                      autoReject ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="space-y-2">
                <div className="relative pt-6">
                  {/* Slider Tooltip */}
                  <div
                    className={`absolute top-0 -translate-x-1/2 px-2 py-0.5 rounded text-[10px] font-bold text-white font-sans transition-colors ${
                      fitThreshold < 40 
                        ? "bg-rose-500" 
                        : fitThreshold < 80 
                        ? "bg-amber-500" 
                        : "bg-emerald-500"
                    }`}
                    style={{ left: `${fitThreshold}%` }}
                  >
                    {fitThreshold}
                    {/* Tooltip arrow */}
                    <div className={`absolute bottom-[-3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rotate-45 ${
                      fitThreshold < 40 
                        ? "bg-rose-500" 
                        : fitThreshold < 80 
                        ? "bg-amber-500" 
                        : "bg-emerald-500"
                    }`} />
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={fitThreshold}
                    onChange={(e) => setFitThreshold(Number(e.target.value))}
                    className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#6D42D0] hover:accent-[#8B61F6]"
                    style={{
                      background: `linear-gradient(to right, ${
                        fitThreshold < 40 
                          ? '#f43f5e' 
                          : fitThreshold < 80 
                          ? '#f59e0b' 
                          : '#10b981'
                      } ${fitThreshold}%, #f3f4f6 ${fitThreshold}%)`
                    }}
                  />
                </div>

                <div className="flex justify-between text-[9px] text-gray-400 font-sans">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    Least fit (0-39)
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    Borderline (40-79)
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Most Fit (80-100)
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 border-t border-gray-100 pt-3 shrink-0">
            <button
              onClick={() => setStep("FORM")}
              className="py-3 px-5 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-sm font-semibold transition-colors active:scale-[0.98] font-sans cursor-pointer"
            >
              Back
            </button>
            <button
              disabled={criteria.length === 0}
              onClick={() => setStep("SCREENING")}
              className="flex-1 py-3 bg-[#6D42D0] hover:bg-[#8B61F6] border border-[#8B61F6]/20 text-white rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] font-sans cursor-pointer"
            >
              Screen Candidate
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: SCREENING SIMULATION */}
      {step === "SCREENING" && (
        <div className="flex-1 flex flex-col items-center justify-center py-6 gap-6">
          <div className="relative w-20 h-20 bg-purple-50 rounded-2xl flex items-center justify-center border border-purple-100 shadow-sm overflow-hidden shrink-0">
            {/* Glowing laser line sweeps vertically */}
            <motion.div
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-0 w-full h-[2px] bg-[#8B61F6] shadow-[0_0_10px_#8B61F6]"
            />
            <FileText className="w-9 h-9 text-[#8B61F6]" />
          </div>

          <div className="text-center">
            <h4 className="text-gray-900 font-bold text-sm font-sans mb-1">Evaluating Candidate Resume</h4>
            <p className="text-gray-500 text-xs font-sans">Matching details against {criteria.length} criteria...</p>
          </div>

          {/* List of checked criteria during animation */}
          <div className="w-full max-w-sm space-y-2 mt-2">
            {criteria.map((crit, idx) => {
              const isPending = idx > currentScreeningCriterionIndex;
              const isCurrent = idx === currentScreeningCriterionIndex;
              const isDone = idx < currentScreeningCriterionIndex;
              const matched = criteriaResults[idx]?.matched;

              return (
                <div
                  key={idx}
                  className={`flex items-center justify-between border rounded-xl p-3 transition-all ${
                    isCurrent 
                      ? "bg-purple-50/30 border-[#8B61F6] shadow-sm scale-[1.01]" 
                      : "bg-white border-gray-100 opacity-60"
                  }`}
                >
                  <span className="text-xs font-medium text-gray-800 truncate font-sans max-w-[240px]">{crit}</span>
                  
                  {isPending && (
                    <span className="text-[10px] text-gray-400 font-bold font-sans">Queue</span>
                  )}
                  {isCurrent && (
                    <Loader2 className="w-3.5 h-3.5 text-[#8B61F6] animate-spin shrink-0" />
                  )}
                  {isDone && (
                    matched ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    )
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 4: REPORT */}
      {step === "REPORT" && (
        (() => {
          const matchedResults = criteriaResults.filter(r => r.matched);
          const unmatchedResults = criteriaResults.filter(r => !r.matched);
          const score = criteria.length > 0 ? Math.round((matchedResults.length / criteria.length) * 100) : 0;
          const isRejected = autoReject && score < fitThreshold;
          
          let fitLabel = "Least Fit";
          let fitColor = "text-rose-600 bg-rose-50 border-rose-100";
          if (score >= 80) {
            fitLabel = "Most Fit";
            fitColor = "text-emerald-600 bg-emerald-50 border-emerald-100";
          } else if (score >= 40) {
            fitLabel = "Borderline";
            fitColor = "text-amber-600 bg-amber-50 border-amber-100";
          }

          return (
            <div className="flex-1 flex flex-col justify-between gap-4 py-2">
              <div className="space-y-4">
                {/* Report Header */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-2.5 shrink-0">
                  <h3 className="text-gray-900 font-bold text-sm font-sans">Criteria match report</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-gray-500 font-sans">Score:</span>
                    <span className="text-sm font-bold text-gray-900 font-sans">{score}%</span>
                  </div>
                </div>

                {/* Candidate Overview and Evaluation Result */}
                <div className="flex items-center justify-between border border-gray-100 bg-gray-50/30 rounded-2xl p-4 shrink-0">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="relative shrink-0">
                      {selectedTemplate !== null ? (
                        <img
                          src={TEMPLATES[selectedTemplate].avatar}
                          alt={candidateName}
                          className="w-10 h-10 rounded-full border border-gray-200 object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-purple-50 border border-purple-100 flex items-center justify-center text-[#8B61F6]">
                          <User className="w-5 h-5" />
                        </div>
                      )}
                      <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-0.5 border border-white">
                        <CheckCircle2 className="w-3 text-white" />
                      </div>
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="text-gray-900 font-semibold text-xs leading-tight font-sans truncate">{candidateName}</h4>
                      <p className="text-gray-400 text-[10px] mt-0.5 font-sans truncate max-w-[160px]">{role}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end shrink-0">
                    {isRejected ? (
                      <span className="text-[10px] text-rose-600 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full font-bold font-sans">
                        Auto-Rejected
                      </span>
                    ) : (
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 border rounded-full font-sans ${fitColor}`}>
                        {fitLabel}
                      </span>
                    )}
                  </div>
                </div>

                {/* Dynamic lists for requirements */}
                <div className="space-y-3">
                  {matchedResults.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider font-sans block">Requirements Matched</span>
                      <div className="bg-emerald-50/20 border border-emerald-100/50 rounded-2xl p-3.5 space-y-2">
                        {matchedResults.map((res, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="text-xs text-gray-700 font-medium font-sans leading-relaxed">{res.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {unmatchedResults.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider font-sans block">Requirements Not Matched</span>
                      <div className="bg-rose-50/20 border border-rose-100/50 rounded-2xl p-3.5 space-y-2">
                        {unmatchedResults.map((res, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                            <span className="text-xs text-gray-700 font-medium font-sans leading-relaxed">{res.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Reset button */}
              <button
                onClick={() => {
                  setStep("FORM");
                  setCandidateName("");
                  setRole("");
                  setFileName("");
                  setFileSize("");
                  setUploadedFile(false);
                  setSelectedTemplate(null);
                  setCriteria([]);
                }}
                className="w-full py-3 bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 active:scale-[0.98] font-sans cursor-pointer shrink-0"
              >
                <RotateCcw className="w-4 h-4" />
                Screen Another Candidate
              </button>
            </div>
          );
        })()
      )}
    </div>
  );
}
