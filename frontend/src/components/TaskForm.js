import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const TaskForm = ({ task, index, onChange, onRemove }) => {
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  useEffect(() => {
    if (task.photo) {
      setPhotoPreview(`/api/photos/${task.photo.id}`);
    }
  }, [task.photo]);

  const handleChange = (field, value) => {
    onChange(index, { ...task, [field]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      const previewUrl = URL.createObjectURL(file);
      setPhotoPreview(previewUrl);
      
      // Upload the photo when selected
      uploadPhoto(file);
    }
  };

  const uploadPhoto = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await axios.post('/api/photos/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Update the task with the new photo information
      handleChange('photo', {
        id: response.data.id,
        fileName: response.data.fileName
      });
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };

  return (
    <div className="nested-form mb-3 pb-2">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6>Задача {index + 1}</h6>
        <Button 
          variant="outline-danger" 
          size="sm" 
          onClick={() => onRemove(index)}
        >
          Удалить
        </Button>
      </div>
      
      <Form.Group className="mb-3">
        <Form.Label>Название задачи</Form.Label>
        <Form.Control
          type="text"
          value={task.name || ''}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Введите название задачи"
          required
        />
      </Form.Group>
      
      <Form.Group className="mb-3">
        <Form.Label>Описание задачи</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={task.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Введите описание задачи"
        />
      </Form.Group>
      
      <Form.Group className="mb-3">
        <Form.Label>Правильный ответ</Form.Label>
        <Form.Control
          type="text"
          value={task.rightAnswer || ''}
          onChange={(e) => handleChange('rightAnswer', e.target.value)}
          placeholder="Введите правильный ответ"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Фотография к задаче</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
        />
        {photoPreview && (
          <div className="mt-2">
            <img 
              src={photoPreview} 
              alt="Preview" 
              style={{ maxWidth: '200px', maxHeight: '200px' }}
            />
          </div>
        )}
      </Form.Group>
    </div>
  );
};

export default TaskForm; 