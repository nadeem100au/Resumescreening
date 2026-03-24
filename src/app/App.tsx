import React, { useState, useEffect } from "react";
import { AnimatePresence, MotionConfig } from "motion/react";
import { SlideOne } from "./components/SlideOne";
import { SlideTwo } from "./components/SlideTwo";
import { SlideThree } from "./components/SlideThree";
import { SlideFour } from "./components/SlideFour";
import { SlideFive } from "./components/SlideFive";
import { SlideSix } from "./components/SlideSix";
import { SlideSeven } from "./components/SlideSeven";
import { SlideEight } from "./components/SlideEight";
import { SlideNine } from "./components/SlideNine";
import { SlideTen } from "./components/SlideTen";
import { SlideSourcing } from "./components/SlideSourcing";
import { IntroSlide } from "./components/IntroSlide";
import { SlideHRAutomation } from "./components/SlideHRAutomation";
import { SlideHRVoice } from "./components/SlideHRVoice";
import { SlideEleven } from "./components/SlideEleven";
import { SlideTwelve } from "./components/SlideTwelve";
import { SlideThirteen } from "./components/SlideThirteen";
import { SlideFourteen } from "./components/SlideFourteen";
import { SlideFifteen } from "./components/SlideFifteen";
import { SlideSixteen } from "./components/SlideSixteen";
import { SlideSeventeen } from "./components/SlideSeventeen";
import { SlideEighteen } from "./components/SlideEighteen";
import { SlideNineteen } from "./components/SlideNineteen";
import { SlideTwenty } from "./components/SlideTwenty";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Force rebuild after version restore 2
export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scale, setScale] = useState(1);
  const [isPortrait, setIsPortrait] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const totalSlides = 14;
  
  const minSwipeDistance = 50;
  // Slide 0: Dark (Intro)
  // Slide 1: Dark (One)
  // Slide 2: Light (Two)
  // Slide 3: Dark (Three)
  // Slide 4: Light (Four)
  // Slide 5: Dark (Five)
  // Slide 6: Light (Sourcing)
  // Slide 7: Dark (HRAutomation)
  // Slide 8: Dark (HRVoice)
  // Slide 9: Light (Six)
  // Slide 10: Dark (Seven)
  // Slide 11: Light (Eight)
  // Slide 12: Dark (Nine)
  // Slide 13: Light (Ten)
  const whiteSlides = [2, 4, 6, 9, 11, 13];
  const isWhiteTheme = whiteSlides.includes(currentSlide);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      if (windowWidth < 768 && windowHeight > windowWidth) {
        setIsPortrait(true);
        // On portrait mobile, we stack them vertically. Scale to fit width perfectly.
        setScale(windowWidth / 1440); 
      } else {
        setIsPortrait(false);
        // Base slide resolution is 1440x810 (16:9)
        const scaleX = windowWidth / 1440;
        const scaleY = windowHeight / 810;
        setScale(Math.min(scaleX, scaleY)); // Fit perfectly in window
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Touch handlers for swipe navigation (landscape/desktop only)
  const onTouchStart = (e: React.TouchEvent) => {
    if (isPortrait) return;
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (isPortrait) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (isPortrait) return;
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    
    const isNextSwipe = distance > minSwipeDistance; 
    const isPrevSwipe = distance < -minSwipeDistance;
    
    if (isNextSwipe && currentSlide < totalSlides - 1) {
      setCurrentSlide(prev => prev + 1);
    }
    
    if (isPrevSwipe && currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
      } else if (e.key === "ArrowLeft") {
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const slidesList = [
    <IntroSlide key="intro" />,
    <SlideOne key="slide1" />,
    <SlideTwo key="slide2" />,
    <SlideThree key="slide3" />,
    <SlideFour key="slide4" />,
    <SlideFive key="slide5" />,
    <SlideSourcing key="sourcing" />,
    <SlideHRAutomation key="hrautomation" />,
    <SlideHRVoice key="hrvoice" />,
    <SlideSix key="slide6" />,
    <SlideSeven key="slide7" />,
    <SlideEight key="slide8" />,
    <SlideNine key="slide9" />,
    <SlideTen key="slide10" />
  ];

  if (isPortrait) {
    const gap = 40;
    const totalHeight = (810 * totalSlides) + (gap * (totalSlides - 1));
    
    return (
      <div className="fixed inset-0 bg-black overflow-y-auto overflow-x-hidden font-sans pb-10">
        <div style={{ width: '100%', height: `${totalHeight * scale}px` }}>
          <MotionConfig transition={{ duration: 0, delay: 0 }}>
            <div 
              className="flex flex-col origin-top-left" 
              style={{ transform: `scale(${scale})`, width: '1440px', gap: `${gap}px` }}
            >
              {slidesList.map((SlideComponent, index) => {
                const isWhite = whiteSlides.includes(index);
                return (
                  <div 
                    key={index}
                    className={`w-[1440px] h-[810px] relative overflow-hidden shrink-0 ${isWhite ? 'bg-white text-gray-900' : 'bg-[#0B051A] text-white'}`}
                  >
                    {!isWhite && (
                      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-40 mix-blend-screen bg-gradient-to-br from-[#0B051A] to-[#170E32]">
                        <div className="absolute w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[120px] top-[-300px] right-[-200px]" />
                        <div className="absolute w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[100px] bottom-[-200px] left-[-200px]" />
                      </div>
                    )}
                    <div className="relative z-10 w-full h-full">
                      {SlideComponent}
                    </div>
                  </div>
                );
              })}
            </div>
          </MotionConfig>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 ${isWhiteTheme ? 'bg-white text-gray-900' : 'bg-[#0B051A] text-white'} overflow-hidden flex items-center justify-center font-sans transition-colors duration-700`}>
      {/* Background elements */}
      <div className={`absolute top-0 left-0 w-full h-full pointer-events-none z-0 mix-blend-screen transition-opacity duration-700 ${isWhiteTheme ? 'opacity-0' : 'opacity-40 bg-gradient-to-br from-[#0B051A] to-[#170E32]'}`}>
        <div className="absolute w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[120px] top-[-300px] right-[-200px]" />
        <div className="absolute w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[100px] bottom-[-200px] left-[-200px]" />
      </div>

      {/* 16:9 Fixed-Size Scaled Container */}
      <div 
        className={`relative z-10 w-[1440px] h-[810px] shrink-0 flex flex-col shadow-2xl origin-center overflow-hidden transition-colors duration-700 ${isWhiteTheme ? 'bg-white' : 'bg-transparent'}`}
        style={{ transform: `scale(${scale})` }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="flex-1 relative w-full h-full">
          <AnimatePresence mode="wait">
            {slidesList[currentSlide]}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={() => setCurrentSlide(prev => Math.max(prev - 1, 0))}
        disabled={currentSlide === 0}
        className={`absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full transition-all backdrop-blur-md border hidden sm:flex ${
          currentSlide === 0 
            ? 'opacity-0 pointer-events-none' 
            : 'opacity-50 hover:opacity-100 hover:scale-110 cursor-pointer'
        } ${
          isWhiteTheme 
            ? 'bg-black/5 hover:bg-black/10 border-black/10 text-gray-900' 
            : 'bg-white/10 hover:bg-white/20 border-white/10 text-white'
        }`}
        aria-label="Previous Slide"
      >
        <ChevronLeft size={24} strokeWidth={1.5} />
      </button>

      <button 
        onClick={() => setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1))}
        disabled={currentSlide === totalSlides - 1}
        className={`absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full transition-all backdrop-blur-md border hidden sm:flex ${
          currentSlide === totalSlides - 1 
            ? 'opacity-0 pointer-events-none' 
            : 'opacity-50 hover:opacity-100 hover:scale-110 cursor-pointer'
        } ${
          isWhiteTheme 
            ? 'bg-black/5 hover:bg-black/10 border-black/10 text-gray-900' 
            : 'bg-white/10 hover:bg-white/20 border-white/10 text-white'
        }`}
        aria-label="Next Slide"
      >
        <ChevronRight size={24} strokeWidth={1.5} />
      </button>

    </div>
  );
}