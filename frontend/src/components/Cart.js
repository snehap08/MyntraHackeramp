import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { addToWishlist } from '../store/actions/wishlistActions';

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems: initialCartItems } = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState([]);
  const [coupon, setCoupon] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('free');
  const [checkoutInitiated, setCheckoutInitiated] = useState(false);

  useEffect(() => {
    const updatedCartItems = initialCartItems.map(item => ({
      ...item,
      quantity: item.quantity || 1
    }));
    setCartItems(updatedCartItems);
  }, [initialCartItems]);

  const handleRemoveFromCart = (productId) => {
    const updatedItems = cartItems.filter(item => item._id !== productId);
    setCartItems(updatedItems);
  };

  const handleMoveToWishlist = (item) => {
    dispatch(addToWishlist(item));
    handleRemoveFromCart(item._id);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const calculateSubtotal = (price, quantity) => {
    return price * quantity;
  };

  const handleApplyCoupon = () => {
   
    console.log('Coupon applied:', coupon);
  };

  const handleCheckout = () => {
    setCheckoutInitiated(true);
    setTimeout(() => {
      setCheckoutInitiated(false);
    }, 1000); // Hide after 2 seconds
  };

  return (
    <CartContainer>
      <Heading>Shopping Cart</Heading>
      <CartTable>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Subtotal</th>
            
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item._id}>
              <td>
                <ProductImage src={item.image} alt={item.name} />
                <ProductName>{item.name}</ProductName>
                {/* <ActionButton onClick={() => handleMoveToWishlist(item)}>
                  Move to Favorites
                </ActionButton> */}
              </td>
              <td>
                <QuantityInput
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(
                      item._id,
                      parseInt(e.target.value) || 1
                    )
                  }
                  min="1"
                  step="1"
                />
              </td>
              <td>${item.price}</td>
              <td>${calculateSubtotal(item.price, item.quantity)}</td>
              <td>
                <div style={{position: 'relative'}}>
              <ActionButton onClick={() => handleMoveToWishlist(item)}>
                  Move to Favorites
                </ActionButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </CartTable>
      <CouponSection>
        <CouponHeading>Have a Coupon?</CouponHeading>
        <CouponDescription>Add your code for instant discount</CouponDescription>
        <CouponInputContainer>
          <CouponInput
            type="text"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Enter coupon code"
          />
          <ApplyButton onClick={handleApplyCoupon}>Apply</ApplyButton>
        </CouponInputContainer>
      </CouponSection>
      <CartSummary>
        <SummaryHeading>Cart Summary</SummaryHeading>
        <DeliveryOptions>
          <RadioButton>
            <input
              type="radio"
              id="freeDelivery"
              name="deliveryOption"
              value="free"
              checked={deliveryOption === 'free'}
              onChange={() => setDeliveryOption('free')}
            />
            <label htmlFor="freeDelivery">Free Delivery</label>
          </RadioButton>
          <RadioButton>
            <input
              type="radio"
              id="expressDelivery"
              name="deliveryOption"
              value="express"
              checked={deliveryOption === 'express'}
              onChange={() => setDeliveryOption('express')}
            />
            <label htmlFor="expressDelivery">Express Delivery</label>
          </RadioButton>
          <CheckoutButton onClick={handleCheckout}>CheckOut</CheckoutButton>
        </DeliveryOptions>
        {checkoutInitiated && <CheckoutMessage>😊 Order placed!</CheckoutMessage>}
      </CartSummary>
    </CartContainer>
  );
};

const CartContainer = styled.div`
  margin-top: 20px;
  // padding: 20px;
`;

const Heading = styled.h2`
  text-align: center;
  font-size: 45px;
  margin-bottom: 15px;
`;

const CartTable = styled.table`
  width: 90%;
  font-size: 20px;
  margin-top: 54px;
  right: 85px;
  border-collapse: collapse;
  margin-left: 70px;

  th,
  td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }

  th {
    text-align: left;
  }

  th:nth-child(2),
  td:nth-child(2),
  th:nth-child(3),
  td:nth-child(3) {
     padding-right: 115px;
  }
`;

const DeliveryOptions = styled.div`
  /* Styles for the delivery options container */
  position: relative;
margin-top: 45px;
margin-left: -165px;
width: 90%;
`;

const CheckoutMessage = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  font-size: 24px;
  display: flex;
  align-items: center;
`;

const RadioButton = styled.div`
border: 1px solid black;
margin-top: 12px;
font-size: 18px;
padding: 10px;
font-weight: 820px;
margin-left: 23px;

`;

const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 10px;
`;

const ProductName = styled.span`
  margin-right: -15px;
  font-size: 18px;
  position: relative;
  top: -45px;
  right: -35px;
`;

const QuantityInput = styled.input`
  width: 50px;
  padding: 5px;
  text-align: center;
`;

const ActionButton = styled.button`
  background: #FFFDD0;
  color: #00008B;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
 cursor: pointer;
 position: absolute;
 right: 1050px;
 width: 135px;
 top: 14px;
 
`;



const CouponSection = styled.div`
  margin-top: 40px;
  margin-left: 45px;
  padding: 20px;
  background-color: #fff;
  // border: 1px solid #ddd;
  // border-radius: 10px;
  // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: 45%;
  width: 40%;
  margin-bottom: 245px;
 
`;

const CouponHeading = styled.h3`
  font-weight: bold;
  margin-bottom: 10px;
`;

const CouponDescription = styled.p`
  margin-bottom: 10px;
`;

const CouponInputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CouponInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
  
`;

const ApplyButton = styled.button`
  padding: 10px 20px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const CartSummary = styled.div`
  border: 2px solid #333;
  padding: 20px;
  display: flex;
  height: 35%;
  border: 1px solid grey;
  width: 35%; /* Adjust width as needed */
  margin-left: 820px; /* Adjust margin as needed */
  margin-top: -575px;
  margin-bottom: 76px;
`;

const SummaryHeading = styled.h3`
  font-weight: bold;
  font-size: 25px;
  margin-top: -5px;
  // margin-bottom: 10px;
`;

const CheckoutButton = styled.button`
padding: 10px 20px;
background-color: #000;
color: #fff;
border: none;
border-radius: 4px;
cursor: pointer;
width: 95%;
margin-top: 35px;
height: 20%;
margin-left: 23px;
`;


export default Cart;
