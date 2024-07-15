// components/Profile.js
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5; 
  padding: 20px;
`;

const ProfileCard = styled.div`
  background-color: #ffffff;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1); 
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 32px;
  margin-bottom: 20px;
  color: #4b0082; 
  text-align: center;
`;

const Info = styled.p`
  font-size: 18px;
  color: #666666; 
  margin-bottom: 10px;
`;

const SectionTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 10px;
  color: #4b0082; 
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  font-size: 18px;
  color: #333333;
  padding: 15px;
  border: 1px solid #dddddd;
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: #fafafa; 
`;

const Highlight = styled.span`
  color: #4b0082; 
  font-weight: bold;
`;

const Profile = () => {

  const {user } = useSelector((state) => state.auth);
  const userDummy = {
    name: user.username,
    email: user.email,
    address: "1234 Main St, Anytown, USA",
    orders: ["Order #1", "Order #2", "Order #3"],
    likedProducts: ["Product A", "Product B", "Product C"]
  };

  return (
    <Container>
      <ProfileCard>
        <Title>User Profile</Title>
        <Info><Highlight>Name:</Highlight> {userDummy.name}</Info>
        <Info><Highlight>Email:</Highlight> {userDummy.email}</Info>
        <Info><Highlight>Address:</Highlight> {userDummy.address}</Info>
      </ProfileCard>
      <ProfileCard>
        <SectionTitle>Placed Orders</SectionTitle>
        <List>
          {userDummy.orders.map((order, index) => (
            <ListItem key={index}>{order}</ListItem>
          ))}
        </List>
      </ProfileCard>
      <ProfileCard>
        <SectionTitle>Liked Products</SectionTitle>
        <List>
          {userDummy.likedProducts.map((product, index) => (
            <ListItem key={index}>{product}</ListItem>
          ))}
        </List>
      </ProfileCard>
    </Container>
  );
};

export default Profile;
