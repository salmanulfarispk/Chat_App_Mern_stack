import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {setUser} from "./redux/UserSlice"
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import './App.css';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/user-details`, {
          withCredentials: true
        });

        if (response.data.success) {
          dispatch(setUser(response.data.data));
        } else {
          navigate('/emailpage');
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message, {
          position: 'top-right',
          style: {
            background: 'red',
            color: 'white',
          },
        });
        navigate('/emailpage');
      }
    };

    checkAuth();
  }, [navigate, dispatch]);

  return (
    <>
      <Toaster />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
