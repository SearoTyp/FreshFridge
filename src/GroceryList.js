import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GroceryList = () => {
  const navigate = useNavigate();

  // Initialize state from session storage or as an empty array
  const [items, setItems] = useState(() => {
    const savedItems = sessionStorage.getItem('groceryItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  // Update session storage when items change
  useEffect(() => {
    sessionStorage.setItem('groceryItems', JSON.stringify(items));
  }, [items]);

  const addGroceryItem = (event) => {
    event.preventDefault();
    const name = event.target.elements.name.value.trim();
    const quantity = event.target.elements.quantity.valueAsNumber;
    if (name && quantity > 0) {
      // Check if the ingredient already exists in the ingredients list
      const ingredients = JSON.parse(sessionStorage.getItem('ingredients') || '[]');
      const itemExists = ingredients.some(ingredient => ingredient.name.toLowerCase() === name.toLowerCase());

      if (itemExists) {
        // Ask user to confirm if they still want to add the item
        const confirmAdd = window.confirm(`${name} is already in the ingredients list. Are you sure you want to add it to the grocery list?`);
        if (!confirmAdd) {
          return; // If user cancels, do not add the item
        }
      }

      setItems(prevItems => [...prevItems, { name, quantity }]);
      event.target.reset();  // Reset form input after submission
    }
  };

  const deleteGroceryItem = (index) => {
    setItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  const goToMainPage = () => {
    navigate('/');
  };

  const goToRecipes = () => {
    navigate('/recipes');
  };

  return (
    <div style={{
      backgroundImage: 'url(/images/FridgeImage2.JPG)',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: 'white',
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '20px',
        borderRadius: '10px',
        width: '80%',
        maxWidth: '500px',
        textAlign: 'center',
      }}>
        <h2>What are we shopping for?</h2>
        <form onSubmit={addGroceryItem} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input type="text" name="name" pattern="[A-Za-z]+" title="Please enter only letters" placeholder="Ingredient Name" required />
          <input type="number" name="quantity" placeholder="Quantity" required min="1" />
          <button type="submit">Add Ingredient</button>
        </form>
        {items.length > 0 && (
          <table style={{ width: '100%', marginTop: '20px' }}>
            <thead>
              <tr>
                <th>Ingredient</th>
                <th>Quantity</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td><button onClick={() => deleteGroceryItem(index)} style={{ backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button onClick={goToMainPage}>Go to Ingredients List</button>
        <button onClick={goToRecipes}>Go to Recipes</button>
      </div>
    </div>
  );
};

export default GroceryList;
