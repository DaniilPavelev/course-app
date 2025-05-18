import React from 'react';
import { Form, Button } from 'react-bootstrap';
import HomeworkForm from './HomeworkForm';

const ParagraphForm = ({ paragraph, index, onChange, onRemove }) => {
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