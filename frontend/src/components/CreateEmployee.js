import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateEmployee.css';
import { createEmployee } from '../api';

const CreateEmployee = () => {
  const [formData, setFormData] = useState({
    f_Name: '',
    f_Email: '',
    f_Mobile: '',
    f_Designation: '',
    f_gender: '',
    f_Course: [],
    f_Image: null,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
  
    if (type === 'checkbox') {
      setFormData(prevState => {
        const newCourses = checked
          ? [...prevState.f_Course, value]
          : prevState.f_Course.filter(course => course !== value);
        return { ...prevState, [name]: newCourses };
      });
    } else if (type === 'file') {
      const file = files[0];
      if (file) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']; // Allowed image types
        if (!allowedTypes.includes(file.type)) {
          setError('Only jpg and png files are allowed.');
          return;
        }
  
        // Convert the file to a URL string
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prevState => ({
            ...prevState,
            [name]: reader.result // The URL string representing the file
          }));
        };
        reader.readAsDataURL(file); // Read the file as a data URL
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!formData.f_Name || !formData.f_Email || !formData.f_Mobile ||
        !formData.f_Designation || !formData.f_gender || !formData.f_Course.length ) {
      setError('All fields are required.');
      return;
    }

    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.f_Email)) {
      setError('Invalid email format.');
      return;
    }

    if (!/^\d+$/.test(formData.f_Mobile)) {
      setError('Mobile number should be numeric.');
      return;
    }

    try {
      await createEmployee(formData);
      console.log('Employee created successfully');
      navigate('/employee-list');
    } catch (error) {
      console.error('Error creating employee:', error);
      setError(error.message || 'Failed to create employee.');
    }
  };

  return (
    <div className="create-employee-container">
      <h2>Create Employee</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="f_Name"
            value={formData.f_Name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="f_Email"
            value={formData.f_Email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mobile No</label>
          <input
            type="text"
            name="f_Mobile"
            value={formData.f_Mobile}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Designation</label>
          <select
            name="f_Designation"
            value={formData.f_Designation}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Manager">Manager</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Tester">Tester</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div>
          <label>Gender</label>
          <select
            name="f_gender"
            value={formData.f_gender}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="course-container">
          <label>Course</label>
          <div className="course-options">
            <label>
              <input
                type="checkbox"
                name="f_Course"
                value="Course1"
                checked={formData.f_Course.includes('Course1')}
                onChange={handleChange}
              />
              MCA
            </label>
            <label>
              <input
                type="checkbox"
                name="f_Course"
                value="Course2"
                checked={formData.f_Course.includes('Course2')}
                onChange={handleChange}
              />
              BCA
            </label>
            <label>
              <input
                type="checkbox"
                name="f_Course"
                value="Course3"
                checked={formData.f_Course.includes('Course3')}
                onChange={handleChange}
              />
              BE/B.Tech
            </label>
          </div>
        </div>
        <div>
          <label>Image</label>
          <input
            type="file"
            name="f_Image"
            onChange={handleChange}
            accept="image/jpeg, image/png"
          />
        </div>
        <button type="submit">Create Employee</button>
      </form>
    </div>
  );
};

export default CreateEmployee;
