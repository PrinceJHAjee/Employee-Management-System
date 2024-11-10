const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';


const handleResponse = async (response) => {
  try {
    if (!response.ok) {
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        const error = await response.json();
        console.error('Server error:', error.message || 'Something went wrong');
        throw new Error(error.message || 'Something went wrong');
      } else {
        // Handle non-JSON error responses
        const errorText = await response.text();
        console.error('Server error:', errorText || 'Something went wrong');
        throw new Error(errorText || 'Something went wrong');
      }
    }

    // Handle non-JSON responses here (e.g., success messages)
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    } else {
      return response.text(); // Return plain text for non-JSON responses
    }
  } catch (error) {
    console.error('Error handling response:', error);
    throw error;
  }
};

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

const getUploadHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`,
  };
};

export const login = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const register = async (user) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const fetchEmployees = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/employees`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Fetch employees error:', error);
    throw error;
  }
};

export const getEmployee = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/employees/${id}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Get employee error:', error);
    throw error;
  }
};

export const updateEmployee = async (id, employee) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/employees/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(employee),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Update employee error:', error);
    throw error;
  }
};

export const createEmployee = async (employee) => {
  try {
    let response;

    // Check if formData has a file
    if (employee.f_Image instanceof File) {
      const formData = new FormData();
      formData.append('f_Name', employee.f_Name);
      formData.append('f_Email', employee.f_Email);
      formData.append('f_Mobile', employee.f_Mobile);
      formData.append('f_Designation', employee.f_Designation);
      formData.append('f_gender', employee.f_gender);
      formData.append('f_Course', JSON.stringify(employee.f_Course)); // Converting array to JSON string
      formData.append('f_Image', employee.f_Image); // Appending the file
      
      response = await fetch(`${API_BASE_URL}/api/employees`, {
        method: 'POST',
        headers: getUploadHeaders(),
        body: formData,
      });
    } else {
      response = await fetch(`${API_BASE_URL}/api/employees`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(employee),
      });
    }

    return handleResponse(response);
  } catch (error) {
    console.error('Create employee error:', error);
    throw error;
  }
};


export const deleteEmployee = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/employees/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(), // Include authentication headers if required
    });

    return handleResponse(response);
  } catch (error) {
    console.error('Delete employee error:', error);
    throw error;
  }
};

