import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './GroceryList.css';
import emailjs from 'emailjs-com';

const GroceryList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const sendEmail = (e) => {
    e.preventDefault();

    // Format the grocery items into a string or HTML to be sent
    const groceryListContent = items.map(item => `${item.quantity} ${item.unit} of ${item.name}`).join(', ');

    const templateParams = {
      groceryList: groceryListContent,
      // Add any other template parameters you need
    };

    emailjs.init({
      publicKey: 'QARg6vkLm5QD7DtQi'
    });

    emailjs.send('service_nkhfjs7', 'template_kln7dxr', templateParams)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('Grocery list sent to your email!');
      }, (error) => {
        console.log('FAILED...', error);
        alert('Failed to send grocery list.');
      });
  };

  // Initially load ingredients list from session storage or location state
  const [ingredientsList, setIngredientsList] = useState(() => {
    const initialIngredients = sessionStorage.getItem('ingredients') ? JSON.parse(sessionStorage.getItem('ingredients')) : [];
    return location.state?.ingredientsList || initialIngredients;
  });

  // State to manage grocery items
  const [items, setItems] = useState(() => {
    const savedItems = sessionStorage.getItem('groceryItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  // Effect to update grocery items in session storage
  useEffect(() => {
    sessionStorage.setItem('groceryItems', JSON.stringify(items));
  }, [items]);

  // Listen to storage changes
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'ingredients') {
        setIngredientsList(JSON.parse(event.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const addGroceryItem = (event) => {
    event.preventDefault();
    const name = event.target.elements.name.value.trim();
    const quantity = parseInt(event.target.elements.quantity.value.trim(), 10);
    const unit = event.target.elements.unit.value || 'N/A';

    if (name && !isNaN(quantity)) {
      const ingredientExistsInGroceryList = items.some(item => item.name.toLowerCase() === name.toLowerCase());
      const ingredientExistsInIngredientsList = ingredientsList.some(ing => ing.name.toLowerCase() === name.toLowerCase());

      if (ingredientExistsInIngredientsList && !window.confirm(`${name} is already in your ingredients list. Do you still want to add it to the grocery list?`)) {
        return;  // Stop the function if user does not confirm
      }

      if (ingredientExistsInGroceryList) {
        const existingIndex = items.findIndex(item => item.name.toLowerCase() === name.toLowerCase());
        if (window.confirm(`${name} is already in the grocery list with quantity ${items[existingIndex].quantity}. Do you want to add more?`)) {
          const updatedItems = [...items];
          updatedItems[existingIndex] = {...updatedItems[existingIndex], quantity: updatedItems[existingIndex].quantity + quantity};
          setItems(updatedItems);
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

  const goToHomepage = () => {
    navigate('/');
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
        <button onClick={goToHomepage} className="navigation-button">Go to Homepage</button>
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
          <button onClick={sendEmail}>Send Grocery List</button>
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
