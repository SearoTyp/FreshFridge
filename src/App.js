/****THIS WILL NOT WORK WITHOUT RUNNING THE FOLLOWING LINE****
npm install react-router-dom axios*/
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import GroceryList from './GroceryList';
import Recipes from './Recipes';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/grocery-list" element={<GroceryList />} />
        <Route path="/recipes" element={<Recipes />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
