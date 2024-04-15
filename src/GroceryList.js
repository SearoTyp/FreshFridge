// GroceryList.js
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'; // import useHistory hook from react-router-dom

const onlineFoodImages = [
  // Add URLs to online images here
  'https://www.istockphoto.com/search/more-like-this/1128687123?assettype=image%2Cfilm&phrase=fresh%20food',
  'https://www.istockphoto.com/photo/table-filled-with-large-variety-of-food-gm1155240408-314440450?searchscope=image%2Cfilm'
  // ... you can add more URLs or fetch them from an API
];

const GroceryList = () => {
  const [groceries, setGroceries] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);
  const history = useHistory(); // hook to navigate using history

  // Function to add a new grocery item
  const addGroceryItem = () => {
    if (newItem.trim() !== '') {
      setGroceries([...groceries, { item: newItem, quantity }]);
      setNewItem('');
      setQuantity(1);
    }
  };

  // Navigate back to the ingredients list
  const navigateToIngredientsList = () => {
    history.push('/'); // Assuming the main page is at the root route
  };

  // Randomize the image displayed each time the component is rendered
  const randomizeImage = () => {
    const randomIndex = Math.floor(Math.random() * onlineFoodImages.length);
    setCurrentImage(randomIndex);
  };

  // Call the randomizeImage function every time the component is rendered
  useEffect(() => {
    randomizeImage();
  }, []);

  return (
    <div>
      <h1>What do you need for your fridge?</h1>
      <img src={onlineFoodImages[currentImage]} alt="Fresh Food" />
      <input
        type="text"
        placeholder="Enter ingredient"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <button onClick={addGroceryItem}>Add to List</button>
      <button onClick={navigateToIngredientsList}>Go to Ingredients List</button>
      {/* Remove or modify this button if you don't have a recipe list */}
      <ul>
        {groceries.map((grocery, index) => (
          <li key={index}>
            {grocery.item} - Quantity: {grocery.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroceryList;
