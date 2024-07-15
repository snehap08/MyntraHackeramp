import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchProducts } from '../store/actions/productActions';
import Wishlist from './Wishlist';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const PromoBanner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #FFF5E6;
  padding: 10px;
  border-radius: 10px;
  margin: 0px 0; 
  width: 91%;
  height: 190px;
  margin-left: 56px;
  margin-bottom: 80px; 
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const PromoText = styled.div`
  font-size: 34px;
  color: #333;
  margin-left: 190px;
  margin-top: -15px;
  line-height: 1.2; 
  font-family: bold;
`;

const PromoButton = styled(Link)`
  background-color: #013220;
  color: white;
  padding: 10px 20px;
  border-radius: 25px;
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  margin-top: 15px;
  margin-left: 275px;

  &:hover {
    background-color: #027148;
  }
`;

const PromoImage = styled.img`
height: 250px; /* Increase the height of the image */
width: 300px; /* Maintain aspect ratio */
margin-right: 145px;
`;

const StyledSelect = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  background-color: white;
  color: #333;
`;

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [showPopup, setShowPopup] = useState(false); 
  const [mainCategories, setMainCategories] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      const uniqueCategories = [...new Set(products.map(product => product.category))];
      setMainCategories(uniqueCategories);
    }
  }, [products]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    console.log('Search query:', searchQuery);
  };

  if (loading) return <p>Loading...</p>;
  
  if (error) return <p>Error: {error}</p>;

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'All' || product.category.includes(selectedCategory);
    const searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <div style={styles.container}>
      <PromoBanner>
        <TextContainer>
          <PromoText>
            Grab Upto 50% Off On<br />
            Selected Products
          </PromoText>
          <PromoButton to="/products">Buy Now</PromoButton>
        </TextContainer>
        <PromoImage src="discounted.png" alt="Promo" />
      </PromoBanner>
      <div style={styles.controls}>
        <div style={styles.dropdownContainer}>
          <label htmlFor="categorySelect" style={styles.label}>Select Category:</label>
          <StyledSelect id="categorySelect" onChange={handleCategoryChange} value={selectedCategory}>
            <option value="All">All</option>
            {mainCategories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </StyledSelect>
        </div>
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={styles.searchInput}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                handleSearch();
              }
            }}
          />
         
        </div>
      </div>
      {/* {showPopup && (
        <div style={styles.popup}>
          <p style={styles.popupText}>View Product</p>
        </div>
      )} */}
      {filteredProducts.length === 0 ? (
        <p>No products available</p>
      ) : (
        <ul style={styles.list}>
          {filteredProducts.map((product) => (
            <li key={product._id} style={styles.listItem}>
              <div style={styles.imageContainer}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={styles.image}
                />
              </div>
              <div style={styles.productDetails}>
                <h2 style={styles.productName}>{product.name}</h2>
                <p style={styles.productPrice}>${product.price}</p>
                <p style={styles.description}>{product.description}</p>
                <Link to={`/product/${product._id}`} style={styles.viewProductButton}>
                  View Product
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
      {/* <Wishlist wishlist={wishlist} /> */}
    </div>
  );
};


const styles = {
  container: {
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  dropdownContainer: {
    marginRight: '90px',
  },
  label: {
    margin: '20px',
    fontFamily: 'bold',
    fontSize: '18px',
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '170px',
   
  },
  searchInput: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
    marginRight: '5px',
    width: '500px',
  },
  searchIcon: {
    cursor: 'pointer',
    fontSize: '20px',
    color: 'purple',
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    listStyleType: 'none',
    padding: '0',
    margin: '0',
  },
  listItem: {
    width: 'calc(25% - 20px)',
    marginBottom: '20px', 
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    marginRight: '20px', 
  },
  imageContainer: {
    height: '300px', 
    borderRadius: '5px', 
    marginBottom: '10px',
    padding: '10px', 
    width: '300px',
    marginTop: '45px',
    backgroundColor: 'inherit', 
    border: '1px solid #cccc',
  },
  image: {
    width: '80%',
    height: '80%',
  },

  productDetails: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productName: {
    fontWeight: 'bold',
    marginBottom: '5px', 
    fontSize: '16px',
  },
  productPrice: {
    fontWeight: 'bold',
    marginBottom: '5px', 
  },
  description: {
    marginBottom: '10px',
    maxHeight: '55px', 
    overflow: 'hidden', 
    textOverflow: 'ellipsis', 
  },
  viewProductButton: {
    padding: '8px 20px',
    backgroundColor: 'maroon',
    color: '#fff',
    border: 'none',
    borderRadius: '25px', 
    fontSize: '16px',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    marginTop: '10px',
  },
  popup: {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#4b0082', 
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    marginBottom: '640px',
    marginLeft: '590px',
    zIndex: '999',
    animation: 'fadeInOut 2s ease',
  },
  popupText: {
    margin: '0',
    fontWeight: 'bold',
  },
  '@keyframes fadeInOut': {
    '0%': { opacity: 0 },
    '50%': { opacity: 1 },
    '100%': { opacity: 0 },
  },
};

export default ProductList;
