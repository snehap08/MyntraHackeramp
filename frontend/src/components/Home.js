import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { FaFire, FaArrowRight } from 'react-icons/fa';
import Footer from './Footer';
import ProductList from './ProductList';


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
  height: 75vh;
  background-color: #f2f2f2;
  border-radius: 20px;
  width: 93%;
  margin-left: 49px;
  margin-bottom: 15px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  max-width: 80%;
  margin-left: 40px;
  margin-top: -10px;
`;

const MainText = styled.h1`
  font-size: 50px;
  color: #333;
  font-family: 'Arial', sans-serif;
  font-weight: 700;
  letter-spacing: 1.5px;
  line-height: 1.2;
  animation: ${fadeIn} 1s ease;
  margin-left: 214px;
  margin-top: 13px;
`;

const SubText = styled.span`
  font-size: 20px;
  color: black;
  margin-right: 20px;
  opacity: 0;
  animation: ${fadeIn} 1s ease forwards;
  animation-delay: 1s;
  margin-left: 214px;
`;

const FireIcon = styled(FaFire)`
  color: red;
`;




const Button = styled.button`
  font-size: 18px;
  color: white;
  font-weight: 500;
  letter-spacing: 1px;
  padding: 15px 30px;
  outline: 0;
  border: 1px solid black;
  cursor: pointer;
  position: relative;
  margin-left: 1195px;
  margin-top: -665px;
  background-color: rgba(0, 0, 0, 0);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:after {
    content: "";
    background-color: purple;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 5px;
    left: 7px;
    transition: 0.2s;
    z-index: -1;
  }

  &:hover:after {
    top: 0px;
    left: 0px;
  }

  @media (min-width: 768px) {
    padding: 13px 50px;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

// const Image = styled.img`
//   height: 60vh;
//   width: 60vh;
// `;

const CollectionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
  text-align: center;
`;

const CollectionHeading = styled.h2`
  font-size: 50px;
  margin-bottom: 15px;
  color: #333;
`;

const CollectionDescription = styled.p`
  font-size: 18px;
  color: #555;
  max-width: 70%;
  margin-bottom: 40px;
`;

const RunningImages = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

const RunningImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RunningImage = styled.img`
  height: 190px;
  margin: 0 20px;
  width: 200px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
  }
`;

const PremiumTextContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: -63px;
`;

const PremiumText = styled.p`
  font-size: 18px;
  color: #333;
  font-weight: bold;
  margin-right: 8px;
`;

const ArrowCircle = styled(Link)`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: -55px;
  text-decoration: none;
`;


const Text = styled.p`
  font-size: 14px;
  color: #666;
  margin-top: 5px;
  text-align: center;
  padding-top: 1px;
  padding-left: 5px;
`;

const Spacer = styled.div`
  height: 80px;
`;


const HomePageContainer = styled.div`
  text-align: center;
  margin-bottom: -144px;
`;

const Header = styled.div`
  background-color: #eef2fb;
  padding: 0.05em;
  margin-bottom: 1em;
`;

const HeaderText = styled.p`
  font-size: 1.2rem;

  @media (max-width: 1200px) {
    font-size: 0.9375rem;
  }

  @media (max-width: 992px) {
    font-size: 0.875rem;
  }

  @media (max-width: 768px) {
    font-size: 0.8125rem;
  }

  @media (max-width: 576px) {
    font-size: 0.75rem;
  }
`;

const TimeLeft = styled.span`
  margin-left: 0.625em;
`;

const Number = styled.span`
  color: rgb(232, 113, 123);
  font-size: 1.3125rem;
  margin-left: 0.25em;
  margin-top: 1.1875em;

  @media (max-width: 1200px) {
    font-size: 1.25rem;
  }

  @media (max-width: 992px) {
    font-size: 1.1875rem;
  }

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }

  @media (max-width: 576px) {
    font-size: 1rem;
  }
`;

// const Content = styled.section`
//   margin-top: 0.0625em;
// `;

const Image = styled.img`
  max-width: 95%;
  height: auto;
  margin-top: -1.5625em;

  @media (max-width: 992px) {
    margin-top: -1.25em;
  }

  @media (max-width: 768px) {
    margin-top: -1em;
  }

  @media (max-width: 576px) {
    margin-top: -0.75em;
  }
`;

const SecondSection = styled.section`
  margin-top: 14px;
  padding-bottom: 145px;
`;



const Home = () => {
  const calculateTimeLeft = () => {
    const targetTime = new Date().getTime() + 12 * 60 * 60 * 1000;
    const difference = targetTime - new Date().getTime();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [targetTime, setTargetTime] = useState(new Date().getTime() + 12 * 60 * 60 * 1000);

  useEffect(() => {
    const timer = setInterval(() => {
      const difference = targetTime - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime]);

  return (
    <>
    <HomePageContainer>
      <Header>
        <HeaderText>
          Offer Ends In
          <TimeLeft>
            <Number>{timeLeft.hours}</Number> H : 
            <Number>{timeLeft.minutes}</Number> M : 
            <Number>{timeLeft.seconds}</Number> S
          </TimeLeft>
        </HeaderText>
      </Header>
      <Content>
        <Image src="HomePageTicket.png" alt="Fashion" />
      </Content>
      <SecondSection>
        <Image src="HomePic.jpg" alt="Fashion" />
      </SecondSection>
      <Link to="/dashboard">
            <Button>Explore Now</Button>
          </Link>
    </HomePageContainer>

      <CollectionContainer>
        <CollectionHeading>Our Collection</CollectionHeading>
        <CollectionDescription>
          Discover a world of convenience and choice at our e-commerce platform.
          Shop effortlessly from an extensive range of products and enjoy seamless transactions from the comfort of your home.
        </CollectionDescription>
      </CollectionContainer>

      <RunningImages>
        <RunningImageContainer>
          <RunningImage src="clothes.jpeg" alt="Clothes" />
          <PremiumTextContainer>
            <PremiumText>Premium Clothes</PremiumText>
            <ArrowCircle to="/products">
              <FaArrowRight color="white" />
            </ArrowCircle>
          </PremiumTextContainer>
          <Text>
            Online essentials for everyday style, offering convenience and quality at your fingertips.
          </Text>
        </RunningImageContainer>
        <RunningImageContainer>
          <RunningImage src="bags.jpeg" alt="Bags" />
          <PremiumTextContainer>
            <PremiumText>Luxury Bags</PremiumText>
            <ArrowCircle to="/products">
              <FaArrowRight color="white" />
            </ArrowCircle>
          </PremiumTextContainer>
          <Text>
            High-end statements, available with a click, adding sophistication to your digital cart.
          </Text>
        </RunningImageContainer>
        <RunningImageContainer>
          <RunningImage src="footwear.jpeg" alt="Footwear" />
          <PremiumTextContainer>
            <PremiumText>Prime Footwear</PremiumText>
            <ArrowCircle to="/products">
              <FaArrowRight color="white" />
            </ArrowCircle>
          </PremiumTextContainer>
          <Text>
            Trendy finds for virtual shopping sprees, ensuring style meets comfort with each step.
          </Text>
        </RunningImageContainer>
        <RunningImageContainer>
          <RunningImage src="plants.jpeg" alt="Plants" />
          <PremiumTextContainer>
            <PremiumText>Fresh Plants</PremiumText>
            <ArrowCircle to="/products">
              <FaArrowRight color="white" />
            </ArrowCircle>
          </PremiumTextContainer>
          <Text>
            Greenery delivered, enhancing your space with online botanical beauty and ease.
          </Text>
        </RunningImageContainer>
        <RunningImageContainer>
          <RunningImage src="furniture.jpeg" alt="Furniture" />
          <PremiumTextContainer>
            <PremiumText>Fancy Furniture</PremiumText>
            <ArrowCircle to="/products">
              <FaArrowRight color="white" />
            </ArrowCircle>
          </PremiumTextContainer>
          <Text>
            Online elegance for every room, curated selections to redefine your digital dwelling.
          </Text>
        </RunningImageContainer>
      </RunningImages>

      <Spacer />

      <Footer />
    </>
  );
};

export default Home;
