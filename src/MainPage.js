import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './MainPage.css'; // Assuming the styles are imported

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

  // Function to navigate to the homepage
  const goToHomepage = () => {
    navigate('/'); // Navigate to the homepage
};

//Function for updating unit user inputs in ingredients list 
const updateIngredientsUnit = (index, unit) => {
  setIngredients(prevIngredients => {
    // Create a new array with the updated unit for the specified ingredient
    const updatedIngredients = prevIngredients.map((ingredient, i) => {
      if (i === index) {
        return { ...ingredient, unit: unit };
      }
      return ingredient;
    });
    return updatedIngredients;
  });
};

  return (
    //opened fridge picture
    <div className="mainpage-container" style={{ backgroundImage: 'url(/images/steelfridge.JPG)' }}>
    <div style={{ position: 'relative', textAlign: 'right', marginTop: '50px', marginRight: '240px', marginLeft: '20px' }}>
      <h1 className="ingredients-heading" style={{ marginBottom: '20px', textAlign: 'right' }}> WHATS IN YOUR FRIDGE?</h1>
    </div>
    <form onSubmit={addIngredient} className="ingredient-form">
      <div style={{ position: 'relative', textAlign: 'right', marginTop: '50px', marginRight: '240px', marginLeft: '20px' }}>
        <input
          type="text"
          placeholder="Add an ingredient"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={e => setQuantity(Number(e.target.value))}
          min="1"
        />
        <select name="unit" defaultValue="">
          <option value="" disabled>Unit</option>
          <option value="N/A">N/A</option>
          <option value="cup">Cup(s)</option>
          <option value="ounce">Ounce(s)</option>
          <option value="tablespoon">Tablespoon(s)</option>
          <option value="teaspoon">Teaspoon(s)</option>
          <option value="gram">Gram(s)</option>
          <option value="quart">Quart(s)</option>
          <option value="pint">Pint(s)</option>
          <option value="liter">Liter(s)</option>
          <option value="milliliter">Milliliter(s)</option>
          <option value="gallon">Gallon(s)</option>
        </select>
        <button type="submit">Add</button>
      </div>
    </form>
    <div>
      <div style={{ position: 'relative', textAlign: 'right', marginTop: '50px', marginRight: '340px', marginLeft: '20px' }}>
        <h2 className="list-section"> Ingredients List</h2>
      </div>
      <div className="ingredients-container">
        <table className="ingredients-table">
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th></th> {/* For the delete button */}
            </tr>
          </thead>
          <tbody>
            {ingredients.length > 0 ? (
              ingredients.map((ingredient, index) => (
                <tr key={index}>
                  <td>{ingredient.name}</td>
                  <td>{ingredient.quantity}</td>
                  <td>
                    <select value={ingredient.unit} onChange={(e) => updateIngredientsUnit(index, e.target.value)}>
                      <option value="N/A">N/A</option>
                      <option value="cup">Cup(s)</option>
                      <option value="ounce">Ounce(s)</option>
                      <option value="tablespoon">Tablespoon(s)</option>
                      <option value="teaspoon">Teaspoon(s)</option>
                      <option value="gram">Gram(s)</option>
                      <option value="quart">Quart(s)</option>
                      <option value="pint">Pint(s)</option>
                      <option value="liter">Liter(s)</option>
                      <option value="milliliter">Milliliter(s)</option>
                      <option value="gallon">Gallon(s)</option>
                    </select>
                  </td>
                  <td>
                    <button onClick={() => deleteIngredientItem(index)} className="delete-button">Delete</button>
                  </td>
                </tr>
              ))
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
    <div style={{ marginTop: '20px', marginRight: '160px', textAlign: 'center' }}>
      <div className="transparent-button" style={{ marginBottom: '20px', width: '170px', marginLeft: '415px' }}>
        <div style={{ maxWidth: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button onClick={goToHomepage} className="transparent-button" style={{ width: '100%', height: '40px', fontSize: '16px', marginBottom: '10px' }}>Go to Homepage</button>
        </div>
      </div>
      <div className="transparent-button" style={{ marginBottom: '20px', width: '170px', marginLeft: '415px' }}>
        <div style={{ maxWidth: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button onClick={goToGroceryList} className="transparent-button" style={{ width: '100%', height: '40px', fontSize: '16px', marginBottom: '10px' }}>Go to Grocery List</button>
        </div>
      </div>
      <div className="transparent-button" style={{ width: '170px', marginLeft: '415px' }}>
        <div style={{ maxWidth: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button onClick={goToRecipes} className="transparent-button" style={{ width: '100%', height: '40px', fontSize: '16px', marginBottom: '10px' }}>Go to Recipes</button>
        </div>
      </div>
    </div>
  </div>
);
};

export default MainPage;