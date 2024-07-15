import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const TrendingContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const ProductList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ProductItem = styled.li`
  display: flex;
  align-items: center;
  padding: 15px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const ProductLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: bold;
  flex: 1;
`;

const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 20px;
  border-radius: 5px;
`;

const ProductDetails = styled.div`
  flex: 1;
`;

const Brand = styled.p`
  margin: 0;
  color: #666;
`;

const TrendingPage = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/view/trending');
        setTrendingProducts(response.data);
      } catch (error) {
        console.error('Error fetching trending products', error);
      }
    };

    fetchTrendingProducts();
  }, []);

  return (
    <TrendingContainer>
      <Title>Trending Products</Title>
      <ProductList>
        {trendingProducts.map((item) => (
          <ProductItem key={item.productDetails._id}>
            <ProductImage src={item.productDetails.image} alt={item.productDetails.name} />
            <ProductDetails>
              <ProductLink to={`/products/${item.productDetails._id}`}>
                {item.productDetails.name}
              </ProductLink>
              <Brand>{item.productDetails.brand}</Brand>
            </ProductDetails>
          </ProductItem>
        ))}
      </ProductList>
    </TrendingContainer>
  );
};

export default TrendingPage;
