'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from '@/styles/admin.css';
import { Trash2, Plus, Minus, ChevronLeft } from 'lucide-react'; 
import Link from 'next/link';

export default function CreateProject() {
  const router = useRouter();
  const [project, setProject] = useState({
    name: '',
    description: '',
    width: 0,
    length: 0,
    floors: '1',
    area: 0,
    rooms: 1,
    wallMaterialId: '',
    images: []
  });
  const [wallMaterials, setWallMaterials] = useState([]);
  const [completions, setCompletions] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  // Fetch wall materials on component mount
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch('/api/admin/wall-materials');
        if (!response.ok) throw new Error('Failed to load materials');
        const data = await response.json();
        setWallMaterials(data);
        // Set default wall material if available
        if (data.length > 0) {
          setProject(prev => ({ ...prev, wallMaterialId: data[0].id }));
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMaterials();
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setProject(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newPreviews = [];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        newPreviews.push(reader.result);
        if (newPreviews.length === files.length) {
          setImagePreviews(prev => [...prev, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });

    setNewImages(prev => [...prev, ...files]);
  };

  const handleRemovePreview = (index) => {
    const newPreviews = [...imagePreviews];
    const newFiles = [...newImages];
    
    newPreviews.splice(index, 1);
    newFiles.splice(index, 1);
    
    setImagePreviews(newPreviews);
    setNewImages(newFiles);
  };

  // Completion handlers
  const handleCompletionChange = (index, field, value) => {
    const updatedCompletions = [...completions];
    updatedCompletions[index][field] = field === 'price' ? Number(value) : value;
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
    });
    setCompletions(updatedCompletions);
  };

  const removeDetail = (completionIndex, detailIndex) => {
    const updatedCompletions = [...completions];
    updatedCompletions[completionIndex].details.splice(detailIndex, 1);
    setCompletions(updatedCompletions);
  };

  const addCompletion = () => {
    setCompletions([...completions, {
      completionType: '',
      price: 0,
      details: [{ name: '', value: '', id: Date.now() }],
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
    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('project', JSON.stringify({
        name: project.name,
        description: project.description,
        width: project.width,
        length: project.length,
        floors: project.floors,
        area: project.area,
        rooms: project.rooms,
        wallMaterialId: Number(project.wallMaterialId),
        completions: completions
      }));
      // formData.append('description', project.description);
      // formData.append('width', project.width);
      // formData.append('length', project.length);
      // formData.append('floors', project.floors);
      // formData.append('area', project.area);
      // formData.append('rooms', project.rooms);
      // formData.append('wallMaterialId', Number(project.wallMaterialId));


      if (newImages.length > 0) {
        newImages.forEach(file => {
          formData.append('images', file);
        });
      }
      // First create the project
      const projectResponse = await fetch('/api/admin/projects', {
        method: 'POST',
        body: formData
      });

      if (!projectResponse.ok) {
        const errorData = await projectResponse.json();
        throw new Error(errorData.error || 'Failed to create project');
      }

      const projectData = await projectResponse.json();

      router.push('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <Link href='/admin' className='not-submit-button-admin'><ChevronLeft size={18} /> Назад</Link>
      <h1 className='admin-title'>Создание нового проекта</h1>
      
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} className="admin-form">
        <label>
          Название:
          <input 
            name="name" 
            value={project.name} 
            onChange={handleChange} 
            required 
          />
        </label>
        
        <label>
          Описание:
          <textarea 
            name="description" 
            value={project.description} 
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
              value={project.floors} 
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
            {imagePreviews.map((preview, index) => (
              <div key={index} className="imageCard">
                <p>{index + 1}</p>
                <Image
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  width={200}
                  height={150}
                  className="image"
                />
                <button
                  type="button"
                  onClick={() => handleRemovePreview(index)}
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
              multiple
            />
            <label htmlFor="imageUpload" className="addDetailButton">
              <Plus size={15} /><span>Добавить изображения</span>
            </label>
            {imagePreviews.length > 0 && (
              <p className="imageNote">Будет загружено {imagePreviews.length} изображений</p>
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
            className="addDetailButton"
          >
            <Plus size={15} /> Добавить комплектацию
          </button>
        </div>

        <div className="submit-button-admin">
          <button 
            type="submit" 
            className="uploadButton"
            disabled={isLoading}
          >
            {isLoading ? 'Создание...' : 'Создать проект'}
          </button>
          <Link href='/admin' className='not-submit-button-admin'>Отменить</Link>
        </div>
      </form>
    </div>
  );
}