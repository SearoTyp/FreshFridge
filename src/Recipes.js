import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Recipes.css';  // Ensure CSS is correctly imported for styling

const Recipes = () => {
  const navigate = useNavigate(); // Used for navigating between routes
  const [selectedAllergies, setSelectedAllergies] = useState([]); // Stores user-selected allergy filters
  const [selectedDiets, setSelectedDiets] = useState([]); // Stores user-selected diet preferences
  const [recipes, setRecipes] = useState([]); // Stores recipes fetched from API

  // List of allergies and diets could be extended or modified as needed
  const allergies = ["Gluten", "Dairy", "Eggs", "Soy", "Wheat", "Fish", "Shellfish", "Tree Nuts", "Peanuts"];
  const diets = ["Vegetarian", "Vegan", "Paleo", "High-Fiber", "High-Protein", "Low-Carb", "Low-Fat", "Low-Sodium", "Low-Sugar", "Alcohol-Free", "Balanced", "Immunity"];

  // Handles changes in allergy checkbox selection
  const handleAllergyChange = (allergy) => {
    const newAllergies = selectedAllergies.includes(allergy)
      ? selectedAllergies.filter(a => a !== allergy) // Remove allergy if already selected
      : [...selectedAllergies, allergy]; // Add allergy if not already selected
    setSelectedAllergies(newAllergies);
  };

  // Handles changes in diet checkbox selection
  const handleDietChange = (diet) => {
    const newDiets = selectedDiets.includes(diet)
      ? selectedDiets.filter(d => d !== diet) // Remove diet if already selected
      : [...selectedDiets, diet]; // Add diet if not already selected
    setSelectedDiets(newDiets);
  };

  // Function to fetch recipes based on selected ingredients, allergies, and diets
  const fetchRecipes = async () => {
    const ingredients = JSON.parse(sessionStorage.getItem('ingredients') || '[]');
    const ingredientNames = ingredients.map(item => item.name).join(',');
    const allergyParams = selectedAllergies.map(allergy => `&health=${allergy}`).join('');
    const dietParam = selectedDiets.length > 0 ? `&diet=${selectedDiets.join('&diet=')}` : '';

    const url = `https://api.edamam.com/search?q=${ingredientNames}${allergyParams}${dietParam}&app_id=4bac8aa9&app_key=5de18e0d04cd5dd3685c82bb2aff5bad`;
    try {
        console.log("Fetching recipes..."); // Log to indicate fetching has started
        const response = await fetch(url);
        const data = await response.json();
        console.log(data); // Log the data received from the API
        if (data.hits && Array.isArray(data.hits)) {
            setRecipes(data.hits); // Update recipes if data is correctly formatted
        } else {
            setRecipes([]); // Set recipes to an empty array if data is not as expected
            console.log('No recipes found or bad data structure:', data);
        }
    } catch (error) {
        console.error("Failed to fetch recipes", error);
        setRecipes([]); // Handle errors by setting recipes to an empty array
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
