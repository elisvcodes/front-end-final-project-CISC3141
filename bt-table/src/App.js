import './App.css';
import Navbar from './components/Navbar/Navbar';

import Homepage from './homepage';
import Signin from './signin.js';
import Signup from './signup.js';
import Dashboard from './components/Dashbaord';

import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { isLoggedIn } from './_actions/auth';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isLoggedIn());
  }, []);
  return (
    <div className='App'>
      <Navbar />

      <Routes>
        <Route path='/' exact element={<Homepage />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
