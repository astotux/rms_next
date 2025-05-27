'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from '@/styles/admin.css';
import { Trash2, Plus, ChevronLeft } from 'lucide-react'; 
import Link from 'next/link';

export default function CreateBuiltHouses() {
  const router = useRouter();
  const [house, setHouse] = useState({
    title: '',
    description: '',
    latitude: 0,
    longitude: 0,
    image: ''
  });
  const [newImage, setNewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setHouse(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setNewImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      const formData = new FormData();
      
      // Добавляем данные дома
      formData.append('title', house.title);
      formData.append('description', house.description);
      formData.append('latitude', house.latitude.toString());
      formData.append('longitude', house.longitude.toString());
      
      // Добавляем изображение, если оно есть
      if (newImage) {
        formData.append('image', newImage);
      }

      const response = await fetch('/api/admin/built-houses', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create house');
      }

      router.push('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <Link href='/admin' className='not-submit-button-admin'>
        <ChevronLeft size={18} /> Назад
      </Link>
      <h1 className='admin-title'>Добавление дома на карте</h1>
      
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} className="admin-form">
        <label>
          Название:
          <input 
            name="title" 
            value={house.title} 
            onChange={handleChange} 
            required 
          />
        </label>
        
        <label>
          Описание:
          <textarea 
            name="description" 
            value={house.description} 
            onChange={handleChange} 
            rows={5}
          />
        </label>

        <div className='label-container-admin'>
          <label>
            Широта:
            <input 
              type="number" 
              step="0.000001"
              name="latitude" 
              value={house.latitude || ''} 
              onChange={handleChange} 
              required 
            />
          </label>
          <label>
            Долгота:
            <input 
              type="number" 
              step="0.000001"
              name="longitude" 
              value={house.longitude || ''} 
              onChange={handleChange} 
              required 
            />
          </label>
        </div>
        
        {/* Image management */}
        <div className="imageSection">
          <h2>Изображение дома</h2>
          
          {imagePreview ? (
            <div className="imageCard">
              <Image
                src={imagePreview}
                alt="Preview"
                width={300}
                height={200}
                className="image"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="deleteButton"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ) : (
            <div className="uploadContainer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={fileInputRef}
                className="fileInput"
                id="imageUpload"
              />
              <label htmlFor="imageUpload" className="addDetailButton">
                <Plus size={15} /><span>Добавить изображение</span>
              </label>
            </div>
          )}
        </div>

        <div className="submit-button-admin">
          <button 
            type="submit" 
            className="uploadButton"
            disabled={isLoading}
          >
            {isLoading ? 'Создание...' : 'Добавить дом'}
          </button>
          <Link href='/admin' className='not-submit-button-admin'>Отменить</Link>
        </div>
      </form>
    </div>
  );
}