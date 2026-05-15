import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function HeroSection({ onOpenScan }) {
  const ref = useRef(null);
  const { scrollY } = useScroll();

  // Parallax: bg moves slower than scroll
  const bgY = useTransform(scrollY, [0, 700], ['0%', '28%']);
  // Content lifts and fades as user scrolls away
  const contentY = useTransform(scrollY, [0, 500], [0, -90]);
  const contentOpacity = useTransform(scrollY, [0, 380], [1, 0]);
  // Badge scale pulse effect on load
  const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay } },
  });

  return (
    <section ref={ref} className="relative w-full overflow-hidden" style={{ minHeight: '100vh' }}>
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 scale-110"
        style={{
          backgroundImage:
            'linear-gradient(rgba(9,31,12,0.4),rgba(9,31,12,0.65)),url("https://images.unsplash.com/photo-1721622248657-55b1c5ec1dbe?q=80&w=1074&auto=format&fit=crop")',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          y: bgY,
        }}
      />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex max-w-[1400px] flex-col items-center px-4 pb-24 pt-32 text-center md:px-8 md:pb-28 md:pt-36 lg:px-12 lg:pb-32 lg:pt-40"
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: {} }}
      >
        <motion.div
          variants={fadeUp(0)}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#cbffc2]/30 bg-white/10 px-5 py-2 text-sm font-semibold text-[#cbffc2] backdrop-blur-md shadow-[0_0_15px_rgba(203,255,194,0.15)] transition hover:bg-white/20 hover:scale-105 cursor-default"
        >
          <span className="material-symbols-outlined text-[20px] text-yellow-300 drop-shadow-md">bolt</span>
          <span className="tracking-wide">Gemini 1.5 Flash Integrated</span>
        </motion.div>

        <motion.h1
          variants={fadeUp(0.12)}
          className="max-w-4xl text-5xl font-bold leading-tight tracking-tight text-white drop-shadow-lg md:text-6xl lg:text-7xl xl:text-[80px]"
        >
          <span className="italic">AI-Powered</span> <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#cbffc2]">Polymer Detective</span>
        </motion.h1>

        <motion.p
          variants={fadeUp(0.24)}
          className="mt-8 max-w-2xl text-lg font-medium leading-relaxed text-white/90 drop-shadow-md md:text-xl lg:text-2xl"
        >
          Meet <span className="font-bold italic text-white tracking-wide">WasteWise</span>, your pocket detective that identifies difficult plastics using{' '}
          <span className="font-semibold italic text-[#cbffc2]">high-precision AI</span> and guides you to the nearest circular economy hubs.
        </motion.p>

        <motion.div variants={fadeUp(0.36)} className="mt-12 flex flex-col gap-4 sm:flex-row">
          <motion.button
            onClick={onOpenScan}
            className="inline-flex items-center justify-center gap-3 rounded-full bg-[#0d631b] px-10 py-4 text-base font-semibold text-white shadow-lg shadow-[#0d631b]/20 cursor-pointer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            Scan your First Plastic
          </motion.button>
          <motion.a
            href="#process"
            className="inline-flex items-center justify-center gap-3 rounded-full border border-white/30 bg-white/10 px-10 py-4 text-base font-semibold text-white backdrop-blur-sm"
            whileHover={{ scale: 1.04, backgroundColor: 'rgba(255,255,255,0.18)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            How it works
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 flex flex-col items-center gap-2 opacity-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.div
            className="w-px h-12 bg-white/50 rounded-full origin-top"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
