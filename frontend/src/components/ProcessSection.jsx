import React from 'react';
import { steps } from '../content/wasteWiseContent';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function ProcessSection() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  // Scroll progress for the animated connector line
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.85', 'center center'],
  });
  const lineWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section ref={sectionRef} id="process" className="relative w-full bg-[#f8f9fa] overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#def8cc]/50 blur-[120px]" />
        <div className="absolute bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-emerald-100/50 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-4 py-24 md:px-8 lg:px-12 lg:py-32">

        {/* Section Header */}
        <motion.div
          className="text-center mb-20 md:mb-28 relative z-10"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#0d631b] shadow-sm">
            <span className="material-symbols-outlined text-[16px]">route</span> PROCESS
          </div>
          <h2 className="mx-auto max-w-3xl text-3xl md:text-4xl lg:text-5xl font-bold text-[#191c1d] leading-[1.1] tracking-tight">
            Three Steps to <span className="text-[#0d631b]">Circular Value</span>
          </h2>
        </motion.div>

        {/* Steps Grid */}
        <div className="relative mt-12 grid grid-cols-1 gap-16 md:grid-cols-3 md:gap-8 lg:gap-12">

          {/* Animated connector line — scroll-driven fill */}
          <div className="hidden md:block absolute top-[48px] left-[16%] right-[16%] h-[3px] z-0 bg-[#0d631b]/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#0d631b]/40 rounded-full origin-left"
              style={{ scaleX: lineWidth }}
            />
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="group relative flex flex-col items-center z-10"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.18 }}
              viewport={{ once: true, amount: 0.25 }}
            >
              {/* Icon & Number Badge */}
              <motion.div
                className="relative mb-10 flex h-24 w-24 items-center justify-center rounded-[20px] bg-white shadow-[0_15px_35px_rgba(0,0,0,0.06)] border border-gray-50"
                whileHover={{ y: -8, boxShadow: '0 24px 40px rgba(13,99,27,0.14)' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-[#def8cc]/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="material-symbols-outlined text-[40px] text-[#0d631b] relative z-10 transition-transform duration-500 group-hover:scale-110">{step.icon}</span>
                <motion.div
                  className="absolute -top-3 -right-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#191c1d] text-sm font-bold text-white shadow-lg ring-4 ring-white"
                  whileInView={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.5, delay: index * 0.18 + 0.4 }}
                  viewport={{ once: true }}
                >
                  {index + 1}
                </motion.div>
              </motion.div>

              {/* Text Content Card */}
              <motion.div
                className="relative w-full flex-1 overflow-hidden rounded-[2rem] bg-white p-8 lg:p-10 text-center border border-black/5"
                whileHover={{ y: -4, boxShadow: '0 24px 50px -12px rgba(13,99,27,0.12)' }}
                transition={{ type: 'spring', stiffness: 250 }}
              >
                <div className="absolute -top-8 -right-4 text-[140px] font-black leading-none text-black/[0.02] select-none group-hover:text-[#0d631b]/5 transition-colors duration-700 pointer-events-none">
                  0{index + 1}
                </div>
                <div className="relative z-10 flex flex-col items-center h-full">
                  <span className="mb-5 inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#0d631b] bg-[#def8cc]/40 px-4 py-1.5 rounded-full ring-1 ring-[#0d631b]/10">
                    {step.phase}
                  </span>
                  <h4 className="mb-4 text-xl font-bold text-[#191c1d] tracking-tight">{step.title}</h4>
                  <p className="leading-relaxed text-sm text-[#5c615a]">{step.description}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProcessSection;
