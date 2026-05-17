import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CtaSection from './components/CtaSection'
import FeaturesSection from './components/FeaturesSection'
import InteractiveMapSection from './components/InteractiveMapSection'
import Footer from './components/Footer'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import ProcessSection from './components/ProcessSection'
import ProblemSection from './components/ProblemSection'
import ScanPage from './components/ScanPage'

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="min-h-screen bg-[#F0F2F5] text-slate-900 selection:bg-emerald-100">
      <AnimatePresence mode="wait">
        {currentPage === 'scan' ? (
          <motion.div
            key="scan"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen"
          >
            <ScanPage onBack={() => setCurrentPage('home')} />
          </motion.div>
        ) : (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen"
          >
            {/* <Header onOpenScan={() => setCurrentPage('scan')} /> */}
            <main id="top" className="grid-mesh">
              <HeroSection onOpenScan={() => setCurrentPage('scan')} />
              <ProblemSection />
              <FeaturesSection />
              <InteractiveMapSection />
              <ProcessSection />
              <CtaSection />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
