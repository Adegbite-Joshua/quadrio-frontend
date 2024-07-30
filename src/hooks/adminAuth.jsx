import { useEffect, useState } from 'react';
import axios from 'axios';
import { serverEndpoint } from '../constants/server';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [adminDetails, setadminDetails] = useState({});

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${serverEndpoint}/api/admin/details`, {
          withCredentials: true,
        });
        setIsAuthenticated(response.data ? true : false);
        setadminDetails(response.data)
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return [isAuthenticated, adminDetails];
};

export default useAuth;
