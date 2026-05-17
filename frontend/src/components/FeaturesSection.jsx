import React, { useState } from "react";

const features = [
  {
    title: "Deteksi AI Polimer Presisi Tinggi",
    desc: "Identifikasi jenis plastik PET, HDPE, PP, dan lainnya secara instan dengan visi komputer bertenaga AI.",
    image: "/images/polymer_detector_icon_1778257415376.png",
  },
  {
    title: "Estimasi Nilai Ekonomi Real-Time",
    desc: "Dapatkan estimasi harga plastik berdasarkan tren pasar lokal dan global sebelum Anda menjual.",
    image: "/images/economy_estimator_icon_1778257444662.png",
  },
  {
    title: "Jaringan Bank Sampah Terverifikasi",
    desc: "Temukan titik pengumpulan terdekat dengan harga transparan dalam jaringan terverifikasi.",
    image: "/images/ecohub_mapping_visual_1778257478414.png",
  }
];

function FeaturesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            Mudah Digunakan & Terintegrasi
          </h2>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
            Platform kami membantu Anda mengelola dan memaksimalkan nilai sampah dengan cara yang sederhana.
          </p>
        </div>

        {/* Split Layout */}
        <div className="flex flex-col md:flex-row items-center gap-16">

          {/* LEFT: Clickable Features */}
          <div className="w-full md:w-1/2 space-y-8">
            {features.map((feature, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className="w-full text-left flex gap-4 group"
                >
                  {/* Indicator */}
                  <div
                    className={`w-[3px] self-stretch rounded-full transition-all duration-300 ${isActive
                      ? "bg-emerald-500"
                      : "bg-slate-200 group-hover:bg-slate-300"
                      }`}
                  />

                  <div>
                    <h3 className={`text-lg font-semibold transition-colors duration-300 ${isActive ? "text-black" : "text-slate-400 group-hover:text-slate-600"
                      }`}>
                      {feature.title}
                    </h3>
                    <p className={`mt-2 text-sm leading-relaxed transition-colors duration-300 ${isActive ? "text-slate-700" : "text-slate-400"
                      }`}>
                      {feature.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT: Dynamic Visual */}
          <div className="w-full md:w-1/2">
            <div className="rounded-3xl bg-slate-100 h-[420px] flex items-center justify-center overflow-hidden">
              <img
                src={features[activeIndex].image}
                alt={features[activeIndex].title}
                className="max-h-[320px] object-contain transition-all duration-500"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;