// MainPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './MainPage.css'; // Assuming the styles are imported

const MainPage = () => {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState([]);
  const [inputValue, setInputValue] = useState("");  // State to hold the current input value for ingredient name
  const [quantity, setQuantity] = useState(1);  // State to hold the quantity of the ingredient

  // Function to add an ingredient to the list
  const addIngredient = () => {
    if (inputValue.trim() !== "" && quantity > 0) { // Check if the input isn't just whitespace and quantity is positive
      setIngredients([...ingredients, { name: inputValue, quantity }]);
      setInputValue(""); // Clear the input field after adding
      setQuantity(1); // Reset quantity to default
    }
  };

  // Function to navigate to the GroceryList page
  const goToGroceryList = () => {
    navigate('/grocery-list'); // Navigate to  the grocery list page
  };

  // Function to navigate to the Recipes page
  const goToRecipes = () => {
    navigate('/recipes'); // Navigate to the recipes page
  };

  return (
    <div style={{ position: 'relative', textAlign: 'center', height: '100vh' }}>
      <h1>Welcome to FreshFridge</h1>
      <p>Track your ingredients and get recipe suggestions!</p>
      
      {/* Images positioned as before */}
      <div style={{ position: 'relative', width: '100%', height: '500px' }}>
        <img src="/images/fridgeopen.JPG" alt="Steak and Fish" style={{ width: '30%', position: 'absolute', contain: '0', center: '5%' }} />
      </div>

      {/* Ingredient input and quantity input */}
      <input
        type="text"
        placeholder="Add an ingredient"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={e => setQuantity(Number(e.target.value))}
        min="1"
      />
      <button onClick={addIngredient}>Add</button>

      {/* Display added ingredients */}
      <h2>Ingredients List</h2>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient.name} - Quantity: {ingredient.quantity}</li>
        ))}
      </ul>

      {/* Buttons for navigation */}
      <div className="buttons">
        <button onClick={goToGroceryList}>Go to Grocery List</button>
        <button onClick={goToRecipes}>Go to Recipes</button>
      </div>
    </div>
  );
};

export default MainPage;
