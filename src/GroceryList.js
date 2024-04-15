import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GroceryList = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  const addGroceryItem = (event) => {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const quantity = event.target.elements.quantity.value;
    if (name && quantity) {
      setItems([...items, { name, quantity }]);
      event.target.reset(); // Reset form input after submission
    }
  };

  const goToMainPage = () => {
    navigate('/'); // Navigates back to the main page
  };

  const goToRecipes = () => {
    navigate('/recipes'); // Navigates to the recipes list
  };

  return (
    <div style={{ backgroundColor: '#b8f28b', minHeight: '100vh', padding: '20px' }}>
      <h2>What do you need for your fridge?</h2>
      <form onSubmit={addGroceryItem}>
        <input type="text" name="name" placeholder="Ingredient Name" required />
        <input type="number" name="quantity" placeholder="Quantity" required min="1" />
        <button type="submit">Add Ingredient</button>
      </form>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item.name} - Quantity: {item.quantity}</li>
        ))}
      </ul>
      <button onClick={goToMainPage}>Go to Ingredients List</button>
      <button onClick={goToRecipes}>Go to Recipes</button>
    </div>
  );
};

export default GroceryList;