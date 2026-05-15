import { legalLinks, resourceLinks } from '../content/wasteWiseContent';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function Footer() {
  const footerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start 0.95', 'start 0.4'],
  });
  const footerY  = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const footerOp = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  return (
    <footer ref={footerRef} id="contact" className="border-t border-black/10 bg-[#edeeef]">
      <div className="border-x border-black/5 px-4 py-20 md:px-8 lg:px-12 lg:py-24">
        <motion.div
          className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-4 lg:mb-24"
          style={{ y: footerY, opacity: footerOp }}
        >
          <div className="md:col-span-2">
            <div className="mb-8 flex items-center gap-3">
              <img
                alt="WasteWise Logo"
                className="h-8 w-auto"
                src="/images/logo.webp"
              />
              <span className="text-xl font-bold text-[#0d631b]">WasteWise</span>
            </div>
            <p className="mb-10 max-w-sm leading-7 text-[#40493d]">
              Precision Intelligence for Circular Economy. Empowering individuals and organizations to maximize resource
              recovery.
            </p>
            <div className="flex gap-4">
              <motion.a
                className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white transition hover:text-[#0d631b]"
                href="#top"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <span className="material-symbols-outlined text-[24px]">public</span>
              </motion.a>
              <motion.a
                className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white transition hover:text-[#0d631b]"
                href="#contact"
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <span className="material-symbols-outlined text-[24px]">alternate_email</span>
              </motion.a>
            </div>
          </div>

          <div>
            <h5 className="mb-8 text-sm font-semibold uppercase tracking-[0.22em] text-[#191c1d]">Resource Hub</h5>
            <ul className="flex flex-col gap-5 text-[#40493d]">
              {resourceLinks.map((item) => (
                <li key={item}>
                  <a className="transition hover:text-[#0d631b]" href="#top">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="mb-8 text-sm font-semibold uppercase tracking-[0.22em] text-[#191c1d]">Legal</h5>
            <ul className="flex flex-col gap-5 text-[#40493d]">
              {legalLinks.map((item) => (
                <li key={item}>
                  <a className="transition hover:text-[#0d631b]" href="#top">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col items-center justify-between gap-6 border-t border-black/10 pt-8 text-center md:flex-row md:text-left"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-[#40493d]/70">© 2024 WasteWise. Precision Intelligence for Circular Economy.</p>
          <p className="flex items-center gap-2 text-sm text-[#40493d]">
            Developed by <span className="font-bold text-[#0d631b]">Undiksha</span> Research Team
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
