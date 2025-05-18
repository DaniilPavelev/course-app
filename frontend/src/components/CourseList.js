import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CourseService from '../services/CourseService';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await CourseService.getAllCourses();
        setCourses(data);
        setLoading(false);
      } catch (err) {
        setError('Ошибка при загрузке курсов');
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <div className="text-center my-5">Загрузка курсов...</div>;
  }

  if (error) {
    return <div className="alert alert-danger my-5">{error}</div>;
  }

  if (courses.length === 0) {
    return (
      <div className="text-center my-5">
        <h4>Курсы отсутствуют</h4>
        <Link to="/create" className="btn btn-primary mt-3">
          Создать новый курс
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Список курсов</h2>
        <Link to="/create" className="btn btn-primary">
          Создать новый курс
        </Link>
      </div>
      
      <Row xs={1} md={2} lg={3} className="g-4">
        {courses.map((course, index) => (
          <Col key={index}>
            <Card className="h-100">
              {course.photo && (
                <Card.Img 
                  variant="top" 
                  src={`/api/photos/${course.photo.id}`} 
                  alt={course.name}
                  style={{ height: '180px', objectFit: 'cover' }}
                />
              )}
              <Card.Body>
                <Card.Title>{course.name}</Card.Title>
                <Card.Text>
                  Количество параграфов: {course.paragraphs ? course.paragraphs.length : 0}
                </Card.Text>
                <Link to={`/edit/${course.id}`} className="btn btn-primary">
                  Редактировать
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CourseList; 