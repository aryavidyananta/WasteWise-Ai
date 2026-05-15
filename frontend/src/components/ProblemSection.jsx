import { motion } from 'framer-motion';

const problems = [
  {
    title: 'Jargon Membingungkan',
    text: 'Istilah teknis membuat masyarakat bingung saat memilah plastik di rumah.',
    image: '/images/problem_jargon_1778347401198.png',
    alt: 'Ilustrasi jargon membingungkan',
    tag: '01',
    color: 'from-violet-50 to-indigo-100',
  },
  {
    title: 'Krisis Kontaminasi',
    text: 'Sisa makanan dan minyak sering menurunkan nilai jual plastik daur ulang.',
    image: '/images/problem_contamination_1778347415025.png',
    alt: 'Ilustrasi krisis kontaminasi',
    tag: '02',
    color: 'from-amber-50 to-orange-100',
  },
  {
    title: 'Kesalahan Identifikasi',
    text: 'Jenis plastik serupa mudah tertukar, memicu kesalahan pemilahan material secara manual.',
    image: '/images/problem_identification_1778347431779.png',
    alt: 'Ilustrasi kesalahan identifikasi',
    tag: '03',
    color: 'from-emerald-50 to-teal-100',
  },
];

const TOTAL = problems.length;

// Simple card used in the three-column layout
function ProblemCard({ problem }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="rounded-[1.25rem] overflow-hidden bg-white shadow-[0_18px_30px_rgba(0,0,0,0.08)] border border-black/5 flex flex-col"
    >
      <div className={`flex items-center justify-center p-8 bg-gradient-to-br ${problem.color}`}>
        <img
          src={problem.image}
          alt={problem.alt}
          className="max-h-48 w-full object-contain drop-shadow-[0_16px_24px_rgba(0,0,0,0.14)]"
        />
      </div>

      <div className="p-6 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-[#1b1b1b] mb-1">{problem.title}</h3>
          <p className="text-[#5e5e5e] leading-relaxed text-sm">{problem.text}</p>
        </div>
        <span className="text-4xl font-black text-black/5 leading-none select-none shrink-0">
          {problem.tag}
        </span>
      </div>
    </motion.article>
  );
}

export default function ProblemSection() {
  return (
    <section id="problem" className="bg-[#efede8] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4 inline-flex items-center rounded-full bg-neutral-900 px-4 py-2 text-xs font-semibold text-white shadow-sm">
            Your Problems
          </div>
          <h2 className="mx-auto max-w-3xl text-3xl leading-[1.05] tracking-tight text-[#1b1b1b] md:text-4xl">
            Masalah yang belum <em className="italic">Terselesaikan</em>?
          </h2>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((problem) => (
            <ProblemCard key={problem.title} problem={problem} />
          ))}
        </div>
      </div>
    </section>
  );
}
