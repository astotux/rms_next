'use client';

import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, Expand  } from 'lucide-react';
import Image from 'next/image';

export default function ProjectGallery({ images = [], name }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    touchEndX.current = 0;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && selectedIndex < images.length - 1) {
      setSelectedIndex((prev) => prev + 1);
    }

    if (isRightSwipe && selectedIndex > 0) {
      setSelectedIndex((prev) => prev - 1);
    }
  };

  const prevImage = () => {
    if (selectedIndex > 0) setSelectedIndex((prev) => prev - 1);
  };

  const nextImage = () => {
    if (selectedIndex < images.length - 1) setSelectedIndex((prev) => prev + 1);
  };

  return (
    <>
      <div className="project-gallery">
      <div
        className="main-image-wrapper"
        onClick={() => setIsModalOpen(true)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        >
        <Image
            src={images?.[selectedIndex]?.url || '/images/house.png'}
            alt={`Проект дома ${name}`}
            className="main-image"
            itemProp="image"
            width={900} height={300}
        />
        <div className="image-overlay">
            <span className="zoom-icon"><Expand size={48} /></span> {/* Или заменишь на SVG/иконку */}
        </div>
        </div>

        <div className="thumbnails-scroll-wrapper">
          <div className="thumbnails">
            {images.map((img, i) => (
              <Image
                key={i}
                src={img.url}
                alt={`Фото проекта ${name}`}
                itemProp="image"
                className={i === selectedIndex ? 'active' : ''}
                onClick={() => setSelectedIndex(i)}
                width={300} height={300}
              />
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>
              <X size={28} />
            </button>
            {selectedIndex > 0 && (
              <button className="modal-prev" onClick={prevImage}>
                <ChevronLeft size={40} />
              </button>
            )}
            <img
              src={images[selectedIndex]?.url}
              alt={`Фото проекта ${name}`}
              className="modal-image"
            />
            {selectedIndex < images.length - 1 && (
              <button className="modal-next" onClick={nextImage}>
                <ChevronRight size={40} />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
