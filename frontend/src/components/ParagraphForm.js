import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import HomeworkForm from './HomeworkForm';
import VideoService from '../services/VideoService';

const ParagraphForm = ({ paragraph, index, onChange, onRemove }) => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState(null);

  const handleChange = (field, value) => {
    onChange(index, { ...paragraph, [field]: value });
  };

  const handleHomeworkChange = (homeworkIndex, updatedHomework) => {
    const updatedHomeworks = [...(paragraph.homeworks || [])];
    updatedHomeworks[homeworkIndex] = updatedHomework;
    handleChange('homeworks', updatedHomeworks);
  };

  const handleAddHomework = () => {
    const homeworks = [...(paragraph.homeworks || [])];
    homeworks.push({ name: '', tasks: [] });
    handleChange('homeworks', homeworks);
  };

  const handleRemoveHomework = (homeworkIndex) => {
    const updatedHomeworks = [...(paragraph.homeworks || [])];
    updatedHomeworks.splice(homeworkIndex, 1);
    handleChange('homeworks', updatedHomeworks);
  };

  const handleVideoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoLoading(true);
      setVideoError(null);
      
      try {
        // Upload the video
        const uploadedVideo = await VideoService.uploadVideo(file);
        
        // Update paragraph with video data
        handleChange('video', uploadedVideo);
        setVideoLoading(false);
      } catch (error) {
        setVideoError('Ошибка при загрузке видео');
        setVideoLoading(false);
      }
    }
  };

  const handleRemoveVideo = async () => {
    if (paragraph.video && paragraph.video.id) {
      setVideoLoading(true);
      setVideoError(null);
      
      try {
        await VideoService.deleteVideo(paragraph.video.id);
        handleChange('video', null);
        setVideoLoading(false);
      } catch (error) {
        setVideoError('Ошибка при удалении видео');
        setVideoLoading(false);
      }
    } else {
      handleChange('video', null);
    }
  };

  return (
    <div className="form-section mb-4">
      <div className="d-flex justify-content-between align-items-center form-section-title">
        <h4>Параграф {index + 1}</h4>
        <Button 
          variant="outline-danger" 
          onClick={() => onRemove(index)}
        >
          Удалить параграф
        </Button>
      </div>
      
      <Form.Group className="mb-3">
        <Form.Label>Название параграфа</Form.Label>
        <Form.Control
          type="text"
          value={paragraph.name || ''}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Введите название параграфа"
          required
        />
      </Form.Group>
      
      <Form.Group className="mb-3">
        <Form.Label>Содержание параграфа</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          value={paragraph.textContent || ''}
          onChange={(e) => handleChange('textContent', e.target.value)}
          placeholder="Введите текстовое содержание параграфа"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Видео для параграфа</Form.Label>
        {videoError && <Alert variant="danger">{videoError}</Alert>}
        
        {paragraph.video ? (
          <div className="mb-2">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div>
                <p className="mb-0"><strong>Файл:</strong> {paragraph.video.originalFileName}</p>
                <p className="mb-0"><strong>Размер:</strong> {Math.round(paragraph.video.fileSize / 1024 / 1024 * 100) / 100} MB</p>
              </div>
              <Button 
                variant="outline-danger" 
                size="sm"
                onClick={handleRemoveVideo}
                disabled={videoLoading}
              >
                {videoLoading ? 'Удаление...' : 'Удалить видео'}
              </Button>
            </div>
            <video 
              controls 
              className="img-fluid w-100" 
              style={{ maxHeight: '300px' }}
              src={`/api/videos/${paragraph.video.id}`} 
            />
          </div>
        ) : (
          <div>
            <Form.Control
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              disabled={videoLoading}
            />
            {videoLoading && <Alert variant="info" className="mt-2">Загрузка видео...</Alert>}
          </div>
        )}
      </Form.Group>

      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5>Домашние задания:</h5>
          <Button 
            variant="outline-success" 
            onClick={handleAddHomework}
          >
            Добавить домашнее задание
          </Button>
        </div>
        
        {(paragraph.homeworks || []).map((homework, idx) => (
          <HomeworkForm
            key={idx}
            homework={homework}
            index={idx}
            onChange={handleHomeworkChange}
            onRemove={handleRemoveHomework}
          />
        ))}
      </div>
    </div>
  );
};

export default ParagraphForm; 