import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './MainPage.css'; // Assuming the styles are imported

const MainPage = () => {
  const [ingredients, setIngredients] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [quantity, setQuantity] = useState(1); // State to hold the quantity of the ingredient
  const navigate = useNavigate(); // Hook for navigation

  const addIngredient = () => {
    if (inputValue.trim() !== "" && quantity > 0) { // Check if the input isn't just whitespace and quantity is positive
      setIngredients([...ingredients, { name: inputValue, quantity }]);
      setInputValue(""); // Clear the input field after adding
      setQuantity(1); // Reset quantity to default
    }
  };

  // Update state on input change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Update quantity on change
  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value)); // Ensure quantity is treated as a number
  };

  // Handle the Enter key in the input field
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addIngredient();
    }
  };

  // Function to navigate to GroceryList
  const goToGroceryList = () => {
    navigate('/grocery-list'); // Adjust this path based on your routing setup
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>Welcome to FreshFridge</h1>
      <p>Track your ingredients and get recipe suggestions!</p>

      {/* Ingredient input and add button */}
      <div>
        <input
          type="text"
          placeholder="Add an ingredient"
          value={inputValue} // Controlled component
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={handleQuantityChange}
          min="1"
        />
        <button onClick={addIngredient}>Add</button>
      </div>

      {/* Display added ingredients */}
      <h2>Ingredients List</h2>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient.name} - Quantity: {ingredient.quantity}</li>
        ))}
      </ul>

      {/* Button to navigate to GroceryList */}
      <button onClick={goToGroceryList}>Go to Grocery List</button>
    </div>
  );
};

export default MainPage;
