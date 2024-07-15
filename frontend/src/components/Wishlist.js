import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { FaHeart, FaShoppingCart, FaTimes } from 'react-icons/fa';
import { removeFromWishlist } from '../store/actions/wishlistActions';
import { addToCart } from '../store/actions/cartActions';

const Wishlist = () => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const handleRemoveClick = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    alert('Added to cart');
  };

  const handleMoveAllToBag = () => {
    console.log('Move all to bag clicked');
  };

  return (
    <WishlistContainer>
      <Title>
        Wishlist ({wishlist.length})
        <ActionButton onClick={handleMoveAllToBag}>
          <FaShoppingCart style={{ marginRight: '5px' }} />
          Move All to Bag
        </ActionButton>
      </Title>
      {wishlist.length === 0 ? (
        <EmptyMessage>Your wishlist is empty.</EmptyMessage>
      ) : (
        <ProductGrid>
           
          {wishlist.map(product => (
            <ProductCard key={product._id}>
              <ProductImageContainer>
                
                <ProductImage src={product.image} alt={product.name} />
                <RemoveButton onClick={() => handleRemoveClick(product._id)}>
                  <FaTimes />
                </RemoveButton>
               
              </ProductImageContainer>
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductDescription>
                  {product.description.slice(0, 50)}...
                </ProductDescription>
                <ProductPrice>${product.price}</ProductPrice>
                <AddToCartButton onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </AddToCartButton>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductGrid>
      )}
    </WishlistContainer>
  );
};

const WishlistContainer = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  font-size: 38px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  margin-top: -5px;
  margin-left: 45px;
`;

const ActionButton = styled.button`
  padding: 15px;
  background-color: #f0f0f0;
  color: #333;
  border: none;
  border-radius: 5px;
  margin-right: 55px;
  font-size: 14px;
  cursor: pointer;
  margin-top: -5px;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const EmptyMessage = styled.p`
  text-align: center;
  font-size: 20px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 60px;
`;

const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
`;

const ProductImageContainer = styled.div`
  position: relative;
  width: 200px;
  height: 170px;
  overflow: hidden;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 5px;
  right: -1px;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  border-radius: 50%;
  font-size: 14px;
  cursor: pointer;
`;

const HeartButton = styled.button`
  position: absolute;
  top: 5px;
  left: 5px;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  border-radius: 50%;
  font-size: 14px;
  cursor: pointer;
`;

const ProductInfo = styled.div`
  text-align: center;
`;

const ProductName = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
`;

const ProductDescription = styled.p`
  font-size: 14px;
  color: #555;
  margin: 5px 0;
`;

const ProductPrice = styled.p`
  font-size: 16px;
  color: green;
  margin: 5px 0;
`;

const AddToCartButton = styled.button`
  padding: 10px 20px;
  display: absolute;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #555;
  }
`;

export default Wishlist;
