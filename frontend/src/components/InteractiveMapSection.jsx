import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Haversine formula to calculate the distance between two coordinates in km
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const initialLocations = [
  { id: 1, name: "Green Earth Facility", address: "Sudirman St No.45, Central Jakarta", distance: "1.2 km", open: "08:00 - 16:00", rating: "4.8", latitude: -6.202393, longitude: 106.822292 },
  { id: 2, name: "Eco-Hub Lestari", address: "Kebon Kacang Ave, Central Jakarta", distance: "2.5 km", open: "09:00 - 17:00", rating: "4.9", latitude: -6.194590, longitude: 106.820719 },
  { id: 3, name: "Mandiri Recycling Center", address: "Thamrin Blvd, Central Jakarta", distance: "3.8 km", open: "24/7 Drop-off", rating: "4.7", latitude: -6.195000, longitude: 106.823000 },
  { id: 4, name: "JKT Green Community", address: "Senayan, South Jakarta", distance: "5.1 km", open: "07:00 - 15:00", rating: "4.6", latitude: -6.230000, longitude: 106.800000 }
];

function InteractiveMapSection() {
  const [locationsList, setLocationsList] = useState(initialLocations);
  const [activeLocation, setActiveLocation] = useState(0);
  const [userLocation, setUserLocation] = useState(null);
  const [isLocating, setIsLocating] = useState(false);

  const handleLocationClick = (idx) => {
    setActiveLocation(idx);
    setUserLocation(null);
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;

          setUserLocation({ lat: userLat, lng: userLng });

          try {
            // Menerjemahkan koordinat GPS menjadi nama kota asli menggunakan API Gratis OpenStreetMap (Nominatim)
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${userLat}&lon=${userLng}&zoom=10`);
            const data = await res.json();

            // Get real city/town name from Nominatim
            const cityName = data.address?.city || data.address?.town || data.address?.village || data.address?.county || "Your Location";

            // Create dynamic recycling hubs around user
            const dynamicLocations = [
              { id: 101, name: `Main Recycling Center ${cityName}`, address: `Downtown, ${cityName}`, open: "08:00 - 16:00", rating: "4.9", latitude: userLat + 0.004, longitude: userLng + 0.004 },
              { id: 102, name: `Eco-Hub Lestari ${cityName}`, address: `Residential Area, ${cityName}`, open: "09:00 - 17:00", rating: "4.8", latitude: userLat - 0.007, longitude: userLng + 0.002 },
              { id: 103, name: `Mandiri Drop-off Center`, address: `Commercial District, ${cityName}`, open: "24/7 Drop-off", rating: "4.7", latitude: userLat + 0.002, longitude: userLng - 0.006 },
              { id: 104, name: `Green Community ${cityName}`, address: `Local Park, ${cityName}`, open: "07:00 - 15:00", rating: "4.6", latitude: userLat - 0.005, longitude: userLng - 0.005 }
            ];

            // Calculate accurate distance
            const updatedLocations = dynamicLocations.map(loc => {
              const dist = getDistanceFromLatLonInKm(userLat, userLng, loc.latitude, loc.longitude);
              return {
                ...loc,
                realDistanceNum: dist,
                distance: dist < 1 ? `${(dist * 1000).toFixed(0)} m (From You)` : `${dist.toFixed(1)} km (From You)`
              };
            });

            // Sort by nearest
            updatedLocations.sort((a, b) => a.realDistanceNum - b.realDistanceNum);

            setLocationsList(updatedLocations);
            setActiveLocation(0); // Select the nearest
            setIsLocating(false);
          } catch (error) {
            console.error("Failed to get city name:", error);
            alert("Could not determine your city, but coordinates acquired.");
            setIsLocating(false);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Failed to get location. Please ensure location permissions are enabled.");
          setIsLocating(false);
        }
      );
    } else {
      alert("Your browser does not support geolocation.");
    }
  };

  let mapLat = -6.200000;
  let mapLng = 106.816666;

  if (activeLocation >= 0 && locationsList[activeLocation]) {
    mapLat = locationsList[activeLocation].latitude;
    mapLng = locationsList[activeLocation].longitude;
  }

  // Dynamic Google Maps Iframe URL
  const mapSrc = `https://maps.google.com/maps?q=${mapLat},${mapLng}&z=15&output=embed`;

  return (
    <section id="interactive-map" className="relative w-full bg-[#f8f9fa] overflow-hidden">
      {/* Background Abstract Glassmorphism Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#def8cc]/50 blur-[120px]"></div>
        <div className="absolute bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-emerald-100/50 blur-[100px]"></div>
      </div>

      <div className="relative mx-auto max-w-[1400px] px-4 py-24 md:px-8 lg:px-12 lg:py-32 z-10">

        {/* Section Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#0d631b] shadow-sm">
            <span className="material-symbols-outlined text-[16px]">map</span> NETWORK
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#191c1d] leading-[1.1] tracking-tight">
                Recycling Hub <span className="text-[#0d631b]">Locations</span>
              </h2>
            </div>
            <p className="text-gray-500 font-medium max-w-sm text-sm md:text-right">
              Discover verified local recycling partners near your current location.
            </p>
          </div>
        </motion.div>

        {/* Map Container */}
        <motion.div
          className="w-full rounded-[2rem] overflow-hidden border border-black/5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] flex flex-col md:flex-row h-[700px] bg-white relative"
          initial={{ opacity: 0, y: 48, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
          viewport={{ once: true, amount: 0.15 }}
        >

          {/* Sidebar */}
          <div className="w-full md:w-[380px] lg:w-[420px] bg-[#f8f9fa] border-r border-black/5 flex flex-col h-full z-20 shadow-[10px_0_20px_-10px_rgba(0,0,0,0.05)]">
            <div className="p-6 md:p-8 pb-6 border-b border-black/5 bg-white">
              <h2 className="text-xl font-bold text-[#191c1d] mb-2 tracking-tight">Nearest Eco-Hubs</h2>
              <p className="text-xs text-gray-500 mb-6 leading-relaxed">Find nearby partner facilities and start your recycling journey today.</p>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by area or zip code..."
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0d631b] focus:border-transparent transition-all text-xs bg-gray-50 focus:bg-white font-medium"
                />
                <svg className="w-5 h-5 absolute left-3.5 top-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar bg-[#f8f9fa]">
              {locationsList.map((loc, idx) => (
                <div
                  key={loc.id}
                  onClick={() => handleLocationClick(idx)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 border group ${activeLocation === idx ? 'bg-[#0d631b] border-[#0d631b] shadow-lg transform scale-[1.02]' : 'bg-white border-gray-200 hover:border-[#0d631b]/30 hover:shadow-md'}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className={`font-bold text-base tracking-tight ${activeLocation === idx ? 'text-white' : 'text-[#191c1d] group-hover:text-[#0d631b] transition-colors'}`}>{loc.name}</h4>
                    <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-md ${activeLocation === idx ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-700'}`}>
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      {loc.rating}
                    </div>
                  </div>

                  <p className={`text-xs mb-4 flex items-start gap-1.5 ${activeLocation === idx ? 'text-green-50' : 'text-gray-500'}`}>
                    <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {loc.address}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${activeLocation === idx ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-700'}`}>
                      {loc.distance}
                    </span>
                    <span className={`text-xs font-semibold flex items-center gap-1 ${activeLocation === idx ? 'text-green-200' : 'text-emerald-600'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${activeLocation === idx ? 'bg-green-300' : 'bg-emerald-500'}`}></span>
                      {loc.open}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map Area */}
          <div className="w-full md:flex-1 relative h-[400px] md:h-full bg-gray-200 z-10">
            <iframe
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Interactive Map"
              className="absolute inset-0 grayscale-[15%] contrast-[1.05]"
            ></iframe>

            <div className="absolute top-6 right-6 flex flex-col gap-3">
              <button
                onClick={handleGetLocation}
                disabled={isLocating}
                className={`bg-white text-[#191c1d] px-4 py-2.5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] font-bold text-xs flex items-center justify-center gap-2 transition-colors ${isLocating ? 'opacity-70 cursor-wait' : 'hover:bg-gray-50'}`}
              >
                {isLocating ? (
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-[#0d631b]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-[#0d631b]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" /></svg>
                )}
                {isLocating ? 'Locating...' : 'My Location'}
              </button>
              <button className="bg-[#0d631b] text-white px-4 py-2.5 rounded-full shadow-[0_8px_30px_rgba(13,99,27,0.3)] font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#0a4a14] hover:shadow-lg transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                Get Directions
              </button>
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/50 text-sm font-semibold text-gray-700 flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              {userLocation ? 'Nearest recycling center located' : `Showing ${locationsList.length} verified drop-off points`}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default InteractiveMapSection
