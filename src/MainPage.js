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
      <div style={{ position: 'relative', textAlign: 'right', marginTop: '50px', marginRight: '240px', marginLeft: '20px' }}>
        <h1 className="ingredients-heading" style={{ marginBottom: '20px', textAlign: 'right' }}> WHATS IN YOUR FRIDGE?</h1>
      </div>
      <form onSubmit={addIngredient} className="ingredient-form">
        <div style={{ position: 'relative', textAlign: 'right', marginTop: '50px', marginRight: '150px', marginLeft: '10px'}}>
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
            style={{ marginRight: '10px' }} 
          />
          <select name="unit"  defaultValue="" onChange={e => setUnit(e.target.value)}>
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
          <button type="submit" style={{ marginLeft: '10px' }}>Add</button>
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
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ marginTop: '20px', marginRight: '160px', textAlign: 'center' }}>
        <div className="transparent-button" style={{ marginBottom: '20px', width: '170px', marginLeft: '415px' }}>
          <div style={{ maxWidth: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <button onClick={goToHomepage} className="transparent-button" style={{ width: '100%', height: '40px', fontSize: '16px', marginBottom: '0px',marginTop: '0px' }}>Go to Homepage</button>
          </div>
        </div>
        <div className="transparent-button" style={{ marginBottom: '20px', width: '170px', marginLeft: '415px' }}>
          <div style={{ maxWidth: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <button onClick={goToGroceryList} className="transparent-button" style={{ width: '100%', height: '40px', fontSize: '16px', marginBottom: '0px',marginTop: '0px' }}>Go to Grocery List</button>
          </div>
        </div>
        <div className="transparent-button" style={{ width: '170px', marginLeft: '415px' }}>
          <div style={{ maxWidth: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <button onClick={goToRecipes} className="transparent-button" style={{ width: '100%', height: '40px', fontSize: '16px', marginBottom: '0px',marginTop: '0px' }}>Go to Recipes</button>
          </div>
        </div>
      </div>
    </div>
  );
}

  export default MainPage;