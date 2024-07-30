import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { serverEndpoint } from '../constants/server';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [adminDetails, setAdminDetails] = useState({});

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Fetch the token from cookies
        const token = Cookies.get('token');
        
        // Make the request including the token in headers
        const response = await axios.get(`${serverEndpoint}/api/admin/details`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true,
        });

        setIsAuthenticated(response.data ? true : false);
        setAdminDetails(response.data);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return [isAuthenticated, adminDetails];
};

export default useAuth;
