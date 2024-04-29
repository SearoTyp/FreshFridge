import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';

const MainPage = () => {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState(() => {
    const savedIngredients = sessionStorage.getItem('ingredients');
    return savedIngredients ? JSON.parse(savedIngredients) : [];
  }); 
  const [inputValue, setInputValue] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState("N/A");  // Initialized state for the unit

  useEffect(() => {
    sessionStorage.setItem('ingredients', JSON.stringify(ingredients));
  }, [ingredients]);

  const handleKeyPress = ({ nativeEvent }) => {
    if (nativeEvent.key === 'Enter') {
      addIngredient();
    }
  };

  const addIngredient = () => {
    if (inputValue.trim() !== "" && quantity > 0) {
      const existingIndex = ingredients.findIndex(ing => ing.name.toLowerCase() === inputValue.toLowerCase());
      if (existingIndex !== -1) {
        const confirmAdd = window.confirm(`${inputValue} is already in the ingredients list with quantity ${ingredients[existingIndex].quantity}. Do you want to add more to this quantity?`);
        if (confirmAdd) {
          const updatedIngredients = [...ingredients];
          updatedIngredients[existingIndex].quantity += quantity;  // Increase the quantity
          setIngredients(updatedIngredients);
        }
      } else {
        // Add new ingredient with unit
        setIngredients(prevIngredients => [...prevIngredients, { name: inputValue, quantity, unit }]);
      }
      setInputValue("");  // Clear the input field after adding
      setQuantity(1);  // Reset quantity to default
      setUnit("N/A");  // Reset unit to default
    }
  };

  const deleteIngredientItem = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };
const goToGroceryList = () => {
    navigate('/grocery-list', { state: { ingredientsList: ingredients } });
};


  const goToRecipes = () => {
    navigate('/recipes');
  };

  const goToHomepage = () => {
    navigate('/');
  };

  const updateIngredientsUnit = (index, newUnit) => {
    setIngredients(prevIngredients => {
      const updatedIngredients = prevIngredients.map((ingredient, i) => {
        if (i === index) {
          return { ...ingredient, unit: newUnit };
        }
        return ingredient;
      });
      return updatedIngredients;
    });
  };

  return (
    <div className="mainpage-container" style={{ backgroundImage: 'url(/images/steelfridge.JPG)' }}>
      <div style={{ display: 'flex', justifyContent: 'left', marginTop: '30px', marginLeft: '20px' }}>
        <div className="transparent-button" style={{ marginRight: '10px' }}>
          <button onClick={goToHomepage} style={{ width: '170px', height: '40px', fontSize: '16px', marginBottom: '0px', marginTop: '0px' }}>Go to Homepage</button>
        </div>
        <div className="transparent-button" style={{ marginRight: '10px' }}>
          <button onClick={goToGroceryList} style={{ width: '170px', height: '40px', fontSize: '16px', marginBottom: '0px', marginTop: '0px' }}>Go to Grocery List</button>
        </div>
        <div className="transparent-button">
          <button onClick={goToRecipes} style={{ width: '170px', height: '40px', fontSize: '16px', marginBottom: '0px', marginTop: '0px' }}>Go to Recipes</button>
        </div>
      </div>
      <div style={{ position: 'relative', textAlign: 'right', marginTop: '0px', marginRight: '210px', marginLeft: '20px' }}>
        <h1 className="ingredients-heading" style={{ textAlign: 'right' }}> WHAT'S IN YOUR FRIDGE?</h1>
      </div>
      <div className="ingredients-form-container">
      <form onSubmit={addIngredient} className="ingredient-form">
        <div style={{ position: 'relative', textAlign: 'right', marginRight: '270px', marginLeft: '20px'}}>
          <input
            pattern="[A-Za-z\s]+"
            title="Please enter only letters and spaces"
            type="text"
            placeholder="Add an ingredient"
            style={{ width: '260px', marginRight: '10px', height: '19px', borderRadius: '5px'}} 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            required />
          </div>
          <div style={{ position: 'relative', textAlign: 'right', marginRight: '280px', marginLeft: '10px' }}>
          <input
            type="number"
            placeholder="Quantity"
            value={quantity === 0 ? '' : quantity} // Check if quantity is 0, if so, set the value to empty string
            onChange={(e) => setQuantity(e.target.value === '' ? 0 : parseInt(e.target.value, 10))} // Parse the value as integer if not empty
            min="1"
            style={{ marginRight: '10px', height: '35px', borderRadius: '5px'}} // Set the height to match the ingredient table
          />
          <select name="unit" defaultValue="" onChange={(e) => setUnit(e.target.value)}>
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
          </div>
          <div style={{ position: 'relative', textAlign: 'right', marginRight: '279px', marginLeft: '10px' }}>
          <button type="submit" style={{ marginLeft: '10px', width:'282px' }}>Add</button>
          </div>
      </form>
      </div>
      <div>
        <div className="ingredients-container">
          <h2 className="list-section" style={{ position: 'relative', textAlign: 'center', marginTop: '0px' }}> Ingredients List</h2>
          <table className="ingredients-table">
            <thead>
              <tr>
                <th style={{ paddingRight: '20px' }}>Ingredient</th>
                <th style={{ paddingRight: '20px' }}>Quantity</th>
                <th style={{ paddingRight: '20px' }}>Unit</th>
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
                      <select value={ingredient.unit || 'N/A'} onChange={(e) => updateIngredientsUnit(index, e.target.value)}>
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
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center' }}>Your ingredients list is empty</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );  
}

  export default MainPage;