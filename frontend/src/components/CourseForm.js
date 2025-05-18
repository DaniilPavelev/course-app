import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import ParagraphForm from './ParagraphForm';
import CourseService from '../services/CourseService';

const CourseForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const [course, setCourse] = useState({
    name: '',
    paragraphs: [],
    photo: null
  });
  
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [loading, setLoading] = useState(isEditing);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isEditing) {
      const fetchCourse = async () => {
        try {
          const data = await CourseService.getCourseById(id);
          setCourse(data);
          if (data.photo) {
            setPhotoPreview(`/api/photos/${data.photo.id}`);
          }
          setLoading(false);
        } catch (err) {
          setError('Ошибка при загрузке курса');
          setLoading(false);
        }
      };

      fetchCourse();
    }
  }, [id, isEditing]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      const previewUrl = URL.createObjectURL(file);
      setPhotoPreview(previewUrl);
    }
  };

  const handleParagraphChange = (index, updatedParagraph) => {
    const updatedParagraphs = [...course.paragraphs];
    updatedParagraphs[index] = updatedParagraph;
    setCourse({ ...course, paragraphs: updatedParagraphs });
  };

  const handleAddParagraph = () => {
    setCourse({
      ...course,
      paragraphs: [...course.paragraphs, { name: '', textContent: '', homeworks: [] }]
    });
  };

  const handleRemoveParagraph = (index) => {
    const updatedParagraphs = [...course.paragraphs];
    updatedParagraphs.splice(index, 1);
    setCourse({ ...course, paragraphs: updatedParagraphs });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);
    
    try {
      let photoData = course.photo;
      
      // Upload photo if a new one is selected
      if (photoFile) {
        const uploadedPhotoData = await CourseService.uploadPhoto(photoFile);
        photoData = {
          id: uploadedPhotoData.id,
          fileName: uploadedPhotoData.fileName
        };
      }
      
      // Prepare course data
      const courseData = {
        ...course,
        photo: photoData
      };
      
      // Create or update course
      const result = await CourseService.createCourse(courseData);
      
      setSuccess('Курс успешно сохранен!');
      setSubmitting(false);
      
      // Navigate back to course list after a short delay
      setTimeout(() => {
        navigate('/');
      }, 1500);
      
    } catch (err) {
      setError('Ошибка при сохранении курса');
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center my-5">Загрузка курса...</div>;
  }

  return (
    <div>
      <h2 className="mb-4">{isEditing ? 'Редактирование курса' : 'Создание нового курса'}</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <div className="form-section mb-4">
          <div className="form-section-title">
            <h4>Основная информация</h4>
          </div>
          
          <Form.Group className="mb-3">
            <Form.Label>Название курса</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={course.name}
              onChange={handleInputChange}
              placeholder="Введите название курса"
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Фотография курса</Form.Label>
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

        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>Параграфы</h3>
            <Button 
              variant="primary" 
              onClick={handleAddParagraph}
            >
              Добавить параграф
            </Button>
          </div>
          
          {course.paragraphs.map((paragraph, index) => (
            <ParagraphForm
              key={index}
              paragraph={paragraph}
              index={index}
              onChange={handleParagraphChange}
              onRemove={handleRemoveParagraph}
            />
          ))}
          
          {course.paragraphs.length === 0 && (
            <div className="text-center py-5 bg-light rounded">
              <p className="mb-3">У этого курса пока нет параграфов</p>
              <Button variant="outline-primary" onClick={handleAddParagraph}>
                Добавить первый параграф
              </Button>
            </div>
          )}
        </div>
        
        <div className="d-flex justify-content-between mt-4 mb-5">
          <Button 
            variant="secondary" 
            onClick={() => navigate('/')}
          >
            Отмена
          </Button>
          <Button 
            variant="success" 
            type="submit"
            disabled={submitting}
          >
            {submitting ? 'Сохранение...' : 'Сохранить курс'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CourseForm; 