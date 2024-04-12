import React, { useState } from 'react';
import './MainPage.css'; // Ensure the stylesheet is correctly imported

const MainPage = () => {
  const [ingredients, setIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State to hold the error message

  const addIngredient = () => {
    if (ingredientName.trim() !== "" && quantity.trim() !== "") {
      setIngredients([...ingredients, { name: ingredientName, quantity }]);
      setIngredientName(""); // Clear the ingredient name field
      setQuantity(""); // Clear the quantity field
      setErrorMessage(""); // Clear any error message
    }
  };
//hi
  const handleIngredientChange = (event) => {
    setIngredientName(event.target.value);
  };

  const handleQuantityChange = (event) => {
    if (event.target.value === "" || /^[0-9.]*$/.test(event.target.value)) { // Regex to allow only numbers and decimal point
      setQuantity(event.target.value);
      setErrorMessage(""); // Clear error message if input is valid
    } else {
      setErrorMessage("Please enter only numbers"); // Set error message if input is invalid
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (errorMessage === "") {
        addIngredient();
      }
    }
  };
  return (
    <div className="App">
      <h1>Welcome to FreshFridge</h1>
      <p>Track your ingredients and get recipe suggestions!</p>

      <div className="input-group">
        <input
          type="text"
          placeholder="Ingredient name"
          value={ingredientName}
          onChange={handleIngredientChange}
          onKeyPress={handleKeyPress}
        />
        <input
          type="text"
          placeholder="Quantity"
          value={quantity}
          onChange={handleQuantityChange}
          onKeyPress={handleKeyPress}
          className="small-input"
        />
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button onClick={addIngredient}>Add</button>

      <h2>Ingredients List</h2>
      <ul>
        {ingredients.map((item, index) => (
          <li key={index}>{item.name} - {item.quantity}</li>
        ))}
      </ul>
    </div>
  );
};

export default MainPage;
