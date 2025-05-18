import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import CourseList from './components/CourseList';
import CourseForm from './components/CourseForm';
import Login from './components/Login';
import Register from './components/Register';
import AuthService from './services/AuthService';
import './App.css';

// Protected route component
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const isAuthenticated = AuthService.isAuthenticated();
  const hasRequiredRole = !requiredRole || AuthService.hasRole(requiredRole);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (requiredRole && !hasRequiredRole) {
    return <Navigate to="/" />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Container className="mt-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/" element={
              <ProtectedRoute>
                <CourseList />
              </ProtectedRoute>
            } />
            
            <Route path="/create" element={
              <ProtectedRoute requiredRole="COURSE_CREATOR">
                <CourseForm />
              </ProtectedRoute>
            } />
            
            <Route path="/edit/:id" element={
              <ProtectedRoute requiredRole="COURSE_CREATOR">
                <CourseForm />
              </ProtectedRoute>
            } />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App; 