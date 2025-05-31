"use client"

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const ShareButton = ({ project, position = "top" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const dropdownRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Защита от отсутствия проекта
  if (!project) {
    return (
      <button 
        className="card-share-cont button-purple" 
        disabled
        aria-label="Загрузка..."
      >
        <Image alt="Поделиться" src="/images/icons/share.png" width={300} height={300} />
      </button>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0
    }).format(price).replace('₽', '₽');
  };

  const shareUrl = `${window.location.origin}/projects/${project.id}`;
  const projectTitle = `Проект дома "${project.name}" от РМСтрой`;
  const minPrice = project.completions?.length > 0 
    ? Math.min(...project.completions.map(c => c.price))
    : 0;
  const shareText = `${projectTitle}. ${project.floors}-этажный дом площадью ${project.area} м². Стоимость от ${formatPrice(minPrice)}`;

  const shareTo = async (social) => {
    const imageUrl = project.images?.[0]?.url || `${window.location.origin}/images/house.png`;

    switch(social) {
      case 'vk':
        window.open(
          `https://vk.com/share.php?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(projectTitle)}&image=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(shareText)}`,
          '_blank',
          'width=600,height=400'
        );
        break;
      case 'tg':
        window.open(
          `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
          '_blank',
          'width=600,height=400'
        );
        break;
        case 'copy':
          navigator.clipboard.writeText(`${shareUrl}`);
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
          break;
      default:
        break;
    }
  };

  return (
    <div className="share-container" ref={dropdownRef}>
      <button 
        className="card-share-cont button-purple"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Поделиться"
      >
        <Image alt="Поделиться" src="/images/icons/share.png" width={300} height={300} />
      </button>
      
      {isOpen && (
        <div className={position === "top" ? "share-dropdown share-dropdown-top" : "share-dropdown share-dropdown-bottom"}>
          <button onClick={() => shareTo('vk')} className="share-option">
            <Image src="/images/icons/vk.svg" alt="ВКонтакте" width={300} height={300} />
            ВКонтакте
          </button>
          <button onClick={() => shareTo('tg')} className="share-option">
            <Image src="/images/icons/tg.png" alt="Telegram" width={300} height={300} />
            Telegram
          </button>
          <button onClick={() => shareTo('copy')} className="share-option">
            <Image src="/images/icons/link.png" alt="Копировать ссылку" width={300} height={300} />
            {isCopied ? 'Скопировано' : 'Копировать'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ShareButton;