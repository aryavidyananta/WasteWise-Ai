import React, { useState, useRef } from 'react';
import { features } from '../content/wasteWiseContent';
import { motion, useScroll, useTransform } from 'framer-motion';

function KeyFeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef(null);

  // Parallax: right panel drifts up while user scrolls through
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const panelY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={sectionRef} id="key-features" className="relative w-full bg-[#f8f9fa] overflow-hidden">
      {/* Background Abstract Glassmorphism Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#def8cc]/50 blur-[120px]"></div>
        <div className="absolute bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-emerald-100/50 blur-[100px]"></div>
      </div>

      <div className="relative mx-auto max-w-[1400px] px-4 py-24 md:px-8 lg:px-12 lg:py-32 z-10">

        {/* Header Area */}
        <motion.div
          className="mb-16 md:mb-24"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#0d631b] shadow-sm">
            <span className="material-symbols-outlined text-[16px]">stars</span> FEATURES
          </div>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-3xl text-3xl md:text-4xl lg:text-5xl font-bold text-[#191c1d] leading-[1.1] tracking-tight">
              Precision Features for the Circular Economy
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-[#40493d] md:text-base pb-2">
              Advanced tools designed to streamline the recycling process and maximize the economic value of your waste stream.
            </p>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16">

          {/* Left Column: Accordion Features */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true, amount: 0.2 }}
          >
            {features.map((feature, idx) => {
              const isActive = activeFeature === idx;
              return (
                <div
                  key={feature.title}
                  onClick={() => setActiveFeature(idx)}
                  className={`cursor-pointer rounded-[24px] p-6 md:p-8 transition-all duration-500 border ${isActive
                    ? 'bg-white border-transparent shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] scale-100'
                    : 'bg-white/40 border-white/40 hover:bg-white/70 scale-[0.98]'
                    }`}
                >
                  <div className="flex items-start gap-6">
                    {/* Icon Box */}
                    <div className={`mt-1 flex h-14 w-14 shrink-0 items-center justify-center rounded-[14px] transition-colors duration-500 ${isActive
                      ? 'bg-[#def8cc] text-[#0d631b]'
                      : 'bg-[#e9e8e2] text-[#70776c]'
                      }`}>
                      <span className="material-symbols-outlined text-[28px]">{feature.icon}</span>
                    </div>

                    {/* Text Content */}
                    <div className="flex-1">
                      <h3 className={`text-xl font-semibold tracking-tight transition-colors duration-300 ${isActive ? 'text-[#191c1d]' : 'text-[#191c1d]/80'
                        }`}>
                        {feature.title}
                      </h3>

                      {/* Description - CSS Accordion */}
                      <div className={`grid transition-all duration-500 ease-in-out ${isActive ? 'grid-rows-[1fr] mt-3 opacity-100' : 'grid-rows-[0fr] opacity-0'
                        }`}>
                        <div className="overflow-hidden">
                          <p className="text-sm leading-relaxed text-[#5c615a] pr-4">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Right Column: Dynamic Visual with parallax */}
          <motion.div
            className="relative overflow-hidden rounded-[2.5rem] bg-[#1a1a1a] min-h-[500px] h-full shadow-2xl group border border-white/10"
            style={{ y: panelY }}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Background Image / Gradient that reacts to active feature */}
            <div className="absolute inset-0 transition-transform duration-1000 scale-105 group-hover:scale-100">
              {/* Landscape-like abstract gradient matching the reference */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#b3c6b3] via-[#7d9b73] to-[#4a6344] opacity-90"></div>
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-60"></div>
              {/* Vignette */}
              <div className="absolute inset-0 bg-black/20 rounded-[2.5rem]"></div>
            </div>

            {/* Glassmorphism Floating Dashboard (Matches Reference) */}
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="w-full max-w-[420px] rounded-[2rem] border border-white/30 bg-white/20 p-8 backdrop-blur-2xl shadow-[0_30px_60px_rgba(0,0,0,0.15)] relative overflow-hidden">

                {/* Subtle glare effect */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent"></div>

                {/* Glass Header */}
                <div className="flex items-start justify-between relative z-10 mb-12">
                  <div>
                    <h4 className="text-lg font-bold text-[#191c1d] tracking-tight mb-1">{features[activeFeature]?.title || 'Growth statistics'}</h4>
                    <p className="text-xs font-medium text-[#191c1d]/60">Updated just now</p>
                  </div>
                  <div className="flex items-center gap-1 bg-white/40 px-3 py-1.5 rounded-full text-[10px] font-bold text-[#191c1d]">
                    Monthly
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>

                {/* Active Data Readout */}
                <div className="relative z-10 mb-6">
                  <p className="text-[10px] font-bold text-[#191c1d]/70 uppercase tracking-wider mb-1">Impact Metric</p>
                  <motion.div
                    key={activeFeature}
                    className="text-3xl font-medium text-[#191c1d] leading-none tracking-tight"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    {activeFeature === 0 ? '10,948' : activeFeature === 1 ? '85.4%' : activeFeature === 2 ? 'Rp 2.4M' : '24/7'}
                  </motion.div>
                </div>

                {/* Floating Bar Chart */}
                <div className="relative z-10 h-32 w-full flex items-end gap-3">
                  {/* Bar 1 */}
                  <div className="w-1/4 h-[40%] flex flex-col justify-end group/bar">
                    <div className="text-[10px] text-center font-bold text-[#191c1d]/50 mb-2">APRIL</div>
                    <div className="w-full h-full bg-[#191c1d] rounded-xl relative">
                      <div className="absolute -top-4 w-full h-8 border-2 border-dashed border-[#191c1d]/20 rounded-t-xl bg-white/20"></div>
                    </div>
                  </div>
                  {/* Bar 2 */}
                  <div className="w-1/4 h-[55%] flex flex-col justify-end group/bar">
                    <div className="text-[10px] text-center font-bold text-[#191c1d]/50 mb-2">MAY</div>
                    <div className="w-full h-full bg-[#191c1d] rounded-xl relative">
                      <div className="absolute -top-6 w-full h-10 border-2 border-dashed border-[#191c1d]/20 rounded-t-xl bg-white/20"></div>
                    </div>
                  </div>
                  {/* Bar 3 */}
                  <div className="w-1/4 h-[75%] flex flex-col justify-end group/bar">
                    <div className="text-[10px] text-center font-bold text-[#191c1d]/50 mb-2">JUNE</div>
                    <div className="w-full h-full bg-[#191c1d] rounded-xl relative">
                      <div className="absolute -top-4 w-full h-8 border-2 border-dashed border-[#191c1d]/20 rounded-t-xl bg-[#def8cc]"></div>
                    </div>
                  </div>
                  {/* Bar 4 (Active/Highlight) */}
                  <div className="w-1/4 h-[95%] flex flex-col justify-end group/bar">
                    <div className="text-[10px] text-center font-bold text-[#191c1d]/80 mb-2">JULY</div>
                    <div className="w-full h-full bg-[#191c1d] rounded-xl relative shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                      <div className="absolute -top-8 w-full h-14 rounded-t-xl bg-[#def8cc] flex items-center justify-center">
                        <span className="material-symbols-outlined text-[#0d631b] text-sm animate-pulse">{features[activeFeature]?.icon}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Floating particles/dots for extra aesthetic */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-[#def8cc] animate-ping opacity-70"></div>
              <div className="absolute bottom-1/3 right-1/4 w-3 h-3 rounded-full bg-white animate-pulse opacity-50"></div>
              <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse opacity-80"></div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default KeyFeaturesSection;
