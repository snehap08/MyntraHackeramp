import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { login } from '../store/actions/authActions';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 83vh; 
  background-color: #f5f5f5;
`;

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px; 
`;

const ImageContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const FormContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginForm = styled.form`
  background-color: #ffffff; 
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
  color: #333333; 
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #cccccc; 
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 5px;
  background-color: #0056b3;
  color: #ffffff; 
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: purple; 
  }
`;

const RegisterLink = styled.a`
  display: block;
  text-align: center;
  color: #333;
  text-decoration: none;
  margin-top: 20px;

  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const { user, error, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]); 

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(credentials));
  };

  return (
    <Container>
      <ContentContainer>
        <ImageContainer>
          <Image src="login_final.png" alt="Image" />
        </ImageContainer>
        <FormContainer>
          <LoginForm onSubmit={handleSubmit}>
            <Title>Welcome!</Title>
            <Input
              type="text"
              name="email"
              placeholder="Email"
              value={credentials.email}
              onChange={handleChange}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
            />
            <Button type="submit">Login</Button>
            <RegisterLink href="/register">Create Your Account</RegisterLink>
          </LoginForm>
        </FormContainer>
      </ContentContainer>
    </Container>
  );
};

export default Login;
