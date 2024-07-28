import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './EmployeeList.css';
import { fetchEmployees, deleteEmployee } from '../api';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'f_Name', direction: 'ascending' });

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const data = await fetchEmployees();
        console.log('Fetched employees:', data);
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
        setError('Failed to load employees');
      }
    };

    loadEmployees();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this employee?');
    if (confirmed) {
      try {
        await deleteEmployee(id);
        console.log('Employee deleted successfully');
        // Reload the employee list
        setEmployees([]);
        const data = await fetchEmployees();
        setEmployees(data);
      } catch (error) {
        console.error('Error deleting employee:', error);
        setError('Failed to delete employee');
      }
    }
  };

  const sortedEmployees = employees.sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const filteredEmployees = sortedEmployees.filter(emp =>
    emp.f_Name.toLowerCase().includes(searchTerm)
  );

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="employee-list-container">
      <div className="employee-list-header">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="header-right">
          <span>{filteredEmployees.length} Employees</span>
          <Link to="/create-employee" className="create-button">Create Employee</Link>
        </div>
      </div>
      {error && <div className="error">{error}</div>}
      {filteredEmployees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('_id')}>Unique Id</th>
              <th>Image</th>
              <th onClick={() => handleSort('f_Name')}>Name</th>
              <th onClick={() => handleSort('f_Email')}>Email</th>
              <th onClick={() => handleSort('f_Mobile')}>Mobile No</th>
              <th onClick={() => handleSort('f_Designation')}>Designation</th>
              <th onClick={() => handleSort('f_gender')}>Gender</th>
              <th onClick={() => handleSort('f_Course')}>Course</th>
              <th onClick={() => handleSort('f_Createdate')}>Create Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp._id}</td>
                <td><img src={emp.f_Image} alt={emp.f_Name} /></td>
                <td>{emp.f_Name}</td>
                <td>{emp.f_Email}</td>
                <td>{emp.f_Mobile}</td>
                <td>{emp.f_Designation}</td>
                <td>{emp.f_gender}</td>
                <td>{emp.f_Course.join(', ')}</td>
                <td>{new Date(emp.f_Createdate).toLocaleDateString()}</td>
                <td>
                  <Link to={`/employee-edit/${emp._id}`}>Edit</Link> - 
                  <button onClick={() => handleDelete(emp._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeList;
