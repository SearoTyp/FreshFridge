import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Homepage.css'; // Assuming the styles are imported

const Homepage = () => {
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

//function to have user press enter key
  const handleKeyPress = ({ nativeEvent }) => {
    if (nativeEvent.key === 'Enter') {
      addIngredient();
    }
  };

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

//function to delete item
const deleteIngredientItem = (index) => {
  setIngredients(ingredients.filter((_, i) => i !== index));
};

  // Function to navigate to the GroceryList page
  const goToGroceryList = () => {
    navigate('/grocery-list'); // Navigate to the grocery list page
  };

  // Function to navigate to the Recipes page
  const goToRecipes = () => {
    navigate('/recipes'); // Navigate to the recipes page
  };
//Function to navigate to mainpage
  const goToMainPage = () => {
    navigate('/MainPage');
  };

  return (
    //opened fridge picture
  <div>
   <div style = {{ position: 'relative', width: '100%', height: 'auto', textAlign: 'center' }}>
      <img src="/images/openfridgeimage.JPG" alt="food in fridge" style={{ width: '100%', height: 'auto', maxHeight: '40vh', objectFit: 'cover' }} />
    </div>

    <div style={{ position: 'relative', textAlign: 'center'}}>
      <h1 className = "heading"> WELCOME TO FRESHFRIDGE</h1>
      <p>Track your ingredients and get recipe suggestions!</p>
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
  <div className="buttons-container" style={{ display: 'flex', justifyContent: 'space-between', width: '80%', maxWidth: '1200px' }}>
    <div style={{ flex: 1, textAlign: 'center' }}>
      <a href="/MainPage" onClick={goToMainPage}>
        <img src="/images/ingredients.JPG" alt="ingredients" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
      </a>
      <button onClick={goToMainPage} className="image-button" style={{ width: '100%', height: '40px', fontSize: '16px', marginTop: '10px' }}>Go to Ingredients</button>
    </div>
    <div style={{ flex: 1, textAlign: 'center', margin: '0 20px' }}>
      <a href="/grocery-list" onClick={goToGroceryList}>
        <img src="/images/groceries.JPG" alt="groceries" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
      </a>
      <button onClick={goToGroceryList} className="image-button" style={{ width: '100%', height: '40px', fontSize: '16px', marginTop: '10px' }}>Go to Grocery List</button>
    </div>
    <div style={{ flex: 1, textAlign: 'center' }}>
      <a href="/recipes" onClick={goToRecipes}>
        <img src="/images/cookbook.JPG" alt="cookbook" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
      </a>
      <button onClick={goToRecipes} className="image-button" style={{ width: '100%', height: '40px', fontSize: '16px', marginTop: '10px' }}>Go to Recipes</button>
    </div>
  </div>
</div>
</div>
  );
};

export default Homepage;