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
    const quantity = event.target.elements.quantity.valueAsNumber;
    const unit = event.target.elements.unit.value;
    if (name && quantity > 0) {
      const existingIndex = items.findIndex(item => item.name.toLowerCase() === name.toLowerCase());
      if (existingIndex !== -1) {
        if (window.confirm(`${name} is already in the grocery list with quantity ${items[existingIndex].quantity}. Do you want to add more?`)) {
          const updatedItems = [...items];
          updatedItems[existingIndex].quantity += quantity;
          setItems(updatedItems);
        }
      } else {
        setItems(prevItems => [...prevItems, { name, quantity, unit }]);
      }
      event.target.reset();
    }
  };

  const deleteGroceryItem = (index) => {
    setItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  const updateQuantity = (index, quantity) => {
    const updatedItems = [...items];
    updatedItems[index].quantity = quantity;
    setItems(updatedItems);
  };

  const updateUnit = (index, unit) => {
    const updatedItems = [...items];
    updatedItems[index].unit = unit;
    setItems(updatedItems);
  };

  const goToMainPage = () => {
    navigate('/');
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
          <input type="text" name="name" pattern="[A-Za-z]+" title="Please enter only letters" placeholder="Ingredient Name" required />
          <div className="input-group">
            <input type="number" name="quantity" placeholder="Quantity" required min="1" />
            <select name="unit">
              <option value="gallon">Gallon(s)</option>
              <option value="cup">Cup(s)</option>
              <option value="ounce">Ounce(s)</option>
              <option value="tablespoon">Tablespoon(s)</option>
              <option value="teaspoon">Teaspoon(s)</option>
              <option value="liter">Liter(s)</option>
              <option value="milliliter">Milliliter(s)</option>
              <option value="None">None</option>
            </select>
          </div>
          <button type="submit">Add Ingredient</button>
        </form>
      </div>
      {items.length > 0 && (
        <div className="table-container">
          <h3>Cart</h3>
          <table className="grocery-table">
            <thead>
              <tr>
                <th>Ingredient</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>
                    <input type="number" value={item.quantity} onChange={(e) => updateQuantity(index, Number(e.target.value))} min="0" />
                  </td>
                  <td>
                    <select value={item.unit} onChange={(e) => updateUnit(index, e.target.value)}>
                      <option value="gallon">Gallon(s)</option>
                      <option value="cup">Cup(s)</option>
                      <option value="ounce">Ounce(s)</option>
                      <option value="tablespoon">Tablespoon(s)</option>
                      <option value="teaspoon">Teaspoon(s)</option>
                      <option value="liter">Liter(s)</option>
                      <option value="milliliter">Milliliter(s)</option>
                      <option value="None">None</option>
                    </select>
                  </td>
                  <td><button onClick={() => deleteGroceryItem(index)} className="delete-button">Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GroceryList;
