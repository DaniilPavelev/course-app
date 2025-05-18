import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const TaskForm = ({ task, index, onChange, onRemove }) => {
  const handleChange = (field, value) => {
    onChange(index, { ...task, [field]: value });
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
    </div>
  );
};

export default TaskForm; 