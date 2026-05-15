import { motion } from 'framer-motion';

function InputPage({ mode, setMode, chatInput, setChatInput, handleFileUpload, handleChatSubmit }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex flex-col items-center text-center space-y-12 py-10"
    >
      <div className="space-y-4">
        <div className="flex justify-center mb-2">
          <img
            alt="WasteWise Logo"
            className="h-12 w-auto"
            src="/images/logo.webp"
          />
        </div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-black-200 tracking-tight leading-[1.1]">
          Scan Your Plastic Waste Now
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-2xl">
        <button
          onClick={() => setMode('scan')}
          className={`group relative p-6 rounded-xl border-2 transition-all duration-500 text-left ${mode === 'scan' ? 'bg-white border-emerald-500 ' : 'bg-slate-50 border-gray-200 hover:bg-white hover:border-emerald-200'}`}
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-500 ${mode === 'scan' ? 'bg-emerald-600 text-white rotate-6' : 'bg-white text-slate-400 group-hover:scale-110'}`}>
            <span className="material-symbols-outlined text-[28px]">photo_camera</span>
          </div>
          <h3 className="text-xl font-black text-slate-900 mb-1.5">Scan & Identifikasi</h3>
          <p className="text-[13px] font-medium text-slate-500 leading-relaxed">Ambil atau upload foto untuk mengetahui jenis polimer</p>
          {mode === 'scan' && (
            <motion.div layoutId="active-indicator" className="absolute top-4 right-4 w-2 h-2 rounded-full bg-emerald-500" />
          )}
        </button>

        <button
          onClick={() => setMode('chat')}
          className={`group relative p-6 rounded-lg border-2 transition-all duration-500 text-left ${mode === 'chat' ? 'bg-white border-emerald-500' : 'bg-slate-50 border-gray-200 hover:bg-white hover:border-emerald-200'}`}
        >
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-5 transition-all duration-500 ${mode === 'chat' ? 'bg-emerald-600 text-white -rotate-6' : 'bg-white text-slate-400 group-hover:scale-110'}`}>
            <span className="material-symbols-outlined text-[28px]">chat_bubble</span>
          </div>
          <h3 className="text-xl font-black text-slate-900 mb-1.5">Asisten Konsultasi</h3>
          <p className="text-[13px] font-medium text-slate-500 leading-relaxed">Tanyakan apa saja tentang pengelolaan sampah atau tips daur ulang.</p>
          {mode === 'chat' && (
            <motion.div layoutId="active-indicator" className="absolute top-4 right-4 w-2 h-2 rounded-full bg-emerald-500" />
          )}
        </button>
      </div>

      <div className="w-full max-w-full">
        {mode === 'scan' ? (
          <motion.label
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-12 px-10 bg-white border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/30 transition-all group"
          >
            <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
            <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <span className="material-symbols-outlined text-[40px]">upload_file</span>
            </div>
            <p className="text-xl font-black text-slate-900">Klik untuk Unggah Gambar</p>
            <p className="text-sm font-medium text-slate-400 mt-2">Mendukung format JPG dan PNG (Maks. 10MB)</p>
          </motion.label>
        ) : (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleChatSubmit}
            className="bg-white border border-slate-200 p-2.5 rounded-2xl shadow-xl shadow-slate-200/30 flex items-center gap-3 focus-within:border-emerald-300 transition-all"
          >
            <div className="flex-1 px-2">
              <textarea
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ketik pertanyaan Anda..."
                className="w-full text-lg font-semibold text-slate-900 placeholder:text-slate-300 focus:outline-none resize-none min-h-10 max-h-36 flex items-center"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleChatSubmit();
                  }
                }}
              />
            </div>
            <button
              type="submit"
              disabled={!chatInput.trim()}
              className="w-10 h-10 bg-emerald-600 text-white rounded-lg flex items-center justify-center hover:bg-emerald-700 transition-all active:scale-90 disabled:opacity-20 shrink-0"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_upward</span>
            </button>
          </motion.form>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {["Cara daur ulang HDPE?", "Lokasi Bank Sampah Sekitar?", "Apa itu polimer PET?"].map((hint, i) => (
            <button
              key={i}
              onClick={() => { setChatInput(hint); setMode('chat'); }}
              className="px-5 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-500 hover:border-emerald-200 hover:text-emerald-700 hover:bg-emerald-50 transition-all shadow-sm"
            >
              {hint}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default InputPage;
