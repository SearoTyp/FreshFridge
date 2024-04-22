import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Recipes.css';
import axios from 'axios';

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

  // Attempt at cooking instructions
const [cookingInstructions, setCookingInstructions] = useState('');
const fetchCookingInstructions = async (recipe) => {
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/${recipe.recipe.id}/analyzedInstructions?apiKey=bca5e39e0b19471c8dcbdc384013ee3b`);
    const instructions = response.data[0]?.steps.map(step => step.step).join('\n');
    setCookingInstructions(instructions);
  } catch (error) {
    console.error('Failed to fetch cooking instructions', error);
    setCookingInstructions('');
  }
};

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
  const recipeIngredients = recipe.ingredients.map(ing => ({
    name: ing.food,
    quantity: ing.quantity ? ing.quantity : 'N/A',  // Set to 'N/A' if no quantity is provided
    unit: ing.measure ? ing.measure : 'N/A'  // Set to 'N/A' if no unit is provided
  }));
  const existingGroceryItems = JSON.parse(sessionStorage.getItem('groceryItems') || '[]');
  const newGroceryItems = recipeIngredients.filter(ing => 
    !allIngredients.some(item => item.name === ing.name) &&
    !existingGroceryItems.some(item => item.name === ing.name)
  );

  const updatedGroceryList = [...existingGroceryItems, ...newGroceryItems];
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


  // Edited for cooking instructions
  const handleNutritionClick = async (recipe) => {
    if (nutritionData[recipe.uri]) {
      const newNutritionData = { ...nutritionData };
      delete newNutritionData[recipe.uri]; // This removes the entry, hiding the info
      setNutritionData(newNutritionData);
      setCookingInstructions(''); // Clear the cooking instructions
    } else {
      const nutritionInfo = await fetchNutritionData(recipe.ingredients);
      setNutritionData({ ...nutritionData, [recipe.uri]: nutritionInfo });
      fetchCookingInstructions(recipe); // Fetch the cooking instructions
    }
  };

  return (
    <div className="recipes-container" style={{ backgroundImage: 'url(/images/recipebackground.jpeg)' }}> 
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
          <option value="alcohol-cocktail">Alcohol-Cocktail</option>
          <option value="alcohol-free">Alcohol-Free</option>
          <option value="celery-free">Celery-Free</option>
          <option value="crustacean-free">Crustacean-Free</option>
          <option value="dairy-free">Dairy-Free</option>
          <option value="DASH">DASH</option>
          <option value="egg-free">Egg-Free</option>
          <option value="fish-free">Fish-Free</option>
          <option value="fodmap-free">FODMAP-Free</option>
          <option value="gluten-free">Gluten-Free</option>
          <option value="immuno-supportive">Immuno-Supportive</option>
          <option value="keto-friendly">Keto-Friendly</option>
          <option value="kidney-friendly">Kidney-Friendly</option>
          <option value="kosher">Kosher</option>
          <option value="low-fat-abs">Low-Fat-Abs</option>
          <option value="low-potassium">Low-Potassium</option>
          <option value="low-sugar">Low-Sugar</option>
          <option value="lupine-free">Lupine-Free</option>
          <option value="Mediterranean">Mediterranean</option>
          <option value="mollusk-free">Mollusk-Free</option>
          <option value="mustard-free">Mustard-Free</option>
          <option value="no-oil-added">No-Oil-Added</option>
          <option value="paleo">Paleo</option>
          <option value="peanut-free">Peanut-Free</option>
          <option value="pescatarian">Pescatarian</option>
          <option value="pork-free">Pork-Free</option>
          <option value="red-meat-free">Red-Meat-Free</option>
          <option value="sesame-free">Sesame-Free</option>
          <option value="shellfish-free">Shellfish-Free</option>
          <option value="soy-free">Soy-Free</option>
          <option value="sugar-conscious">Sugar-Conscious</option>
          <option value="sulfite-free">Sulfite-Free</option>
          <option value="tree-nut-free">Tree-Nut-Free</option>
          <option value="vegan">Vegan</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="wheat-free">Wheat-Free</option>
        </select>
        <select value={cuisineType} onChange={(e) => setCuisineType(e.target.value)}>
          <option value="">Select Cuisine Type</option>
          <option value="American">American</option>
          <option value="Asian">Asian</option>
          <option value="British">British</option>
          <option value="Caribbean">Caribbean</option>
          <option value="Central Europe">Central Europe</option>
          <option value="Chinese">Chinese</option>
          <option value="Eastern Europe">Eastern Europe</option>
          <option value="French">French</option>
          <option value="Indian">Indian</option>
          <option value="Italian">Italian</option>
          <option value="Japanese">Japanese</option>
          <option value="Kosher">Kosher</option>
          <option value="Mediterranean">Mediterranean</option>
          <option value="Mexican">Mexican</option>
          <option value="Middle Eastern">Middle Eastern</option>
          <option value="Nordic">Nordic</option>
          <option value="South American">South American</option>
          <option value="South East Asian">South East Asian</option>
        </select>
      </div>
      <button onClick={fetchRecipes}>Fetch Recipes</button>
      <button onClick={() => navigate('/')}>Go to Ingredients List</button>
      <button onClick={() => navigate('/grocery-list')}>Go to Grocery List</button>
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
                <p>Carbs: {nutritionData[recipe.recipe.uri]?.totalNutrients.CHOCDF.quantity.toFixed(2)} g</p>
                <p>Protein: {nutritionData[recipe.recipe.uri]?.totalNutrients.PROCNT.quantity.toFixed(2)} g</p>
                <p>Fats: {nutritionData[recipe.recipe.uri]?.totalNutrients.FAT.quantity.toFixed(2)} g</p>
                <p>Cholesterol: {nutritionData[recipe.recipe.uri]?.totalNutrients.CHOLE?.quantity.toFixed(2)} mg</p>
                <p>Sodium: {nutritionData[recipe.recipe.uri]?.totalNutrients.NA?.quantity.toFixed(2)} mg</p>
                <p>Calcium: {nutritionData[recipe.recipe.uri]?.totalNutrients.CA?.quantity.toFixed(2)} mg</p>
                <p>Fiber: {nutritionData[recipe.recipe.uri]?.totalNutrients.FIBTG?.quantity.toFixed(2)} g</p>
                <p>Monounsaturated Fat: {nutritionData[recipe.recipe.uri]?.totalNutrients.FAMS?.quantity.toFixed(2)} g</p>
                <p>Polyunsaturated Fat: {nutritionData[recipe.recipe.uri]?.totalNutrients.FAPU?.quantity.toFixed(2)} g</p>
                <p>Saturated Fat: {nutritionData[recipe.recipe.uri]?.totalNutrients.FASAT?.quantity.toFixed(2)} g</p>
                <p>Trans Fat: {nutritionData[recipe.recipe.uri]?.totalNutrients.FATRN?.quantity.toFixed(2)} g</p>
                <p>Folate: {nutritionData[recipe.recipe.uri]?.totalNutrients.FOLDFE?.quantity.toFixed(2)} µg</p>
                <p>Iron: {nutritionData[recipe.recipe.uri]?.totalNutrients.FE?.quantity.toFixed(2)} mg</p>
                <p>Magnesium: {nutritionData[recipe.recipe.uri]?.totalNutrients.MG?.quantity.toFixed(2)} mg</p>
                <p>Niacin: {nutritionData[recipe.recipe.uri]?.totalNutrients.NIA?.quantity.toFixed(2)} mg</p>
                <p>Phosphorus: {nutritionData[recipe.recipe.uri]?.totalNutrients.P?.quantity.toFixed(2)} mg</p>
                <p>Potassium: {nutritionData[recipe.recipe.uri]?.totalNutrients.K?.quantity.toFixed(2)} mg</p>
                <p>Riboflavin: {nutritionData[recipe.recipe.uri]?.totalNutrients.RIBF?.quantity.toFixed(2)} mg</p>
                <p>Total Sugars: {nutritionData[recipe.recipe.uri]?.totalNutrients.SUGAR?.quantity.toFixed(2)} g</p>
                <p>Thiamin: {nutritionData[recipe.recipe.uri]?.totalNutrients.THIA?.quantity.toFixed(2)} mg</p>
                <p>Vitamin A: {nutritionData[recipe.recipe.uri]?.totalNutrients.VITA_RAE?.quantity.toFixed(2)} µg</p>
                <p>Vitamin B12: {nutritionData[recipe.recipe.uri]?.totalNutrients.VITB12?.quantity.toFixed(2)} µg</p>
                <p>Vitamin B6: {nutritionData[recipe.recipe.uri]?.totalNutrients.VITB6A?.quantity.toFixed(2)} mg</p>
                <p>Vitamin C: {nutritionData[recipe.recipe.uri]?.totalNutrients.VITC?.quantity.toFixed(2)} mg</p>
                <p>Vitamin D: {nutritionData[recipe.recipe.uri]?.totalNutrients.VITD?.quantity.toFixed(2)} µg</p>
                <p>Vitamin E: {nutritionData[recipe.recipe.uri]?.totalNutrients.TOCPHA?.quantity.toFixed(2)} mg</p>
                <p>Vitamin K: {nutritionData[recipe.recipe.uri]?.totalNutrients.VITK1?.quantity.toFixed(2)} µg</p>
                <p>Zinc: {nutritionData[recipe.recipe.uri]?.totalNutrients.ZN?.quantity.toFixed(2)} mg</p>
                <p>Water: {nutritionData[recipe.recipe.uri]?.totalNutrients.WATER?.quantity.toFixed(2)} g</p>
                {/* Additional nutrients can be added here */}
              </div>
            )}
            {cookingInstructions && (
        <div>
          <h4>Cooking Instructions:</h4>
          <p>{cookingInstructions}</p>
        </div>
      )}
    </div>
  ))}
</div>
</div>
  );
};

export default Recipes;