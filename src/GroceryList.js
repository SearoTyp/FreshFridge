import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './GroceryList.css';

const GroceryList = () => {
  const navigate = useNavigate();

  const [items, setItems] = useState(() => {
    const savedItems = sessionStorage.getItem('groceryItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    sessionStorage.setItem('groceryItems', JSON.stringify(items));
  }, [items]);

  const addGroceryItem = (event) => {
    event.preventDefault();
    const name = event.target.elements.name.value.trim();
    const quantity = event.target.elements.quantity.value.trim();
    var unit = event.target.elements.unit.value;
    if (!unit) {
      unit = 'N/A';
    }
    if (name && quantity) {
      const existingIndex = items.findIndex(item => item.name.toLowerCase() === name.toLowerCase());
      if (existingIndex !== -1) {
        if (window.confirm(`${name} is already in the grocery list with quantity ${items[existingIndex].quantity}. Do you want to add more?`)) {
          items[existingIndex].quantity += quantity;
          setItems([...items]);
        }
      } else {
        setItems([...items, { name, quantity, unit }]);
      }
      event.target.reset();
    }
  };

  const deleteGroceryItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateUnit = (index, unit) => {
    items[index].unit = unit;
    setItems([...items]);
  };

  const goToMainPage = () => {
    navigate('/mainpage');
  };

  const goToRecipes = () => {
    navigate('/recipes');
  };

  return (
    <div className="grocery-list-container" style={{ backgroundImage: 'url(/images/fooditems.JPG)' }}>
      <div className="navigation-container">
        <button onClick={goToMainPage} className="navigation-button">Go to Ingredients List</button>
        <button onClick={goToRecipes} className="navigation-button">Go to Recipes</button>
      </div>
      <div className="form-container">
        <h2>What are we shopping for?</h2>
        <form onSubmit={addGroceryItem} className="grocery-form">
          <input type="text" name="name" pattern="[A-Za-z ]+" title="Please enter only letters and spaces" placeholder="Ingredient Name" required />
          <div className="input-group">
            <input type="text" name="quantity" placeholder="Quantity" required />
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
          </div>
          <button type="submit">Add Ingredient</button>
        </form>
      </div>
      <div className="table-container">
        <h3 style={{ textAlign: 'center' }}>Cart</h3>
        <table className="grocery-table">
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th></th>  {/* For the delete button */}
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <select value={item.unit} onChange={(e) => updateUnit(index, e.target.value)}>
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
                    <button onClick={() => deleteGroceryItem(index)} className="delete-button">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>Your cart is empty</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GroceryList;
