import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GroceryList = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  const addGroceryItem = (event) => {
    event.preventDefault();
    const name = event.target.elements.name.value.trim();
    const quantity = event.target.elements.quantity.valueAsNumber;
    if (name && quantity > 0) {
      setItems(prevItems => [...prevItems, { name, quantity }]);
      event.target.reset(); // Reset form input after submission
    }
  };

  const goToMainPage = () => {
    navigate('/'); // Navigates back to the main page
  };

  return (
    <div style={{
      backgroundImage: 'url(/images/FridgeImage2.JPG)',
      backgroundSize: 'contain', // Changed from 'cover' to 'contain'
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: 'white', // Ensure the background is white if the image doesn't cover the full page
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center', // Aligns content vertically center
      alignItems: 'center', // Aligns content horizontally center
    }}>
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '20px',
        borderRadius: '10px',
        width: '80%',
        maxWidth: '500px',
        textAlign: 'center', // Centers the text
        zIndex: 2 // Ensure the form is above the background
      }}>
        <h2>What do you need for your fridge?</h2>
        <form onSubmit={addGroceryItem} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input type="text" name="name" placeholder="Ingredient Name" required />
          <input type="number" name="quantity" placeholder="Quantity" required min="1" />
          <button type="submit">Add Ingredient</button>
        </form>
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item.name} - Quantity: {item.quantity}</li>
          ))}
        </ul>
        <button onClick={goToMainPage}>Go to Ingredients List</button>
      </div>
    </div>
  );
};

export default GroceryList;
