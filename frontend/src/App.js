import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import CourseList from './components/CourseList';
import CourseForm from './components/CourseForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Container className="mt-4">
          <Routes>
            <Route path="/" element={<CourseList />} />
            <Route path="/create" element={<CourseForm />} />
            <Route path="/edit/:id" element={<CourseForm />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App; 