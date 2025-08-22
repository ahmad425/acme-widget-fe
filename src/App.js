import Navbar from './layout/header/Navbar.jsx'; // replace with your server URL
import Products from './components/products/Products.jsx';
import React from 'react';

function App() {
  return (
    <div>
      <Navbar />
      <Products />
    </div>
  );
}

export default App;