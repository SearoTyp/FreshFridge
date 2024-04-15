import React, { useState } from 'react';
import './MainPage.css'; // Assuming the styles are imported

const MainPage = () => {
  const [ingredients, setIngredients] = useState([]);
  const [inputValue, setInputValue] = useState(""); // State to hold the input value

  const addIngredient = () => {
    if (inputValue.trim() !== "") { // Check if the input isn't just whitespace
      setIngredients([...ingredients, inputValue]);
      setInputValue(""); // Clear the input field after adding
    }
  };

  // Update state on input change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
//hi
  // Handle the Enter key in the input field
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addIngredient();
    }
  };

  return (
    <div>
      <h1>Welcome to FreshFridge</h1>
      <p>Track your ingredients and get recipe suggestions!</p>

      {/* Ingredient input and add button */}
      <input
        type="text"
        placeholder="Add an ingredient"
        value={inputValue} // Controlled component
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button onClick={addIngredient}>Add</button>

      {/* Display added ingredients */}
      <h2>Ingredients List</h2>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
};

export default MainPage;
