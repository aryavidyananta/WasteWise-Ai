import { motion } from 'framer-motion';

function Header({ onOpenScan }) {
  return (
    <motion.header
      className="absolute inset-x-0 top-0 z-50 w-full bg-transparent shadow-none"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="flex h-20 w-full items-center justify-between px-4 md:px-8 lg:px-12">
        <a href="#top" className="flex items-center gap-3">
          <img
            alt="WasteWise Logo"
            className="h-9 w-auto"
            src="/images/logo.webp"
          />

        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {['Features', 'Process', 'Technology', 'Contact'].map((item, i) => (
            <motion.a
              key={item}
              className="text-sm font-medium text-white/85 transition-colors hover:text-white"
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}
            >
              {item}
            </motion.a>
          ))}
        </nav>

        <motion.button
          className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white shadow-none transition hover:bg-white/20 cursor-pointer"
          onClick={onOpenScan}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.45 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          Try AI Demo
        </motion.button>
      </div>
    </motion.header>
  )
}

export default Header
