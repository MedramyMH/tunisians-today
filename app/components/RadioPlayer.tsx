// components/RadioPlayer.tsx
'use client';
import { useState, useRef } from 'react';

const stations = [
  {
    id: 1,
    name_ar: 'موزاييك أف أم',
    name_fr: 'Mosaique FM',
    stream_url: 'https://radio.mosaiquefm.net/mosalive',
    country: 'TN',
    category: 'Généraliste'
  },
  {
    id: 2,
    name_ar: 'إكسبريس أف أم',
    name_fr: 'Express FM',
    stream_url: 'https://expressfm.ice.infomaniak.ch/expressfm-64.mp3',
    country: 'TN',
    category: 'Généraliste'
  },
  {
    id: 3,
    name_ar: 'جوهرة أف أم',
    name_fr: 'Jawhara FM',
    stream_url: 'https://streaming2.toutech.net/jawharafm',
    country: 'TN',
    category: 'Musique'
  }
];

export default function RadioPlayer({ lang = 'ar' }) {
  const [currentStation, setCurrentStation] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = (station) => {
    if (currentStation?.id === station.id && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (currentStation?.id !== station.id) {
        audioRef.current.src = station.stream_url;
        setCurrentStation(station);
      }
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="bg-gray-100 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">
        {lang === 'ar' ? 'الراديو المباشر' : 'Radio en Direct'}
      </h2>
      
      <audio ref={audioRef} className="hidden" />
      
      <div className="space-y-3">
        {stations.map(station => (
          <div key={station.id} className="flex items-center justify-between p-3 bg-white rounded">
            <div>
              <h3 className="font-semibold">
                {lang === 'ar' ? station.name_ar : station.name_fr}
              </h3>
              <span className="text-sm text-gray-600">{station.category}</span>
            </div>
            <button
              onClick={() => togglePlay(station)}
              className={`px-4 py-2 rounded ${
                currentStation?.id === station.id && isPlaying
                  ? 'bg-red-600 text-white'
                  : 'bg-green-600 text-white'
              }`}
            >
              {currentStation?.id === station.id && isPlaying 
                ? (lang === 'ar' ? 'إيقاف' : 'Arrêter')
                : (lang === 'ar' ? 'تشغيل' : 'Écouter')
              }
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}