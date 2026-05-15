import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const techs = [
  {
    icon: 'cloud',
    iconColor: 'text-[#88d982]',
    label: 'Google Cloud',
    sub: 'Compute Engine',
  },
  {
    icon: 'auto_awesome',
    iconColor: 'text-[#ffba45]',
    iconFill: true,
    label: 'Gemini 1.5 Flash',
    sub: 'Vision Analysis',
  },
];

function TechnologySection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.9', 'center center'],
  });

  // Horizontal slide from opposite sides
  const leftX  = useTransform(scrollYProgress, [0, 1], [-60, 0]);
  const rightX = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section ref={sectionRef} id="technology" className="bg-[#2e3132] py-20 overflow-hidden">
      <div className="flex w-full flex-col gap-16 border-x border-white/5 px-4 md:flex-row md:items-center md:justify-between md:px-8 lg:px-12">

        {/* Left text */}
        <motion.div className="max-w-xl" style={{ x: leftX, opacity }}>
          <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-[#cbffc2]">Infrastructure</span>
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-[32px] md:leading-10">
            Precision Intelligence for Circular Economy
          </h2>
          <p className="mt-4 leading-7 text-white/60">
            Leveraging enterprise-grade cloud infrastructure and state-of-the-art vision models for global impact.
          </p>
        </motion.div>

        {/* Right tech items */}
        <motion.div
          className="flex flex-wrap items-center gap-10 md:gap-16"
          style={{ x: rightX, opacity }}
        >
          {techs.map((tech, i) => (
            <motion.div
              key={tech.label}
              className="flex cursor-default items-center gap-4 text-white"
              whileHover={{ scale: 1.08, y: -4 }}
              transition={{ type: 'spring', stiffness: 350, delay: 0 }}
            >
              <motion.span
                className={`material-symbols-outlined text-5xl ${tech.iconColor}`}
                style={tech.iconFill ? { fontVariationSettings: '"FILL" 1' } : {}}
                initial={{ rotate: -15, opacity: 0 }}
                whileInView={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: i * 0.15 + 0.2 }}
                viewport={{ once: true }}
              >
                {tech.icon}
              </motion.span>
              <div className="flex flex-col">
                <span className="text-lg font-medium">{tech.label}</span>
                <span className="text-xs uppercase tracking-[0.22em] text-white/40">{tech.sub}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

export default TechnologySection;
