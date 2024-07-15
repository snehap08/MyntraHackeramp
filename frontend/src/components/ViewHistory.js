import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const ViewHistoryContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  font-size: 32px;
`;

const ProductList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ProductItem = styled.li`
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProductLink = styled(Link)`
  text-decoration: none;
  color: #0056b3;
  font-weight: bold;
  flex: 1;
  transition: color 0.3s ease;

  &:hover {
    color: #003580;
  }
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

const DeleteButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff1a1a;
  }
`;

const ViewHistoryPage = () => {
  const [viewHistory, setViewHistory] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchViewHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/view/user/${user._id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        // Ensure the products are unique
        const uniqueProducts = [];
        const productIds = new Set();

        response.data.forEach(item => {
          if (!productIds.has(item.product._id)) {
            productIds.add(item.product._id);
            uniqueProducts.push(item);
          }
        });

        setViewHistory(uniqueProducts);
      } catch (error) {
        console.error('Error fetching view history', error);
      }
    };

    if (user) {
      fetchViewHistory();
    }
  }, [user]);

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/view/delete/${user._id}/${productId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setViewHistory(viewHistory.filter((item) => item.product._id !== productId));
    } catch (error) {
      console.error('Error deleting view history item', error);
    }
  };

  return (
    <ViewHistoryContainer>
      <Title>View History</Title>
      <ProductList>
        {viewHistory.map((item) => (
          <ProductItem key={item._id}>
            <ProductImage src={item.product.image} alt={item.product.name} />
            <ProductDetails>
              <ProductLink to={`/products/${item.product._id}`}>
                {item.product.name}
              </ProductLink>
              <Brand>{item.product.brand}</Brand>
            </ProductDetails>
            <DeleteButton onClick={() => handleDelete(item.product._id)}>
              Delete
            </DeleteButton>
          </ProductItem>
        ))}
      </ProductList>
    </ViewHistoryContainer>
  );
};

export default ViewHistoryPage;
