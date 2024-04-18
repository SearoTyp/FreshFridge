import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Recipes.css';

const Recipes = () => {
  const navigate = useNavigate();
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [nutritionData, setNutritionData] = useState({});
  const [diet, setDiet] = useState('');
  const [mealType, setMealType] = useState('');
  const [healthLabels, setHealthLabels] = useState('');
  const [cuisineType, setCuisineType] = useState('');

  useEffect(() => {
    const storedIngredients = JSON.parse(sessionStorage.getItem('ingredients') || '[]');
    setAllIngredients(storedIngredients);
  }, []);

  const handleIngredientChange = ingredient => {
    setSelectedIngredients(prev => 
      prev.includes(ingredient) ? prev.filter(i => i !== ingredient) : [...prev, ingredient]
    );
  };

  const fetchRecipes = async () => {
    const query = selectedIngredients.map(item => item.name).join(',');
    const url = `https://api.edamam.com/search?q=${query}&app_id=4bac8aa9&app_key=5de18e0d04cd5dd3685c82bb2aff5bad&diet=${diet}&mealType=${mealType}&health=${healthLabels}&cuisineType=${cuisineType}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setRecipes(data.hits || []);
    } catch (error) {
      console.error("Failed to fetch recipes", error);
      setRecipes([]);
    }
  };

  const addMissingItemsToGroceryList = (recipe) => {
    const recipeIngredients = recipe.ingredients.map(ing => ing.food);
    const existingGroceryItems = JSON.parse(sessionStorage.getItem('groceryItems') || '[]');
    const newGroceryItems = recipeIngredients.filter(ing => 
      !allIngredients.some(item => item.name === ing) &&
      !existingGroceryItems.some(item => item.name === ing)
    );

    const updatedGroceryList = [...existingGroceryItems, ...newGroceryItems.map(ing => ({ name: ing }))];
    sessionStorage.setItem('groceryItems', JSON.stringify(updatedGroceryList));
    navigate('/grocery-list');
  };

  const fetchNutritionData = async (ingredients) => {
    const url = `https://api.edamam.com/api/nutrition-details?app_id=b4b0910c&app_key=5b7e28ee49040bc75af20c8b3eea4dfb`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ingr: ingredients.map(ing => ing.text) })
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch nutrition data", error);
      return null;
    }
  };

  const handleNutritionClick = async (recipe) => {
    const nutritionInfo = await fetchNutritionData(recipe.ingredients);
    setNutritionData({ ...nutritionData, [recipe.uri]: nutritionInfo });
  };

  return (
    <div className="recipes-container">
      <h1>Recipes</h1>
      <h2>Choose Ingredients</h2>
      {allIngredients.map((ingredient, index) => (
        <label key={index}>
          <input 
            type="checkbox" 
            checked={selectedIngredients.includes(ingredient)} 
            onChange={() => handleIngredientChange(ingredient)}
          />
          {ingredient.name}
        </label>
      ))}
      <div>
        <select value={diet} onChange={(e) => setDiet(e.target.value)}>
          <option value="">Select Diet</option>
          <option value="balanced">Balanced</option>
          <option value="high-protein">High-Protein</option>
          <option value="low-fat">Low-Fat</option>
          <option value="low-carb">Low-Carb</option>
        </select>
        <select value={mealType} onChange={(e) => setMealType(e.target.value)}>
          <option value="">Select Meal Type</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="snack">Snack</option>
        </select>
        <select value={healthLabels} onChange={(e) => setHealthLabels(e.target.value)}>
          <option value="">Select Health Labels</option>
          <option value="peanut-free">Peanut-Free</option>
          <option value="tree-nut-free">Tree-Nut-Free</option>
          <option value="soy-free">Soy-Free</option>
          <option value="gluten-free">Gluten-Free</option>
        </select>
        <select value={cuisineType} onChange={(e) => setCuisineType(e.target.value)}>
          <option value="">Select Cuisine Type</option>
          <option value="American">American</option>
          <option value="Asian">Asian</option>
          <option value="British">British</option>
          <option value="Caribbean">Caribbean</option>
          <option value="Central Europe">Central Europe</option>
        </select>
      </div>
      <button onClick={fetchRecipes}>Fetch Recipes</button>
      <div className="recipe-grid">
        {recipes.map((recipe, index) => (
          <div key={index} className="recipe-card">
            <h3>{recipe.recipe.label}</h3>
            <img src={recipe.recipe.image} alt={recipe.recipe.label} style={{ maxWidth: '100px', maxHeight: '100px' }} />
            <ul>
              {recipe.recipe.ingredients.map(ing => <li key={ing.foodId}>{ing.text}</li>)}
            </ul>
            <button onClick={() => addMissingItemsToGroceryList(recipe.recipe)}>Add Missing Items to Grocery List</button>
            <button onClick={() => handleNutritionClick(recipe.recipe)}>Get Nutrition Info</button>
            {nutritionData[recipe.recipe.uri] && (
              <div className="nutrition-details">
                <h4>Nutrition Details:</h4>
                <p>Calories: {nutritionData[recipe.recipe.uri].calories}</p>
                {/* Display additional nutrition info as needed */}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;
