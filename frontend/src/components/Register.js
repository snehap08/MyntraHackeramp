import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { register } from '../store/actions/authActions';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 75vh;
  background-color: #f5f5f5; 
  width: 93%;
  margin-left: 50px;
  border-radius: 10px;
  animation: ${fadeIn} 1s ease forwards;
`;

const Content = styled.div`
  display: flex;
  background-color: #ffffff; 
  padding: 40px;
  border-radius: 10px;
  width: 80%;
  min-height: 43vh;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); 
  animation: ${fadeIn} 1s ease forwards;
  
`;

const ImageContainer = styled.div`
  margin-right: 20px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 400px;
  height: auto;
  border-radius: 10px;
  animation: ${fadeIn} 1s ease forwards;
  animation-delay: 1s;
`;

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center; 
  width: 50%;
  margin-left: 85px;
  animation: ${fadeIn} 1s ease forwards;
  animation-delay: 1.5s;
`;

const Title = styled.h2`
  font-size: 28px;
  margin-bottom: 18px;
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
  background-color: rgb(191, 64, 191); 
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    back
  }
`;

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const {user,error} = useSelector((state) => state.auth);

  const handleChange = (e) => {
    e.preventDefault();
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  const dispatch = useDispatch();
  const [errorM,setError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log("Start Registering with  - " + credentials);
      // await axios.post("http://localhost:5000/api/auth/register", credentials, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });

      dispatch(register(credentials))
      console.log("Successful register");
      if(user){
        navigate('/');
      }
        setError(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Content>
        <ImageContainer>
          <Image src="registration.png" alt="Register" />
        </ImageContainer>
        <RegisterForm onSubmit={handleSubmit}>
          <Title>Register Please...</Title>
          {
            errorM && <Title>ERROR : {error}</Title>
          }

          <Input type="text" placeholder="Username" name='username' value={credentials.username}
            onChange={handleChange} />
          <Input type="email" placeholder="Email" name='email' value={credentials.email}
            onChange={handleChange} />
          <Input type="password" placeholder="Password" name='password' value={credentials.password}
            onChange={handleChange} />
          <Button type="submit">Register</Button>
        </RegisterForm>
      </Content>
    </Container>
  );
};

export default Register;
