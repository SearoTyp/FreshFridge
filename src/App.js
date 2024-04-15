/****THIS WILL NOT WORK WITHOUT RUNNING THE FOLLOWING LINE****
npm install react-router-dom axios*/
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import GroceryList from './GroceryList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />            // Route for the main ingredients list page
        <Route path="/grocery-list" element={<GroceryList />} /> // Route for the grocery list page
      </Routes>
    </Router>
  );
}

export default App;