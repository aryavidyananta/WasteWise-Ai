import { motion } from 'framer-motion';

const VideoBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-zinc-900">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover brightness-[0.7] contrast-[1.1]"
      >
        <source src="/images/hero-waste.mp4" type="video/mp4" />
      </video>
      {/* Dark Gradient Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/70"></div>
    </div>
  );
};

const Navigation = ({ onOpenScan }) => (
  <nav className="relative z-20 w-full px-6 md:px-[120px] py-6 flex items-center">
    {/* Logo Left */}
    <div className="flex-1 flex justify-start">
      <img 
        src="/images/logo.webp" 
        alt="WasteWise Logo" 
        className="h-9 w-auto drop-shadow-md"
      />
    </div>

    {/* Menu Center */}
    <div className="hidden lg:flex items-center gap-10">
      {[
        { name: 'Features', link: '#features' },
        { name: 'Problem', link: '#problem' },
        { name: 'Process', link: '#process' },
        { name: 'Bank Sampah', link: '#map' }
      ].map((item) => (
        <a 
          key={item.name} 
          href={item.link}
          className="text-[15px] font-grotesk font-medium tracking-[-0.2px] text-white/80 hover:text-white transition drop-shadow-sm"
        >
          {item.name}
        </a>
      ))}
    </div>

    {/* Right Spacer / Button */}
    <div className="flex-1 flex justify-end">
      <button 
        onClick={onOpenScan}
        className="bg-emerald-500 hover:bg-emerald-600 text-black px-6 py-2.5 rounded-full text-[14px] font-grotesk font-bold transition-all shadow-lg hover:scale-105 active:scale-95"
      >
        Scanner
      </button>
    </div>
  </nav>
);

const HeroSection = ({ onOpenScan }) => {
  return (
    <section className="relative w-full h-screen overflow-hidden flex flex-col">
      <VideoBackground />
      <Navigation onOpenScan={onOpenScan} />

      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 relative z-10 -mt-[60px]">
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full p-1 pr-4 border border-white/20 mb-[30px] shadow-2xl"
        >
          <div className="bg-emerald-500 text-white px-3 py-1 rounded-full text-[13px] font-inter font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">star</span>
            New
          </div>
          <span className="text-[13px] font-inter text-white/90 font-medium">Discover AI-Powered Recycling</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[44px] md:text-[84px] font-fustat font-bold tracking-[-3px] md:tracking-[-5px] text-white leading-[1] mb-[24px] drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
        >
          AI-Powered <br className="hidden md:block" /> Polymer Detective
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[18px] md:text-[22px] font-fustat font-medium tracking-[-0.3px] text-white/80 max-w-[760px] mb-[40px] drop-shadow-md leading-relaxed"
        >
          Uncover the hidden identity of every plastic waste with high-precision AI. <br className="hidden md:block" /> Locate circular economy hubs and start your impact effortlessly.
        </motion.p>

        {/* Search Box */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-[728px] bg-black/40 backdrop-blur-2xl rounded-[24px] p-5 flex flex-col gap-4 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
        >
          {/* Top Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-grotesk font-medium text-white/70">60/450 scans used</span>
              <button className="bg-emerald-500 text-black px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tight">Upgrade</button>
            </div>
            <div className="flex items-center gap-1.5 text-white/60">
              <span className="material-symbols-outlined text-[16px]">temp_preferences_custom</span>
              <span className="text-[11px] font-grotesk font-medium">Powered by Gemini 1.5 Flash</span>
            </div>
          </div>

          {/* Main Input Area */}
          <div className="flex-1 bg-white rounded-[16px] shadow-inner flex items-center px-4 py-2 gap-3 group focus-within:ring-2 ring-emerald-500/50 transition-all">
            <input 
              type="text" 
              placeholder="What plastic type are you scanning today?" 
              className="flex-1 outline-none text-[16px] text-slate-900 placeholder:text-slate-400 font-inter bg-transparent"
            />
            <button 
              onClick={onOpenScan}
              className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-emerald-600 hover:scale-105 transition-all shadow-md"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_upward</span>
            </button>
          </div>

          {/* Bottom Row Actions */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {[
                { icon: 'camera_enhance', label: 'Scan' },
                { icon: 'mic', label: 'Voice' },
                { icon: 'info', label: 'Guides' }
              ].map(btn => (
                <button 
                  key={btn.label}
                  onClick={onOpenScan}
                  className="bg-white/10 hover:bg-white/20 px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 text-white/90 text-[12px] font-semibold transition-all border border-white/5"
                >
                  <span className="material-symbols-outlined text-[17px]">{btn.icon}</span>
                  {btn.label}
                </button>
              ))}
            </div>
            <div className="text-white/30 text-[11px] font-grotesk tracking-wider">0/3,000 CHARS</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
