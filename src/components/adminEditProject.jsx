'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import styles from '@/styles/admin.css';
import { Trash2, Plus, Minus, ChevronLeft } from 'lucide-react'; 
import Link from 'next/link';

export default function EditProject() {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [wallMaterials, setWallMaterials] = useState([]);
  const [completions, setCompletions] = useState([]);
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
        
        const [projectRes, materialsRes, completionsRes] = await Promise.all([
          fetch(`/api/admin/projects/${id}`),
          fetch('/api/admin/wall-materials'),
          fetch(`/api/admin/projects/${id}/completions`)
        ]);

        if (!projectRes.ok) throw new Error('Failed to load project');
        if (!materialsRes.ok) throw new Error('Failed to load materials');
        if (!completionsRes.ok) throw new Error('Failed to load completions');

        const projectData = await projectRes.json();
        const materialsData = await materialsRes.json();
        const completionsData = await completionsRes.json();

        setProject({
          ...projectData,
          width: Number(projectData.width),
          length: Number(projectData.length),
          area: Number(projectData.area),
          rooms: Number(projectData.rooms),
          wallMaterialId: Number(projectData.wallMaterialId)
        });
        setWallMaterials(materialsData);
        setCompletions(completionsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setProject(prev => ({
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

      const response = await fetch(`/api/admin/projects/${id}/image`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Failed to upload image');

      const newImageData = await response.json();
      setProject(prev => ({
        ...prev,
        images: [...prev.images, newImageData]
      }));
      setNewImage(null);
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteImage = async (imageId) => {
    try {
      const response = await fetch(`/api/admin/projects/${id}/image/${imageId}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete image');

      setProject(prev => ({
        ...prev,
        images: prev.images.filter(img => img.id !== imageId)
      }));
    } catch (err) {
      setError(err.message);
    }
  };

  // Completion handlers
  const handleCompletionChange = (index, field, value) => {
    const updatedCompletions = [...completions];
    updatedCompletions[index][field] = value;
    setCompletions(updatedCompletions);
  };

  const handleDetailChange = (completionIndex, detailIndex, field, value) => {
    const updatedCompletions = [...completions];
    updatedCompletions[completionIndex].details[detailIndex][field] = value;
    setCompletions(updatedCompletions);
  };

  const addDetail = (completionIndex) => {
    const updatedCompletions = [...completions];
    updatedCompletions[completionIndex].details.push({
      name: '',
      value: '',
      id: Date.now() // Temporary ID for new items
    });
    setCompletions(updatedCompletions);
  };

  const removeDetail = (completionIndex, detailIndex) => {
    const updatedCompletions = [...completions];
    updatedCompletions[completionIndex].details.splice(detailIndex, 1);
    setCompletions(updatedCompletions);
  };

  const addCompletion = () => {
    console.log(completions)
    setCompletions([...completions, {
      completionType: '',
      price: 0,
      details: [],
      id: Date.now() // Temporary ID for new items
    }]);
  };

  const removeCompletion = (index) => {
    const updatedCompletions = [...completions];
    updatedCompletions.splice(index, 1);
    setCompletions(updatedCompletions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      // First update project details
      const projectResponse = await fetch(`/api/admin/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: project.name,
          description: project.description,
          width: project.width,
          length: project.length,
          floors: project.floors,
          area: project.area,
          rooms: project.rooms,
          wallMaterialId: project.wallMaterialId
        })
      });

      if (!projectResponse.ok) {
        const errorData = await projectResponse.json();
        throw new Error(errorData.error || 'Failed to update project');
      }

      // Then update completions
      const completionsResponse = await fetch(`/api/admin/projects/${id}/completions`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(completions)
      });

      if (!completionsResponse.ok) {
        const errorData = await completionsResponse.json();
        throw new Error(errorData.error || 'Failed to update completions');
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
  if (!project) return <div className="error">Project not found</div>;

  return (
    <div className="container">
      <Link href='/admin' className='not-submit-button-admin'><ChevronLeft size={18} /> Назад</Link>
      <h1 className='admin-title'>Редактирование проекта
        <br />
        <Link href={`/projects/${project.id}`} className='link-admin-title'>{project.name}</Link>
      </h1>
      
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} className="admin-form">
        <label>
          Название:
          <input 
            name="name" 
            value={project.name || ''} 
            onChange={handleChange} 
            required 
          />
        </label>
        
        <label>
          Описание:
          <textarea 
            name="description" 
            value={project.description || ''} 
            onChange={handleChange} 
            rows={5}
            cols={30}
          />
        </label>
        <div className='label-container-admin'>
        <label>
          Ширина:
          <input 
            type="number" 
            name="width" 
            value={project.width || ''} 
            onChange={handleChange} 
            required 
            min="1"
          />
        </label>
        <p style={{marginBottom: "8px"}}>X</p>
        <label>
          Длина:
          <input 
            type="number" 
            name="length" 
            value={project.length || ''} 
            onChange={handleChange} 
            required 
            min="1"
          />
        </label>
        </div>
        <div className='label-container-admin'>
        <label>
          Этажность:
          <select 
            name="floors" 
            value={project.floors || ''} 
            onChange={handleChange} 
            required
          >
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='1 + мансарда'>1 + мансарда</option>
              <option value='2 + мансарда'>2 + мансарда</option>
          </select>
        </label>
        <label>
          Комнат:
          <input 
            type="number" 
            name="rooms" 
            value={project.rooms || ''} 
            onChange={handleChange} 
            required 
            min="1"
          />
        </label>
        <label>
          Площадь:
          <input 
            type="number" 
            name="area" 
            step="0.1" 
            value={project.area || ''} 
            onChange={handleChange} 
            required 
            min="0.1"
          />
        </label>
        </div>
        
        <label>
          Материал стен:
          <select 
            name="wallMaterialId" 
            value={project.wallMaterialId || ''} 
            onChange={handleChange} 
            required
          >
            {wallMaterials.map((wm) => (
              <option key={wm.id} value={wm.id}>
                {wm.name}
              </option>
            ))}
          </select>
        </label>
        
        {/* Image management */}
        <div className="imageSection">
          <h2>Изображения проекта</h2>
          <div className="imageGrid">
            {project.images?.map((image, index) => (
              <div key={image.id} className="imageCard">
                <p>{index + 1}</p>
                <Image
                  src={image.url}
                  alt={`Project ${project.name}`}
                  width={200}
                  height={150}
                  className="image"
                  crossOrigin="anonymous"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(image.id)}
                  className="deleteButton"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
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
        </div>

        {/* Completions section */}
        <div className="completionsSection">
          <h2>Комплектации</h2>
          {completions.map((completion, completionIndex) => (
            <div key={completion.id || completionIndex} className="completionCard">
              <div className="completionHeader">
                <label>
                  Тип комплектации:
                  <input
                    type="text"
                    value={completion.completionType}
                    onChange={(e) => handleCompletionChange(completionIndex, 'completionType', e.target.value)}
                    required
                  />
                </label>
                <label>
                  Цена (руб):
                  <input
                    type="number"
                    value={completion.price}
                    onChange={(e) => handleCompletionChange(completionIndex, 'price', Number(e.target.value))}
                    required
                    min="0"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => removeCompletion(completionIndex)}
                  className="deleteCompletionButton ml-t"
                >
                  <Trash2 size={15} />
                </button>
              </div>
              
              <div className="detailsList">
                <h4>Характеристики:</h4>
                {completion.details.map((detail, detailIndex) => (
                  <div key={detail.id || detailIndex} className="detailItem">
                    <input
                      type="text"
                      placeholder="Название"
                      value={detail.name}
                      onChange={(e) => handleDetailChange(completionIndex, detailIndex, 'name', e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Значение"
                      value={detail.value}
                      onChange={(e) => handleDetailChange(completionIndex, detailIndex, 'value', e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => removeDetail(completionIndex, detailIndex)}
                      className="deleteCompletionButton"
                    >
                      <Minus size={15} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addDetail(completionIndex)}
                  className="addDetailButton"
                >
                  <Plus size={15} /> Добавить характеристику
                </button>
              </div>
            </div>
          ))}
          
          <button
            type="button"
            onClick={addCompletion}
            className="addCompletionButton"
          >
            <Plus size={15} /> Добавить комплектацию
          </button>
        </div>

        <div className="submit-button-admin">
          <button type="submit" className="uploadButton">
            Сохранить изменения
          </button>
          <Link href='/admin' className='not-submit-button-admin'>Отменить изменения</Link>
        </div>
      </form>
    </div>
  );
}