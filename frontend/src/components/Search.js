
import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const SearchBar = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #cccccc;
  font-size: 16px;
  width: 300px;
  margin-bottom: 20px;
`;

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  
    console.log('Search query:', event.target.value);
  };

  return (
    <Container>
      <h1>Search Products</h1>
      <SearchBar
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={handleSearch}
      />
    
    </Container>
  );
};

export default SearchPage;
