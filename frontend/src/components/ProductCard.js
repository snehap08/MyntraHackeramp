import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 200px;
  text-align: center;
`;

const ProductImage = styled.img`
  width: 100%;
  border-radius: 10px;
`;

const ProductName = styled.h3`
  font-size: 18px;
  color: #333333;
  margin: 10px 0;
`;

const ProductPrice = styled.p`
  font-size: 16px;
  color: #666666;
`;

const ProductCard = ({ product }) => {
  return (
    <CardContainer>
      <ProductImage src={product.image} alt={product.title} />
      <ProductName>{product.title}</ProductName>
      <ProductPrice>${product.price}</ProductPrice>
    </CardContainer>
  );
};

export default ProductCard;
