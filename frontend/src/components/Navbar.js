import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaShoppingCart, FaHeart, FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../actions/authActions'; // Import your logout action
import { logout } from '../store/actions/authActions';

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  font-family: sans-serif;
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin-right: 20px;
`;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  transition: color 0.3s ease;
  font-weight: 600;
  font-size: 18px;
  padding: 10px;

  &:hover {
    color: purple;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  margin-right: 20px;
  font-size: 20px;
  color: black;
`;

const NavbarLogo = styled.img`
  height: 70px;
  width: 100px;
  margin-left: 34px;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  padding: 10px;
  transition: color 0.3s ease;
  background-color: purple;
  border-radius: 10px;
  &:hover {
    color: #ccc;
  }
`;

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  const handledesigner=()=>{
    // console.log(' fdsf')
    window.location.href = 'http://localhost:3001/';

  }
  const handleinfluencer=()=>{
    window.location.href = 'http://localhost:3002/';

  }
  return (
    <NavbarContainer>
      <NavbarLogo src="myntralogo.png" alt="Logo" />
      <NavList>
        <NavItem>
          <NavLink to="/">Home</NavLink>
        </NavItem><NavItem>
          <NavLink onClick={handledesigner}>Designer</NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={handleinfluencer}>Influencer's Advice</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/products">Products</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/sustainability">Sustainability</NavLink>
        </NavItem>
        {
          user && <NavItem>
          <NavLink to="/view">ViewHistory</NavLink>
        </NavItem>
      
        }
        
        <NavItem>
          <NavLink to="/trend">Trending</NavLink>
        </NavItem>
        
        {!user && (
          <NavItem>
            <NavLink to="/login">Login</NavLink>
          </NavItem>
        )}
      </NavList>
      <IconWrapper>
        <Icon>
          <Link to="/cart">
            <FaShoppingCart />
          </Link>
        </Icon>
        <Icon>
          <Link to="/wishlist">
            <FaHeart />
          </Link>
        </Icon>

        {!user && (
          <Icon>
            <Link to="/register">
              <FaUser />
            </Link>
          </Icon>
        )}
        {user && (
          <>
            <NavItem>
              <NavLink to="/">Hi! {user.username}</NavLink>
            </NavItem>
            <NavItem>
              <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            </NavItem>
          </>
        )}
      </IconWrapper>
    </NavbarContainer>



  );
};

export default Navbar;