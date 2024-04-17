import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Recipes = () => {
  const navigate = useNavigate(); // Use the navigate function from React Router

  // Function to go back to the main ingredients page
  const goBackToMain = () => {
    navigate('/'); // Adjust the route if necessary
  };

  // Function to navigate to the Grocery List page
  const goToGroceryList = () => {
    navigate('/grocery-list'); // Adjust the route to your grocery list page as necessary
  };

  return (
    <div>
      <h1>Recipes</h1>
      {/* You might have recipe details or list here in the future */}

      {/* Button to navigate back to the main page */}
      <button onClick={goBackToMain}>Back to Ingredients</button>
      {/* Button to navigate to the grocery list */}
      <button onClick={goToGroceryList}>Go to Grocery List</button>
    </div>
  );
}

export default Recipes;
