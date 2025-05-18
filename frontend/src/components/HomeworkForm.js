import React from 'react';
import { Form, Button } from 'react-bootstrap';
import TaskForm from './TaskForm';

const HomeworkForm = ({ homework, index, onChange, onRemove }) => {
  const handleChange = (field, value) => {
    onChange(index, { ...homework, [field]: value });
  };

  const handleTaskChange = (taskIndex, updatedTask) => {
    const updatedTasks = [...(homework.tasks || [])];
    updatedTasks[taskIndex] = updatedTask;
    handleChange('tasks', updatedTasks);
  };

  const handleAddTask = () => {
    const tasks = [...(homework.tasks || [])];
    tasks.push({ name: '', description: '', rightAnswer: '' });
    handleChange('tasks', tasks);
  };

  const handleRemoveTask = (taskIndex) => {
    const updatedTasks = [...(homework.tasks || [])];
    updatedTasks.splice(taskIndex, 1);
    handleChange('tasks', updatedTasks);
  };

  return (
    <div className="nested-form mb-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5>Домашнее задание {index + 1}</h5>
        <Button 
          variant="outline-danger" 
          size="sm" 
          onClick={() => onRemove(index)}
        >
          Удалить
        </Button>
      </div>
      
      <Form.Group className="mb-3">
        <Form.Label>Название домашнего задания</Form.Label>
        <Form.Control
          type="text"
          value={homework.name || ''}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Введите название домашнего задания"
          required
        />
      </Form.Group>

      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6>Задачи:</h6>
          <Button 
            variant="outline-success" 
            size="sm" 
            onClick={handleAddTask}
          >
            Добавить задачу
          </Button>
        </div>
        
        {(homework.tasks || []).map((task, idx) => (
          <TaskForm
            key={idx}
            task={task}
            index={idx}
            onChange={handleTaskChange}
            onRemove={handleRemoveTask}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeworkForm; 