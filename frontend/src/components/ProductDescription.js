import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { FaHeart, FaTruck, FaStar, FaRegStar } from 'react-icons/fa';
import axios from 'axios';
import { addToWishlist } from '../store/actions/wishlistActions';
import { addToCart } from '../store/actions/cartActions';

const ProductDescription = () => {
  const { productId } = useParams();
  const { products } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const product = products.find((p) => p._id === productId);
  const [liked, setLiked] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const updateViewHistory = async () => {
      if (user && product) {
        try {
          await axios.post('http://localhost:5000/api/view/update', {
            userId: user._id,
            productId: product._id,
          }, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
        } catch (error) {
          console.error('Error updating view history', error);
        }
      }
    };

    updateViewHistory();
  }, [user, product]);

  if (!product) return <p>Product not found</p>;

  const handleLikeClick = () => {
    setLiked(!liked);
    setMessage(liked ? '' : 'Added to Wishlist');
    dispatch(addToWishlist(product));
    setTimeout(() => setMessage(''), 3000);
  };

  const handleAddToCartClick = () => {
    dispatch(addToCart(product));
    setMessage('Added to Cart');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleDescriptionToggle = () => {
    setShowDescription(!showDescription);
  };

  const truncateDescription = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    }
    return description.substring(0, maxLength) + '...';
  };

  return (
    <Container>
      <ImageContainer>
        <ProductCategory>{product.category}</ProductCategory>
        <ProductImageWrapper>
          <ProductImage src={product.image} alt={product.name} />
        </ProductImageWrapper>
      </ImageContainer>
      <DetailsContainer>
        <ProductName>{product.name}</ProductName>
        <ProductRating>
          {[...Array(4)].map((_, index) => (
            <FaStar key={index} color="yellow" />
          ))}
          <FaRegStar />
        </ProductRating>
        <ProductPrice>${product.price}</ProductPrice>
        <ButtonContainer>
          <ActionButton onClick={handleAddToCartClick}>Add to Cart</ActionButton>
          <LikeButton liked={liked} onClick={handleLikeClick}>
            <FaHeart />
          </LikeButton>
        </ButtonContainer>
        <DeliveryInfo>
          <FaTruck /> Free Delivery on orders over $30.00
        </DeliveryInfo>
        <DescriptionToggleButton onClick={handleDescriptionToggle}>
          {showDescription ? 'Hide Description' : 'Show Description'}
        </DescriptionToggleButton>
        {showDescription && (
          <ProductDescriptionText>{truncateDescription(product.description, 250)}</ProductDescriptionText>
        )}
        {message && <Message>{message}</Message>}
      </DetailsContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  text-align: left;
  font-family: Arial, sans-serif;
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
`;

const ProductCategory = styled.div`
  position: absolute;
  top: 10px;
  background-color: #f0f0f0;
  padding: 8px 15px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  margin-top: -45px;
  z-index: 1;
`;

const ProductImageWrapper = styled.div`
  width: 500px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 20px;
  margin-top: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
`;

const DetailsContainer = styled.div`
  flex: 1;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 85px;
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const ProductPrice = styled.p`
  font-size: 24px;
  color: green;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 80%;
  margin-bottom: 20px;
  margin-top: 25px;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  background-color: #004085;
  color: #fff;
  border: none;
  width: 80%;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const LikeButton = styled.button`
  padding: 10px 20px;
  background-color: ${props => (props.liked ? 'red' : '#ddd')};
  color: ${props => (props.liked ? '#fff' : '#000')};
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: ${props => (props.liked ? '#ff6666' : '#ccc')};
  }
`;

const DeliveryInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  margin-bottom: 20px;
  color: #333;
  svg {
    margin-right: 10px;
  }
`;

const DescriptionToggleButton = styled.button`
  padding: 10px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
  width: 30%;
  margin-top: 25px;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const ProductDescriptionText = styled.p`
  font-size: 18px;
`;

const Message = styled.p`
  font-size: 18px;
  color: maroon;
  margin-top: -126px;
  margin-left: 445px;
  font-weight: bold;
`;

export default ProductDescription;
