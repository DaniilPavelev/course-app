import axios from 'axios';

const API_URL = '/api/courses';

const CourseService = {
  getAllCourses: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  },

  getCourseById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching course with id ${id}:`, error);
      throw error;
    }
  },

  createCourse: async (courseData) => {
    try {
      const response = await axios.post(API_URL, courseData);
      return response.data;
    } catch (error) {
      console.error('Error creating course:', error);
      throw error;
    }
  },

  uploadPhoto: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await axios.post('/api/photos/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error uploading photo:', error);
      throw error;
    }
  }
};

export default CourseService; 