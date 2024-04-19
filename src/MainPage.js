import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './MainPage.css'; // Assuming the styles are imported
// hi
const MainPage = () => {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState(() => {
    // Initialize ingredients from sessionStorage if available
    const savedIngredients = sessionStorage.getItem('ingredients');
    return savedIngredients ? JSON.parse(savedIngredients) : [];
  });
  const [inputValue, setInputValue] = useState("");  // State to hold the current input value for ingredient name
  const [quantity, setQuantity] = useState(1);  // State to hold the quantity of the ingredient

  useEffect(() => {
    // Update sessionStorage when ingredients change
    sessionStorage.setItem('ingredients', JSON.stringify(ingredients));
  }, [ingredients]);

  // Function to add an ingredient to the list
  const addIngredient = () => {
    if (inputValue.trim() !== "" && quantity > 0) {
      const existingIndex = ingredients.findIndex(ing => ing.name.toLowerCase() === inputValue.toLowerCase());
      if (existingIndex !== -1) {
        // Ingredient already exists, confirm if user wants to add more
        const confirmAdd = window.confirm(`${inputValue} is already in the ingredients list with quantity ${ingredients[existingIndex].quantity}. Do you want to add more to this quantity?`);
        if (confirmAdd) {
          const updatedIngredients = [...ingredients];
          updatedIngredients[existingIndex].quantity += quantity;  // Increase the quantity
          setIngredients(updatedIngredients);
        }
      } else {
        // Add new ingredient
        setIngredients(prevIngredients => [...prevIngredients, { name: inputValue, quantity }]);
      }
      setInputValue(""); // Clear the input field after adding
      setQuantity(1); // Reset quantity to default
    }
  };

  // Function to navigate to the GroceryList page
  const goToGroceryList = () => {
    navigate('/grocery-list'); // Navigate to the grocery list page
  };

  // Function to navigate to the Recipes page
  const goToRecipes = () => {
    navigate('/recipes'); // Navigate to the recipes page
  };

  return (
    //opened fridge picture
  <div>
   <div style = {{ position: 'relative', width: '100%', height: 'auto', textAlign: 'center' }}>
      <img src="/images/openfridgeimage.JPG" alt="food in fridge" style={{ width: '100%', height: 'auto', maxHeight: '40vh', objectFit: 'cover' }} />
    </div>

    <div style={{ position: 'relative', textAlign: 'center'}}>
      <h1>WELCOME TO FRESHFRIDGE</h1>
      <p>Track your ingredients and get recipe suggestions!</p>
    </div>

    <div style={{ textAlign: 'center' }}>
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
    </div>
    <div>
      <h2 style={{ textAlign: 'center' }}>Ingredients List</h2>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient.name} - Quantity: {ingredient.quantity}</li>
        ))}
      </ul>
    </div>

    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
  <div className="buttons-container" style={{ marginRight: '20px', textAlign: 'center' }}>
    <div style={{ maxWidth: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <a href="/grocery-list">
        <img src="/images/groceries.JPG" alt="groceries" style={{ maxWidth: '100%', height: 'auto', maxHeight: '300px' }} />
      </a>
      <button onClick={goToGroceryList} className="image-button" style={{ width: '100%', height: '40px', fontSize: '16px', marginTop: '10px' }}>Go to Grocery List</button>
    </div>
  </div>
  <div className="buttons-container" style={{ textAlign: 'center' }}>
    <div style={{ maxWidth: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <a href="/recipes">
        <img src="/images/cookbook.JPG" alt="cookbook" style={{ maxWidth: '100%', height: 'auto', maxHeight: '300px' }} />
      </a>
      <button onClick={goToRecipes} className="image-button" style={{ width: '100%', height: '40px', fontSize: '16px', marginTop: '10px' }}>Go to Recipes</button>
    </div>
  </div>
</div>
</div>
  );
};

export default MainPage;