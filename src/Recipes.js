import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Recipes.css';  // Make sure the CSS file is linked correctly

const Recipes = () => {
  const navigate = useNavigate();
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [selectedDiets, setSelectedDiets] = useState([]);
  const [recipes, setRecipes] = useState([]);

  const allergies = ["Gluten", "Dairy", "Eggs", "Soy", "Wheat", "Fish", "Shellfish", "Tree Nuts", "Peanuts"];
  const diets = ["Vegetarian", "Vegan", "Paleo", "High-Fiber", "High-Protein", "Low-Carb", "Low-Fat", "Low-Sodium", "Low-Sugar", "Alcohol-Free", "Balanced", "Immunity"];

  const handleAllergyChange = (allergy) => {
    const newAllergies = selectedAllergies.includes(allergy)
      ? selectedAllergies.filter(a => a !== allergy)
      : [...selectedAllergies, allergy];
    setSelectedAllergies(newAllergies);
  };

  const handleDietChange = (diet) => {
    const newDiets = selectedDiets.includes(diet)
      ? selectedDiets.filter(d => d !== diet)
      : [...selectedDiets, diet];
    setSelectedDiets(newDiets);
  };

  const fetchRecipes = async () => {
    // Try to fetch ingredients from sessionStorage or use a default search query
    const ingredients = JSON.parse(sessionStorage.getItem('ingredients') || '[]');
    const groceryItems = JSON.parse(sessionStorage.getItem('groceryItems') || '[]');
    const allIngredients = [...ingredients, ...groceryItems].map(item => item.name).join(',');
    const query = allIngredients || "healthy";  // Use a generic term like 'healthy' if no ingredients are specified

    const allergyParams = selectedAllergies.map(allergy => `&health=${allergy}`).join('');
    const dietParam = selectedDiets.length > 0 ? `&diet=${selectedDiets.join('&diet=')}` : '';

    const url = `https://api.edamam.com/search?q=${query}${allergyParams}${dietParam}&app_id=4bac8aa9&app_key=5de18e0d04cd5dd3685c82bb2aff5bad`;
    try {
      console.log("Fetching recipes...", url);  // Log the complete URL for debugging
      const response = await fetch(url);
      const data = await response.json();
      if (data.hits && Array.isArray(data.hits)) {
        setRecipes(data.hits);  // Update the state with fetched recipes
      } else {
        setRecipes([]);  // Set to an empty array if no valid recipes are found
      }
    } catch (error) {
      console.error("Failed to fetch recipes", error);
      setRecipes([]);  // Error handling: set recipes to an empty array
    }
  };

  return (
    <div className="recipes-container">
      <h1>Recipes</h1>
      <div className="preferences">
        <h2>Allergies</h2>
        {allergies.map((allergy, index) => (
          <label key={index}>
            <input type="checkbox" checked={selectedAllergies.includes(allergy)} onChange={() => handleAllergyChange(allergy)} />
            {allergy}
          </label>
        ))}
        <h2>Food Preferences</h2>
        {diets.map((diet, index) => (
          <label key={index}>
            <input type="checkbox" checked={selectedDiets.includes(diet)} onChange={() => handleDietChange(diet)} />
            {diet}
          </label>
        ))}
        <button onClick={fetchRecipes}>Fetch Recipes</button>
      </div>
      {recipes.length > 0 && (
        <div className="recipes-list">
          {recipes.map((recipe, index) => (
            <div key={index} className="recipe">
              <h3>{recipe.recipe.label}</h3>
              <ul>
                {recipe.recipe.ingredients.map(ing => <li key={ing.foodId}>{ing.text}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}
      <div className="navigation-buttons">
        <button onClick={() => navigate('/')}>Back to Ingredients</button>
        <button onClick={() => navigate('/grocery-list')}>Go to Grocery List</button>
      </div>
    </div>
  );
}

export default Recipes;
