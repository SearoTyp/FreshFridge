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
      const existingIndex = items.findIndex(item => item.name.toLowerCase() === name.toLowerCase());
      if (existingIndex !== -1) {
        if (window.confirm(`${name} is already in the grocery list with quantity ${items[existingIndex].quantity}. Do you want to add more?`)) {
          const updatedItems = [...items];
          updatedItems[existingIndex].quantity += quantity;
          setItems(updatedItems);
        }
      } else {
        setItems(prevItems => [...prevItems, { name, quantity }]);
      }
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
      position: 'relative',
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
        position: 'absolute',
        top: '20px',
        left: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}>
        <button onClick={goToMainPage} style={{ backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 20px', marginBottom: '10px' }}>Go to Ingredients List</button>
        <button onClick={goToRecipes} style={{ backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 20px' }}>Go to Recipes</button>
      </div>
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '20px',
        borderRadius: '10px',
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
                <th>Action</th>
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
      </div>
    </div>
  );
};

export default GroceryList;
