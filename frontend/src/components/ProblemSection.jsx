import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function ProblemSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const problems = [
    {
      id: 0,
      title: "Jargon yang Membingungkan",
      description: "Istilah teknis polimer yang rumit seringkali membuat masyarakat bingung saat mencoba memilah plastik di rumah.",
      image: "/images/problem_jargon_1778347401198.png",
      bgColor: "#E1E4FF",
      textColor: "#1A1A1A"
    },
    {
      id: 1,
      title: "Krisis Kontaminasi",
      description: "Sisa makanan dan minyak pada kemasan menurunkan nilai jual dan kualitas plastik daur ulang secara signifikan.",
      image: "/images/problem_contamination_1778347415025.png",
      bgColor: "#FFF4E1",
      textColor: "#1A1A1A"
    },
    {
      id: 2,
      title: "Kesalahan Identifikasi",
      description: "Jenis plastik yang serupa sulit dibedakan secara visual, memicu kesalahan fatal dalam proses pemilahan manual.",
      image: "/images/problem_identification_1778347431779.png",
      bgColor: "#E1F7FF",
      textColor: "#1A1A1A"
    }
  ];

  return (
    <section id="problem" className="bg-[#F5F5F5] px-6 py-24 w-full">
      <div className="max-w-[1400px] mx-auto">

        {/* Row 1: Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start"
          >
            <h2 className="text-black text-4xl md:text-5xl font-medium leading-[1.1] mb-8 tracking-[-0.03em] font-fustat">
              Masalah dalam <br /> Pemilahan Plastik.
            </h2>
            <button className="bg-black text-white px-6 py-3 rounded-full flex items-center gap-3 group hover:bg-zinc-800 transition-all">
              <span className="text-base font-medium font-grotesk">Pelajari lebih lanjut</span>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </div>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-black/70 text-2xl md:text-3xl leading-relaxed font-fustat">
              Berbagai tantangan masih dihadapi masyarakat dalam memilah plastik secara tepat, mulai dari pemahaman hingga proses identifikasi material.
            </p>
          </motion.div>
        </div>

        {/* Row 2: Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-full">
          {problems.map((problem, index) => (
            <motion.div
              layout
              key={problem.id}
              onClick={() => setActiveIndex(index)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                layout: { duration: 0.6, ease: [0.23, 1, 0.32, 1] }
              }}
              className={`
                cursor-pointer relative overflow-hidden rounded-[32px] p-8 flex flex-col justify-between min-h-[380px]
                ${activeIndex === index ? 'lg:col-span-2' : 'lg:col-span-1'}
                transition-all duration-500 shadow-sm hover:shadow-md
              `}
              style={{
                backgroundColor: problem.bgColor,
              }}
            >
              <div className="relative z-10 flex flex-col justify-between h-full">
                <motion.h3
                  layout="position"
                  className={`text-3xl font-medium leading-tight tracking-tight font-fustat ${activeIndex === index ? 'max-w-xs' : 'max-w-full'}`}
                  style={{ color: problem.textColor }}
                >
                  {problem.title}
                </motion.h3>

                <AnimatePresence mode="wait">
                  {activeIndex === index && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="text-lg font-inter leading-relaxed max-w-sm mb-4"
                      style={{ color: problem.textColor, opacity: 0.7 }}
                    >
                      {problem.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Seamless Masked Image */}
              {problem.image && activeIndex === index && (
                <motion.div
                  initial={{ opacity: 0, x: 40, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 40 }}
                  className="absolute bottom-0 right-0 w-[65%] h-[90%] pointer-events-none z-0"
                  style={{
                    maskImage: 'radial-gradient(circle at center right, black 30%, transparent 85%)',
                    WebkitMaskImage: 'radial-gradient(circle at center right, black 30%, transparent 85%)'
                  }}
                >
                  <img
                    src={problem.image}
                    alt={problem.title}
                    className="w-full h-full object-contain object-right-bottom mix-blend-darken"
                  />
                </motion.div>
              )}

              {/* Number tag for non-active cards */}
              {activeIndex !== index && (
                <div className="absolute top-8 right-8 text-black/20 text-4xl font-black font-fustat">
                  0{index + 1}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProblemSection;
