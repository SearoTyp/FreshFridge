import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './MainPage.css';

const MainPage = () => {
  const navigate = useNavigate();

  // Initialize ingredients state from cookies or as an empty array
  const [ingredients, setIngredients] = useState(() => {
    const savedIngredients = Cookies.get('ingredients');
    return savedIngredients ? JSON.parse(savedIngredients) : [];
  });
  
  const [inputValue, setInputValue] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Store ingredients in cookies whenever the ingredients state changes
  useEffect(() => {
    Cookies.set('ingredients', JSON.stringify(ingredients)); // Set as a session cookie

    // Cleanup function to remove cookie when the component unmounts or page closes
    return () => {
      window.addEventListener('unload', () => {
        Cookies.remove('ingredients');
      });
    };
  }, [ingredients]);

  const addIngredient = () => {
    if (inputValue.trim() !== "" && quantity > 0) {
      const newIngredients = [...ingredients, { name: inputValue, quantity }];
      setIngredients(newIngredients);
      setInputValue("");
      setQuantity(1);
    }
  };

  const goToGroceryList = () => {
    navigate('/grocery-list');
  };

  const goToRecipes = () => {
    navigate('/recipes');
  };

  return (
    <div style={{ position: 'relative', textAlign: 'center', height: '100vh' }}>
      <h1>Welcome to FreshFridge</h1>
      <p>Track your ingredients and get recipe suggestions!</p>

      <div style={{ position: 'relative', width: '100%', height: '500px' }}>
        <img src="/images/fridgeopen.JPG" alt="Steak and Fish" style={{ width: '30%', position: 'absolute', contain: '0', center: '5%' }} />
      </div>

      <input type="text" placeholder="Add an ingredient" value={inputValue} onChange={e => setInputValue(e.target.value)} />
      <input type="number" placeholder="Quantity" value={quantity} onChange={e => setQuantity(Number(e.target.value))} min="1" />
      <button onClick={addIngredient}>Add</button>

      <h2>Ingredients List</h2>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient.name} - Quantity: {ingredient.quantity}</li>
        ))}
      </ul>

      <div className="buttons">
        <button onClick={goToGroceryList}>Go to Grocery List</button>
        <button onClick={goToRecipes}>Go to Recipes</button>
      </div>
    </div>
  );
};

export default MainPage;
