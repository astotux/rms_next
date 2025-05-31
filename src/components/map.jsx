'use client';

import React, { useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import '@/styles/map.css';

export default function Map() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    async function fetchHouses() {
      const res = await fetch('/api/houses');
      const data = await res.json();
      setHouses(data);
    }

    fetchHouses();
  }, []);

  useEffect(() => {
    async function loadMap() {
      if (!window.ymaps3 || houses.length === 0) return;

      await window.ymaps3.ready;

      const ymaps3Reactify = await window.ymaps3.import('@yandex/ymaps3-reactify');
      const reactify = ymaps3Reactify.reactify.bindTo(React, ReactDOM);
      const {
        YMap,
        YMapDefaultSchemeLayer,
        YMapDefaultFeaturesLayer,
        YMapControls,
        YMapMarker
      } = reactify.module(window.ymaps3);

      function AppMap() {
        const [openIndex, setOpenIndex] = useState(null);
        const [location, setLocation] = useState({ 
          center: houses[0].coordinates, 
          zoom: 14 
        });

        return (
          <YMap 
            location={location}
            onCameraUpdate={(e) => setLocation(e)}
          >
            <YMapDefaultSchemeLayer />
            <YMapDefaultFeaturesLayer />
            {houses.map((house, index) => (
              <YMapMarker
                  key={index}
                  coordinates={house.coordinates}
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
              {house.image.length > 0 && (
                
                <div className='point'>
                  
                  <img 
                    className={`point-img`} 
                    src={house.image} 
                    alt={house.title}
                  />
                  <div className="point-title">{house.title}</div>
                  <div className={`popup ${openIndex === index ? 'active' : ''}`}>
                    <img src={house.image} alt={house.title} />
                    <div className="popup__title">{house.title}</div>
                    <div className="popup__desc">{house.description}</div>
                  </div>
                </div>
              )}
              
              </YMapMarker>
            ))}
          </YMap>
        );
      }

      const container = document.getElementById('mapa');
      if (container) {
        createRoot(container).render(<AppMap />);
        setMapLoaded(true);
      }
    }

    loadMap();
  }, [houses]);

  return <div id="mapa" style={{ width: '100%', height: '500px' }} />;
}