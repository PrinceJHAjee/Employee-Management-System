# MERN Stack Employee Management Panel

## Project Overview

This project is an employee management panel built using the MERN stack (MongoDB, Express, React, Node.js). 
It includes functionalities for user authentication, employee creation, updating, listing, and deletion. 
The panel also includes form validation, both client-side (using JavaScript/jQuery) and server-side.

## Features

1. **Login Page**
   - User authentication with username and password.
   - Redirect to Dashboard on successful login.

2. **Signup Page**
   - User registration with username and password.
   - Redirect to Login page upon successful signup.

3. **Dashboard**
   - Welcome message for the admin.
   - Links to Home, Employee List, and Logout.

4. **Create Employee Page**
   - Form to create a new employee with fields: Name, Email, Mobile No, Designation, Gender, Course, and Image Upload.
   - Client-side and server-side validation for all fields.
   - Email duplication check.
   - Image upload restricted to jpg/png files.

5. **Employee List Page**
   - Displays a list of employees with their details.
   - Search functionality to filter employees.
   - Buttons to edit or delete employee records.
   - Button to create a new employee.
   - Sorting functionality to sort employee records by name, email, date, or ID.

6. **Employee Edit Page**
   - Form to edit existing employee details with prefilled values.
   - Client-side and server-side validation for all fields.
   - Email duplication check.
   - Image upload restricted to jpg/png files.

## Project Structure

MERN-PROJECT
├── backend/
│ ├── models/
│ │ ├── employee.js
│ │ └── user.js
│ ├── routes/
│ │ ├── employeeRoutes.js
│ │ ├── userRoutes.js
│ │ ├── auth.js
│ ├── config.js
│ ├── app.js
│ ├── .env
├── frontend/
│ ├── public/
│ │   ├── favicon.ico
│ │   ├── index.htnml
│ │   ├── manifest.json
│ │   └── index.htnml
│ ├── src/
│ │ ├──components/
│ │ │ ├── Header/
│ │ │ │    ├── Header.js
│ │ │ │    └── Header.css
│ │ │ ├── LoginPage.js
│ │ │ ├── LoginPage.css
│ │ │ ├── SignupPage.js
│ │ │ ├── SignupPage.css
│ │ │ ├── dashboard.js
│ │ │ ├── dashboard.css
│ │ │ ├── EmployeeList.js
│ │ │ ├── EmployeeList.css
│ │ │ ├── EmployeeEdit.js
│ │ │ ├── EmployeeEdit.css
│ │ │ ├── CreateEmployee.js
│ │ │ └── CreateEmployee.css
│ │ ├── api.js
│ │ ├── App.js
│ │ └── App.css
│ │ ├── App.test.js
│ │ ├── index.js
│ │ └── index.css
│ │ ├── logo.svg
│ │ ├── reportWebVitals.js
│ │ └── setupTests.js 
│ └── .env 
├── README.md



Install dependencies:

# For backend
cd backend
npm install

# Run the backend server:
cd backend
node app.js

# For frontend
cd frontend
npm install

# Run the frontend server:
cd frontend
npm start

# Set up environment variables:

Create a .env file in the backend directory and add the following:

MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
port=5000

Create a .env file in the frontend directory and add the following:

REACT_APP_API_BASE_URL=<your-api-base-url>
