import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList';
import EmployeeEdit from './components/EmployeeEdit';
import CreateEmployee from './components/CreateEmployee';
import './App.css';

const PrivateRoute = ({ element: Component, user }) => {
  return user ? <Component /> : <Navigate to="/" />;
};

const App = () => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <Router>
      <Header user={user} onLogout={handleLogout} />
      <div className="app-container">
        <Routes>
          <Route
            path="/"
            element={<LoginPage setUser={setUser} />}
          />
          <Route
            path="/signup"
            element={<SignupPage />}
          />
          <Route
            path="/dashboard"
            element={<PrivateRoute element={Dashboard} user={user} />}
          />
          <Route
            path="/employee-list"
            element={<PrivateRoute element={EmployeeList} user={user} />}
          />
          <Route
            path="/employee-edit/:id?"
            element={<PrivateRoute element={EmployeeEdit} user={user} />}
          />
          <Route
            path="/create-employee"
            element={<PrivateRoute element={CreateEmployee} user={user} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
