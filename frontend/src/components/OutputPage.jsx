import React from 'react';
import { motion } from 'framer-motion';

function OutputPage({
  messages,
  isLoading,
  chatInput,
  setChatInput,
  handleFileUpload,
  handleChatSubmit,
  scrollRef
}) {
  return (
    <div className="relative space-y-6 pb-40 max-w-4xl mx-auto px-4">

      {/* MESSAGES */}
      {messages.map((msg, idx) => (
        <motion.div
          key={idx}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className="flex flex-col space-y-1">

              {/* USER */}
              {msg.role === 'user' && (
                <div className="px-4 py-3 rounded-2xl bg-green-200 text-black text-[15px] leading-relaxed rounded-br-md">
                  {msg.type === 'text' && (
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  )}

                  {msg.type === 'image' && (
                    <img
                      src={msg.content}
                      alt="Scan"
                      className="rounded-xl max-h-80 object-contain bg-slate-100"
                    />
                  )}
                </div>
              )}

              {/* AI */}
              {msg.role === 'ai' && (
                <div className="text-[16px] leading-relaxed text-slate-900 space-y-4">

                  {msg.type === 'text' && (
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  )}

                  {msg.type === 'scan' && (
                    <div className="space-y-4">

                      <div>
                        <p className="text-xs text-emerald-600 font-semibold">
                          Hasil Identifikasi
                        </p>
                        <h3 className="text-lg font-semibold text-slate-900">
                          {msg.content.plasticType} ({msg.content.plasticName})
                        </h3>
                        <p className="text-sm text-slate-500">
                          Akurasi {msg.content.matchPercentage}%
                        </p>
                      </div>

                      <div>
                        <p className="font-medium text-slate-800 mb-1">
                          Tips daur ulang:
                        </p>
                        <ul className="list-disc ml-5 text-sm text-slate-600 space-y-1">
                          {msg.content.recyclingTips.map((tip, i) => (
                            <li key={i}>{tip}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="font-medium text-slate-800 mb-1">
                          Bank sampah terdekat:
                        </p>
                        <div className="space-y-1 text-sm text-slate-600">
                          {msg.content.rekomendasiBankSampah.map((bank, i) => (
                            <div key={i}>
                              <span className="font-medium text-slate-800">{bank.nama}</span>
                              <span className="text-slate-400"> — {bank.alamat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              )}

              {/* LABEL */}
              <span className="text-[10px] text-slate-400 px-1">
                {msg.role === 'ai' ? 'WasteWise AI' : 'Anda'}
              </span>

            </div>
          </div>
        </motion.div>
      ))}

      {/* LOADING */}
      {isLoading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-[16px]">smart_toy</span>
          </div>

          <div className="flex gap-1">
            <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0.15s]"></div>
            <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0.3s]"></div>
          </div>
        </motion.div>
      )}

      <div ref={scrollRef} className="h-10" />

      {/* FLOATING INPUT (FIXED & RESPONSIVE) */}
      <div className="fixed bottom-6 left-0 right-0 flex justify-center z-50 pointer-events-none">
        <div className="w-full max-w-2xl px-4 pointer-events-auto">

          <form
            onSubmit={handleChatSubmit}
            className="flex items-center gap-2 bg-white/90 backdrop-blur-xl border border-slate-200 rounded-2xl px-4 py-3 shadow-xl shadow-slate-200/50 focus-within:border-emerald-300 focus-within:shadow-emerald-100"
          >

            {/* Upload */}
            <label className="cursor-pointer text-slate-400 hover:text-emerald-600 transition">
              <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
              <span className="material-symbols-outlined">add_photo_alternate</span>
            </label>

            {/* Input */}
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Tanyakan sesuatu..."
              className="flex-1 bg-transparent text-sm px-2 py-2 focus:outline-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleChatSubmit();
                }
              }}
            />

            {/* Send */}
            <button
              type="submit"
              disabled={!chatInput.trim() || isLoading}
              className="bg-emerald-600 text-white p-2 rounded-xl hover:bg-emerald-700 transition disabled:opacity-30"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>

          </form>
        </div>
      </div>

    </div>
  );
}

export default OutputPage;