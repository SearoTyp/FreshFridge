/****THIS WILL NOT WORK WITHOUT RUNNING THE FOLLOWING LINE****
npm install react-router-dom axios*/
// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './MainPage';
import GroceryList from './GroceryList';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/grocery-list" component={GroceryList} />
        {/* Add more routes as needed */}
      </Switch>
    </Router>
  );
}

export default App;
