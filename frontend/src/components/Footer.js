import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 40px 20px;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterHeading = styled.h3`
  font-size: 20px;
  margin-bottom: 15px;
`;

const FooterLinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterLinkItem = styled.li`
  margin-bottom: 10px;
`;

const FooterLink = styled.a`
  color: #fff;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #ffcc00;
  }
`;

const FooterCopyright = styled.p`
  margin-top: 30px;
  font-size: 14px;
  text-align: center;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterGrid>
        <FooterSection>
          <FooterHeading>Customer Service</FooterHeading>
          <FooterLinkList>
            <FooterLinkItem>
              <FooterLink href="#">Contact Us</FooterLink>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLink href="#">Shipping Information</FooterLink>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLink href="#">Returns & Exchanges</FooterLink>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLink href="#">FAQs</FooterLink>
            </FooterLinkItem>
          </FooterLinkList>
        </FooterSection>
        
        <FooterSection>
          <FooterHeading>About Us</FooterHeading>
          <FooterLinkList>
            <FooterLinkItem>
              <FooterLink href="#">Our Story</FooterLink>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLink href="#">Careers</FooterLink>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLink href="#">Terms & Conditions</FooterLink>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLink href="#">Privacy Policy</FooterLink>
            </FooterLinkItem>
          </FooterLinkList>
        </FooterSection>
        
        <FooterSection>
          <FooterHeading>Connect With Us</FooterHeading>
          <FooterLinkList>
            <FooterLinkItem>
              <FooterLink href="#">Facebook</FooterLink>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLink href="#">Instagram</FooterLink>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLink href="#">Twitter</FooterLink>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLink href="#">Pinterest</FooterLink>
            </FooterLinkItem>
          </FooterLinkList>
        </FooterSection>
        
        <FooterSection>
          <FooterHeading>Subscribe to Our Newsletter</FooterHeading>
          <FooterLinkList>
            <FooterLinkItem>
              <FooterLink href="#">Sign Up Now</FooterLink>
            </FooterLinkItem>
          </FooterLinkList>
        </FooterSection>
      </FooterGrid>
      
      <FooterCopyright>
        &copy; 2024 Your E-Commerce Store. All rights reserved.
      </FooterCopyright>
    </FooterContainer>
  );
};

export default Footer;
