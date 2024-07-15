import React from 'react';
import products from "./products.json";
import './CollectionPage.css';

const CollectionPage = () => {
  return (
    <div className="collection-container">
      <h1 className="collection-heading">Our Sustainable Collection</h1>
      <p className="collection-paragraph">Explore our wide range of eco-friendly and sustainable fashion products.</p>
      <div className="products-grid">
        {products.map(product => (
          <div key={product['Product ID']} className="product-card">
            <img src={product['Product URL']} alt={product['Product Name']} className="product-image" />
            <h2 className="product-name">{product['Product Name']}</h2>
            <p className="product-price">{product['Price']}</p>
            <p className="product-description">{product['Description']}</p>
            <p className="product-material">Material: {product['Material']}</p>
            <p className="product-certification">Certification: {product['Certification']}</p>
            <p className="product-eco-features">Features: {product['Eco-Friendly Features']}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionPage;
