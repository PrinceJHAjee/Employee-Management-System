import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EmployeeEdit.css';
import { getEmployee, updateEmployee } from '../api';

const EmployeeEdit = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    f_Name: '',
    f_Email: '',
    f_Mobile: '',
    f_Designation: '',
    f_gender: '',
    f_Course: '',
    f_Image: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await getEmployee(id);
        setEmployee(data);
      } catch (error) {
        console.error('Error fetching employee:', error);
        setError('Failed to load employee details.');
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEmployee(id, employee);
      console.log('Employee updated successfully');
      setEmployee({
        f_Name: '',
        f_Email: '',
        f_Mobile: '',
        f_Designation: '',
        f_gender: '',
        f_Course: '',
        f_Image: '',
      });
      navigate('/employee-list');
    } catch (error) {
      console.error('Error updating employee:', error);
      setError('Failed to update employee.');
    }
  };

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div className="employee-edit-container">
      <h2>Edit Employee</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="f_Name"
            value={employee.f_Name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="f_Email"
            value={employee.f_Email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mobile No</label>
          <input
            type="text"
            name="f_Mobile"
            value={employee.f_Mobile}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Designation</label>
          <select
            name="f_Designation"
            value={employee.f_Designation}
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
            value={employee.f_gender}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label>Course</label>
          <input
            type="text"
            name="f_Course"
            value={employee.f_Course}
            onChange={handleChange}
            required
          />
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
        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
};

export default EmployeeEdit;
