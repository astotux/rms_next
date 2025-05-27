'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import styles from '@/styles/admin.css';
import { Trash2, Plus, ChevronLeft } from 'lucide-react'; 
import Link from 'next/link';

export default function EditBuiltHouses() {
  const { id } = useParams();
  const router = useRouter();
  const [house, setHouse] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(`/api/admin/built-houses/${id}`);
        
        if (!response.ok) throw new Error('Failed to load house');

        const houseData = await response.json();
        setHouse({
          ...houseData,
          latitude: Number(houseData.latitude),
          longitude: Number(houseData.longitude)
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id !== 'create') {
      fetchData();
    } else {
      setHouse({
        latitude: 0,
        longitude: 0,
        title: '',
        description: '',
        image: ''
      });
      setIsLoading(false);
    }
  }, [id]);

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

  const handleAddImage = async () => {
    if (!newImage) return;

    try {
      const formData = new FormData();
      formData.append('image', newImage);

      const response = await fetch(`/api/admin/built-houses/${id}/image`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Failed to upload image');

      const { imageUrl } = await response.json();
      setHouse(prev => ({
        ...prev,
        image: imageUrl
      }));
      setNewImage(null);
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      const method = id === 'create' ? 'POST' : 'PUT';
      const url = id === 'create' 
        ? '/api/admin/built-houses' 
        : `/api/admin/built-houses/${id}`;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          latitude: house.latitude,
          longitude: house.longitude,
          title: house.title,
          description: house.description,
          image: house.image
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save house');
      }

      router.push('/admin');
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">Загрузка...</p>
    </div>
  );
  if (error) return <div className="error">Error: {error}</div>;
  if (!house && id !== 'create') return <div className="error">House not found</div>;

  return (
    <div className="container">
      <Link href='/admin' className='not-submit-button-admin'>
        <ChevronLeft size={18} /> Назад
      </Link>
      <h1 className='admin-title'>
        {id === 'create' ? 'Добавление дома на карте' : 'Редактирование дома на карте'}
      </h1>
      
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} className="admin-form">
        <label>
          Название:
          <input 
            name="title" 
            value={house.title || ''} 
            onChange={handleChange} 
            required 
          />
        </label>
        
        <label>
          Описание:
          <textarea 
            name="description" 
            value={house.description || ''} 
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
          {house.image && (
            <div className="imageCard">
              <Image
                src={house.image}
                alt={`House ${house.title}`}
                width={300}
                height={200}
                className="image"
                crossOrigin="anonymous"
              />
              <button
                type="button"
                onClick={() => setHouse(prev => ({ ...prev, image: '' }))}
                className="deleteButton"
              >
                <Trash2 size={15} />
              </button>
            </div>
          )}
          
          {!house.image && (
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
              
              {imagePreview && (
                <div className="previewContainer">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={200}
                    height={150}
                    className="previewImage"
                    crossOrigin="anonymous"
                  />
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="addButton"
                  >
                    Загрузить
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setNewImage(null);
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    className="cancelButton"
                  >
                    Отменить
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="submit-button-admin">
          <button type="submit" className="uploadButton">
            {id === 'create' ? 'Добавить дом' : 'Сохранить изменения'}
          </button>
          <Link href='/admin' className='not-submit-button-admin'>Отменить</Link>
        </div>
      </form>
    </div>
  );
}