import React from 'react';
import LoginPage from './LoginPage';
import CreateAccount from './CreateAccount';
import ViewUsers from './ViewUsers';
import { Route, Routes } from 'react-router-dom';

import backgroundImage from '../assets/Backgroud-image.jpg';
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/Create' element={<CreateAccount />} />
        <Route path='/ViewUsers' element={<ViewUsers/>} />
      </Routes>
    </div>
  );
};

export default App;