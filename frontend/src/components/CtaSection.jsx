import React from 'react';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function CtaSection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.85', 'center center'],
  });

  // Card scales up and rises as it enters view
  const cardScale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const cardY     = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const cardOp    = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  // Glow blobs parallax inside the card
  const { scrollYProgress: blobScroll } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const blob1X = useTransform(blobScroll, [0, 1], ['-10%', '10%']);
  const blob2X = useTransform(blobScroll, [0, 1], ['10%', '-10%']);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#f8f9fa] overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 lg:px-12 lg:py-32">

        <motion.div
          className="relative overflow-hidden rounded-[3rem] bg-[#082a13] p-10 text-left md:p-16 lg:p-24 shadow-[0_30px_60px_-15px_rgba(13,99,27,0.3)]"
          style={{ scale: cardScale, y: cardY, opacity: cardOp }}
        >
          {/* Parallax glows */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div style={{ x: blob1X }} className="absolute -top-[30%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#1b9c31]/40 blur-[100px]" />
            <motion.div style={{ x: blob2X }} className="absolute bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-[#def8cc]/20 blur-[80px]" />
            <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] rounded-full bg-emerald-500/30 blur-[90px]" />
          </div>

          {/* Content Left-Aligned */}
          <div className="relative z-10 flex flex-col items-start text-left">
            <motion.div
              className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-[#def8cc] shadow-sm"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }} viewport={{ once: true }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#def8cc] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#def8cc]" />
              </span>
              TAKE ACTION
            </motion.div>

            <motion.h2
              className="max-w-4xl text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight mb-6 font-fustat"
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }} viewport={{ once: true }}
            >
              Ready to transform your <br className="hidden md:block" />
              <span className="text-[#def8cc]">waste stream?</span>
            </motion.h2>

            <motion.p
              className="max-w-2xl text-sm leading-relaxed text-white/70 md:text-lg font-medium mb-12"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.33 }} viewport={{ once: true }}
            >
              Join the community of precision recyclers today. Start with a simple scan.
            </motion.p>

            <motion.div
              className="flex flex-col gap-4 sm:flex-row sm:justify-start w-full sm:w-auto"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.42 }} viewport={{ once: true }}
            >
              <motion.a
                href="#process"
                className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-[#def8cc] px-8 py-4 text-sm font-bold text-[#082a13] overflow-hidden"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="material-symbols-outlined text-[20px] transition-transform group-hover:rotate-12">rocket_launch</span>
                Launch Web Demo
              </motion.a>
              <motion.a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 backdrop-blur-sm px-8 py-4 text-sm font-bold text-white"
                whileHover={{ scale: 1.04, backgroundColor: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <span className="material-symbols-outlined text-[20px]">headset_mic</span>
                Contact Sales
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CtaSection;
