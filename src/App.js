/****THIS WILL NOT WORK WITHOUT RUNNING THE FOLLOWING LINES****
npm install react-router-dom axios
npm install js-cookie*/
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import GroceryList from './GroceryList';
import Recipes from './Recipes';
import Homepage from './Homepage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/grocery-list" element={<GroceryList />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/homepage" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
