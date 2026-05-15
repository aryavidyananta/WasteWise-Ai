import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import InputPage from './InputPage';
import OutputPage from './OutputPage';

function ScanPage() {
  const [step, setStep] = useState('idle'); // 'idle', 'scanning', 'chatting'
  const [mode, setMode] = useState('scan'); // 'scan', 'chat'
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('history'); // 'history', 'search', 'chats', 'scans'
  const [searchQuery, setSearchQuery] = useState('');
  const scrollRef = useRef(null);

  // History Sidebar Data - Persisted in LocalStorage
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('wastewise_history');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Analisis Botol PET', date: 'Hari ini', type: 'scan', messages: [] },
      { id: 2, title: 'Cara Daur Ulang LDPE', date: 'Kemarin', type: 'chat', messages: [] },
    ];
  });

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem('wastewise_history', JSON.stringify(history));
  }, [history]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, step]);

  const getGeoLocation = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
      });
      const { latitude, longitude } = position.coords;
      const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
      const geoData = await geoRes.json();
      return geoData.address.city || geoData.address.town || geoData.address.village || geoData.address.state || "Indonesia";
    } catch {
      return "Indonesia";
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        startScanning(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const startScanning = async (base64Image) => {
    setStep('scanning');
    const userLocation = await getGeoLocation();

    const initialMessages = [{ role: 'user', type: 'image', content: base64Image }];
    setMessages(initialMessages);

    const apiUrl = import.meta.env.VITE_API_URL || 'https://wastewise-ai-7205603676.asia-southeast2.run.app/api';
    try {
      const response = await fetch(`${apiUrl}/scan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64Image, location: userLocation })
      });

      if (!response.ok) throw new Error('Gagal memindai');

      const data = await response.json();
      const updatedMessages = [...initialMessages, { role: 'ai', type: 'scan', content: data }];
      setMessages(updatedMessages);
      setStep('chatting');

      // Add to history
      const newHistoryItem = {
        id: Date.now(),
        title: `Analisis ${data.plasticType || 'Plastik'}`,
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'scan',
        messages: updatedMessages
      };
      setHistory(prev => [newHistoryItem, ...prev]);
    } catch (error) {
      console.error(error);
      setStep('idle');
    }
  };

  const handleChatSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!chatInput.trim() || isLoading) return;

    const question = chatInput;
    setChatInput('');

    const isNewSession = messages.length === 0;
    if (isNewSession) setStep('chatting');

    setIsLoading(true);

    const userMessages = [...messages, { role: 'user', type: 'text', content: question }];
    setMessages(userMessages);

    const userLocation = await getGeoLocation();

    const apiUrl = import.meta.env.VITE_API_URL || 'https://wastewise-ai-7205603676.asia-southeast2.run.app/api';
    try {
      const response = await fetch(`${apiUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question, location: userLocation })
      });

      if (!response.ok) throw new Error('Gagal');

      const data = await response.json();
      const finalMessages = [...userMessages, { role: 'ai', type: 'text', content: data.response }];
      setMessages(finalMessages);

      // Add or Update history
      if (isNewSession) {
        const newHistoryItem = {
          id: Date.now(),
          title: question.substring(0, 24) + (question.length > 24 ? '...' : ''),
          date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'chat',
          messages: finalMessages
        };
        setHistory(prev => [newHistoryItem, ...prev]);
      } else {
        // Update existing history item with latest messages
        setHistory(prev => prev.map(item =>
          item.id === history[0]?.id ? { ...item, messages: finalMessages } : item
        ));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadSession = (session) => {
    setMessages(session.messages || []);
    setStep(session.messages.length > 0 ? 'chatting' : 'idle');
    if (session.messages.length === 0) setMode(session.type || 'scan');
    setActiveTab('history');
  };

  const resetChat = () => {
    setMessages([]);
    setStep('idle');
    setMode('scan');
  };

  // Filter history based on active tab
  const getFilteredHistory = () => {
    if (activeTab === 'chats') {
      return history.filter(item => item.type === 'chat');
    } else if (activeTab === 'scans') {
      return history.filter(item => item.type === 'scan');
    }
    // Untuk search dan history, selalu tampilkan semua data
    return history;
  };

  // Get search results
  const getSearchResults = () => {
    if (!searchQuery) return [];
    return history.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredHistory = getFilteredHistory();
  const searchResults = getSearchResults();

  return (
    <div className="h-screen w-full flex bg-[#F0F2F5] text-slate-900 font-sans overflow-hidden">

      {/* SIDEBAR */}
      <motion.aside
        animate={{ width: isSidebarOpen ? 320 : 72 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="h-full bg-white/80 backdrop-blur-2xl border-r border-slate-200/60 flex flex-col z-40 relative overflow-hidden"
      >

        {/* TOP BAR - LOGO + TOGGLE */}
        <div className="border-b border-slate-200/70 px-3 py-3 flex items-center justify-between">
          {isSidebarOpen && (
            <img
              alt="WasteWise"
              className="h-8 w-auto"
              src="/images/logo.webp"
            />
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="rounded-lg p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition"
            aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            <span className="material-symbols-outlined text-[20px]">
              {isSidebarOpen ? 'view_sidebar' : 'view_sidebar'}
            </span>
          </button>
        </div>

        {/* NAVIGATION SECTION */}
        {isSidebarOpen ? (
          <div className="border-b border-slate-200/70 px-2 py-3 space-y-1.5">
            <div className="space-y-1 pt-1.5">
              {[
                { label: 'New chat', icon: 'add', id: 'new-chat' },
                { label: 'Search', icon: 'search', id: 'search' },
                { label: 'Chats', icon: 'chat_bubble', id: 'chats' },
                { label: 'Scans', icon: 'document_scanner', id: 'scans' },
              ].map(item => (
                <button
                  key={item.label}
                  onClick={item.id === 'new-chat' ? resetChat : () => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition text-[14px] font-medium leading-none ${item.id === 'new-chat'
                    ? 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    : activeTab === item.id
                      ? 'bg-emerald-100 text-emerald-700 font-semibold'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                >
                  <span className="material-symbols-outlined text-[20px] shrink-0 leading-none">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="border-b border-slate-200/70 px-2 py-2 flex flex-col gap-1.5">
            <button
              onClick={resetChat}
              className="flex items-center justify-center p-2 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition"
              title="New chat"
            >
              <span className="material-symbols-outlined text-[20px]">
                add
              </span>
            </button>
            {[
              { label: 'Search', icon: 'search', id: 'search' },
              { label: 'Chats', icon: 'chat_bubble', id: 'chats' },
              { label: 'Scans', icon: 'document_scanner', id: 'scans' },
            ].map(item => (
              <button
                key={item.label}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center justify-center p-2 rounded-lg transition ${activeTab === item.id
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                title={item.label}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {item.icon}
                </span>
              </button>
            ))}
          </div>
        )}



        {/* HISTORY SECTION */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1.5 flex flex-col">

          {isSidebarOpen && (
            <h4 className="px-3 text-[10px] font-black text-slate-400  tracking-widest mb-3">
              {activeTab === 'chats' ? 'Chat History' : activeTab === 'scans' ? 'Scan History' : 'History'}
            </h4>
          )}

          <div className="flex-1 overflow-y-auto space-y-1">
            {filteredHistory.length > 0 ? (
              filteredHistory.map(item => (
                <button
                  key={item.id}
                  onClick={() => loadSession(item)}
                  className="w-full flex items-center px-3 py-2 rounded-lg hover:bg-emerald-50 transition-all"
                >
                  {isSidebarOpen && (
                    <div className="min-w-0 text-left">
                      <p className="text-[13px] font-medium text-slate-700 truncate">
                        {item.title}
                      </p>
                    </div>
                  )}
                </button>
              ))
            ) : isSidebarOpen ? (
              <div className="px-3 py-6 text-center">
                <p className="text-[12px] text-slate-400">
                  Tidak ada riwayat
                </p>
              </div>
            ) : null}
          </div>

        </div>

      </motion.aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col relative min-w-0 bg-[#F8FAFC]">



        {/* SEARCH OVERLAY */}
        {activeTab === 'search' && step === 'idle' && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setActiveTab('history')}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none"
            >
              <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl pointer-events-auto overflow-hidden">
                {/* Search Bar */}
                <div className="flex items-center gap-4 px-6 py-4 border-b border-slate-200">
                  <span className="material-symbols-outlined text-slate-400">search</span>
                  <input
                    type="text"
                    placeholder="Search chats and projects"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent text-base outline-none text-slate-900 placeholder-slate-400"
                    autoFocus
                  />
                  <button
                    onClick={() => setActiveTab('history')}
                    className="text-slate-400 hover:text-slate-600 transition"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>

                {/* Search Results */}
                <div className="max-h-[60vh] overflow-y-auto bg-slate-50/50">
                  {searchResults.length > 0 ? (
                    <div className="divide-y divide-slate-200">
                      {searchResults.map(item => (
                        <button
                          key={item.id}
                          onClick={() => loadSession(item)}
                          className="w-full flex items-center gap-4 px-6 py-3 hover:bg-slate-100 transition-colors text-left group"
                        >
                          <div className="mt-0.5">
                            <span className="material-symbols-outlined text-slate-400 group-hover:text-slate-600 text-[20px] transition">
                              {item.type === 'scan' ? 'document_scanner' : 'chat_bubble'}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-slate-900 truncate">{item.title}</p>
                          </div>
                          <div className="text-right text-sm text-slate-500 whitespace-nowrap ml-4">
                            {item.date}
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="px-6 py-12 text-center">
                      {searchQuery ? (
                        <>
                          <span className="material-symbols-outlined text-5xl text-slate-300 block mb-3">search_off</span>
                          <p className="text-slate-500">Tidak ada hasil untuk "{searchQuery}"</p>
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-5xl text-slate-300 block mb-3">manage_search</span>
                          <p className="text-slate-500">Mulai ketik untuk mencari</p>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}

        {/* Scrollable Area */}
        <main className="flex-1 overflow-y-auto scroll-smooth custom-scrollbar">
          <div className="max-w-4xl mx-auto w-full px-6 py-12">

            {/* IDLE STATE */}
            {step === 'idle' && (
              <InputPage
                mode={mode}
                setMode={setMode}
                chatInput={chatInput}
                setChatInput={setChatInput}
                handleFileUpload={handleFileUpload}
                handleChatSubmit={handleChatSubmit}
              />
            )}

            {/* SCANNING STATE */}
            {step === 'scanning' && (
              <div className="flex flex-col items-center justify-center py-40">
                <div className="relative mb-12">
                  <div className="w-32 h-32 bg-emerald-50 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-6xl text-emerald-600 animate-pulse">biometrics</span>
                  </div>
                  <div className="absolute -inset-4 border-2 border-emerald-400 border-dashed rounded-[3.5rem] animate-[spin_10s_linear_infinite]"></div>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: '100%' }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-0 left-0 right-0 bg-emerald-400/20 border-b-2 border-emerald-500 z-10 rounded-lg"
                  />
                </div>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">Menganalisis Material...</h3>
                <p className="mt-3 text-slate-500 font-medium">Gemini AI sedang memproses struktur molekul polimer</p>
              </div>
            )}

            {/* CHATTING / RESULTS STATE */}
            {(step === 'chatting' || messages.length > 0) && (
              <OutputPage
                messages={messages}
                isLoading={isLoading}
                chatInput={chatInput}
                setChatInput={setChatInput}
                handleFileUpload={handleFileUpload}
                handleChatSubmit={handleChatSubmit}
                scrollRef={scrollRef}
              />
            )}
          </div>
        </main>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E2E8F0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #CBD5E1;
        }
      `}</style>
    </div>
  );
}

export default ScanPage;
