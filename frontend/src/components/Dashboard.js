import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Heading = styled.h2`
  font-size: 36px;
  color: #333;
  margin-bottom: 20px;
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const SearchInput = styled.input`
  padding: 12px;
  font-size: 16px;
  border: 2px solid #5E2D91;
  border-radius: 25px;
  margin-right: 20px;
  width: 300px;
  outline: none;

  ::placeholder {
    color: #aaa;
  }
`;

const SearchButton = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 25px;
  border: none;
  background-color: #5E2D91;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4c1d73;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const RecommendationsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const RecommendationCard = styled.div`
  width: calc(25% - 80px);
  margin: 20px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 25px;
  transition: box-shadow 0.3s ease;
  position: relative;
  opacity: 0;
  animation: fadeIn 0.5s ease forwards;

  &:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

const Loader = styled.div`
  border: 6px solid #f3f3f3;
  border-top: 6px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const ProductName = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
`;

const ProductBrand = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
  color: #666;
`;

const ProductPrice = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 14px;
  color: #555;
  height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ViewProductButton = styled.button`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 25px;
  border: none;
  background-color: #013220;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4c1d73;
  }
`;

function Dashboard() {
  const [query, setQuery] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get(`http://localhost:8000/search?query=${query}`);
      setRecommendations(response.data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardContainer>
      <SearchForm onSubmit={handleSubmit}>
        <SearchInput
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter Product here..."
        />
        <SearchButton type="submit" disabled={loading}>{loading ? 'Searching...' : 'Search'}</SearchButton>
      </SearchForm>

      {loading ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : (
        <RecommendationsContainer>
          {recommendations.map((product, index) => (
            <RecommendationCard key={index}>
              <ProductImage src={JSON.parse(product.image)[0]} alt={product.name} />
              <ProductName>{product.name}</ProductName>
              <ProductBrand>{product.brand}</ProductBrand>
              <ProductPrice>Price: {product.price}</ProductPrice>
              <Description>{product.description.length > 100 ? product.description.substring(0, 100) + '...' : product.description}</Description>
            </RecommendationCard>
          ))}
        </RecommendationsContainer>
      )}
    </DashboardContainer>
  );
}

export default Dashboard;
