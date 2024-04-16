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
    <div style={{ position: 'relative', textAlign: 'center', height: '100vh' }}>
      <h1>Welcome to FreshFridge</h1>
      <p>Track your ingredients and get recipe suggestions!</p>

      {/* Container to hold the images in a triangular layout */}
      <div style={{ position: 'relative', width: '100%', height: '500px' }}> {/* Adjust height as needed */}
        {/* Images positioned in a triangle */}
        <img src="/images/FishandChoclate.JPG" alt="Fish and Chocolate" style={{ width: '30%', position: 'absolute', top: '0', left: '35%' }} />
        <img src="/images/Fruits.JPG" alt="Fruits" style={{ width: '30%', position: 'absolute', bottom: '0', left: '5%' }} />
        <img src="/images/SteakFish.JPG" alt="Steak and Fish" style={{ width: '30%', position: 'absolute', bottom: '0', right: '5%' }} />
      </div>

      {/* Ingredient input and add button */}
      <div>
        <input
          type="text"
          placeholder="Add an ingredient"
          value={inputValue}
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