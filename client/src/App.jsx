import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth';
import 'react-toastify/ReactToastify.css';
import { useDispatch } from 'react-redux';
import axios from './utils/axios';
import { login } from './features/userSlice';
import Loader from './components/Loader';

const Home = lazy(() => import('./pages/Home'));

const App = () => {

  const dispatch = useDispatch();

  const fetchDetails = async () => {
    try {
      let { data } = await axios.get('/user/details');
      console.log(data);

      if (data.success) {
        dispatch(login(data.user));
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  React.useEffect(() => {
    let token = localStorage.getItem('token');
    if (token) {
      fetchDetails();
    }
  }, []);

  return (
    <React.Fragment>
      <Routes>
        <Route path='/auth' element={<Auth />} />
        <Route path='/' element={<Suspense fallback={<Loader />}><Home /></Suspense>} />
      </Routes>
    </React.Fragment>
  )
}

export default App