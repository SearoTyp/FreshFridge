import React, { useState } from 'react';
import './MainPage.css'; // Adjust the path if your CSS file is in a subdirectory

const MainPage = () => {
  const [ingredients, setIngredients] = useState([]);

  const addIngredient = (ingredient) => {
    setIngredients([...ingredients, ingredient]);
  };

  return (
    <div>
      <h1>Welcome to FreshFridge</h1>
      <p>Track your ingredients and get recipe suggestions!</p>

      {/* Ingredient input and add button */}
      <input type="text" placeholder="Add an ingredient" id="ingredientInput" />
      <button onClick={() => addIngredient(document.getElementById('ingredientInput').value)}>Add</button>

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
