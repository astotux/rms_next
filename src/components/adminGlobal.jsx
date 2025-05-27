'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import '@/styles/admin.css';
import LogoutButton from './logout';

export default function AdminPanel() {
  const [projects, setProjects] = useState([]);
  const [wallMaterials, setWallMaterials] = useState([]);
  const [builtHouses, setBuiltHouses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newMaterial, setNewMaterial] = useState('');

  useEffect(() => {
    fetch('/api/admin/projects')
      .then((res) => res.json())
      .then(setProjects)
    fetch('/api/admin/wall-materials')
      .then((res) => res.json())
      .then(setWallMaterials);
    fetch('/api/admin/built-houses')
      .then((res) => res.json())
      .then(setBuiltHouses);
  }, []);

  const deleteItem = async (type, id) => {
    await fetch(`/api/admin/${type}/${id}`, { method: 'DELETE' });
    if (type === 'projects') {
      setProjects((prev) => prev.filter((item) => item.id !== id));
    } else if (type === 'wall-materials') {
      setWallMaterials((prev) => prev.filter((item) => item.id !== id));
    } else if (type === 'built-houses') {
      setBuiltHouses((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const startEditing = (id, currentName) => {
    setEditingId(id);
    setEditValue(currentName);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditValue('');
  };

  const saveEdit = async (id) => {
    try {
      const response = await fetch(`/api/admin/wall-materials/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: editValue }),
      });

      if (response.ok) {
        setWallMaterials((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, name: editValue } : item
          )
        );
        setEditingId(null);
      } else {
        console.error('Ошибка при сохранении');
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  const startAdding = () => {
    setIsAdding(true);
    setNewMaterial('');
  };

  const cancelAdding = () => {
    setIsAdding(false);
    setNewMaterial('');
  };

  const addMaterial = async () => {
    try {
      const response = await fetch('/api/admin/wall-materials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newMaterial }),
      });

      if (response.ok) {
        const data = await response.json();
        setWallMaterials((prev) => [...prev, data]);
        setIsAdding(false);
        setNewMaterial('');
      } else {
        console.error('Ошибка при добавлении');
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return (
    <div className="admin-panel">
      <LogoutButton />
      <h1>Админ-панель</h1>

      <section>
        <div className="top-section">
          <h2>Проекты</h2>
          <Link href="/admin/projects/create" className="link-button">Добавить проект</Link>
        </div>
        <ul>
          {projects.map((p) => (
            <li key={p.id} className="item">
              <Link href={p.images.length > 0 && p.completions.length > 0 ? `/projects/${p.id}` : ""} className="link-admin-title">{p.name}</Link>
              <span className='red-text'>{p.images.length > 0 && p.completions.length > 0 ? "" : "нет фото или комплектаций"}</span>
              <div className="actions actions-global">
                <Link href={`/admin/projects/edit/${p.id}`} className="edit">Редактировать</Link>
                <button onClick={() => deleteItem('projects', p.id)} className="delete">Удалить</button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="top-section">
          <h2>Материалы стен</h2>
          {isAdding ? (
            <div className="add-form">
              <input
                type="text"
                value={newMaterial}
                onChange={(e) => setNewMaterial(e.target.value)}
                className="edit-input"
                placeholder="Название материала"
              />
              <div className="actions actions-global">
                <button onClick={addMaterial} className="edit">Добавить</button>
                <button onClick={cancelAdding} className="delete">Отмена</button>
              </div>
            </div>
          ) : (
            <button onClick={startAdding} className="link-button">Добавить материал</button>
          )}
        </div>
        <ul>
          {wallMaterials.map((m) => (
            <li key={m.id} className="item">
              {editingId === m.id ? (
                <div className="edit-form">
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="edit-input"
                  />
                  <div className="actions actions-global">
                    <button onClick={() => saveEdit(m.id)} className="edit">Сохранить</button>
                    <button onClick={cancelEditing} className="delete">Отмена</button>
                  </div>
                </div>
              ) : (
                <>
                  <span>{m.name}</span>
                  <div className="actions actions-global">
                    <button onClick={() => startEditing(m.id, m.name)} className="edit">Редактировать</button>
                    <button onClick={() => deleteItem('wall-materials', m.id)} className="delete">Удалить</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="top-section">
          <h2>Дома на карте</h2>
          <Link href="/admin/built-houses/create" className="link-button">Добавить дом</Link>
        </div>
        
        <ul>
          {builtHouses.map((b) => (
            <li key={b.id} className="item">
              <span>{b.title}</span>
              <div className="actions actions-global">
                <Link href={`/admin/built-houses/edit/${b.id}`} className="edit">Редактировать</Link>
                <button onClick={() => deleteItem('built-houses', b.id)} className="delete">Удалить</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}