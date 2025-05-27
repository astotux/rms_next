// lib/file-utils.js
import fs from 'fs';
import path from 'path';

export const saveFile = async (file, folder = 'uploads') => {
  // Создаем папку, если ее нет
  const uploadDir = path.join(process.cwd(), 'public', folder);
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // Генерируем уникальное имя файла
  const timestamp = Date.now();
  const ext = path.extname(file.name);
  const filename = `${timestamp}${ext}`;
  const filepath = path.join(uploadDir, filename);

  // Читаем файл как ArrayBuffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Сохраняем файл
  fs.writeFileSync(filepath, buffer);

  return {
    url: `/${folder}/${filename}`,
    filepath
  };
};

export const deleteFile = (fileUrl) => {
  try {
    const filepath = path.join(process.cwd(), 'public', fileUrl);
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
};