import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// URL slike za pozadinu i sliku unutar border-a
const backgroundImageUrl = 'https://img.freepik.com/free-photo/close-up-scientist-wearing-mask_23-2148926621.jpg?w=1380&t=st=1722457123~exp=1722457723~hmac=c8f2596cbc8a68f9fff0bd645bdc5e5f7ac7bceded4b161f0c0fb55dc5e0a489';
const imageUrl = 'https://c8.alamy.com/comp/EXCGNX/a-happy-cartoon-test-tube-dancing-and-smiling-EXCGNX.jpg';

const LandingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  background-image: url(${backgroundImageUrl});
  background-size: cover;
  background-position: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8); 
    z-index: 1;
  }
`;

const ContentBox = styled.div`
  position: relative;
  z-index: 2; 
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center; 
  flex-direction: row; 
`;

const TextContainer = styled.div`
  height: 500px;
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;


  h1 {
    font-size: 2em;
    color: #333;
  }

  p {
    font-size: 1.4em;
    color: #666;
    margin-top: 10px;
    width: 75%; 
    text-align: justify; 

  }
`;

const Image = styled.img`
  width: 200px;
  height: 300px;
  margin-right: 50px;
`;

const LoginButton = styled.button`
  margin-top: 20px;
  padding: 15px 25px;
  font-size: 20px;
  cursor: pointer;
  background-color: green;
  color: white;
  border: none;
  border-radius: 10px;
  transition: background-color 0.3s ease;
  align-items: center; 
  font-weight:bold;

  &:hover {
    background-color: transparent;
    color:black;
    font-weight: bold;
  }
`;

function Landing() {
    const navigate = useNavigate(); 
  
    const handleLoginClick = () => {
      navigate('/Pages/LogIn'); 
    };
  return (
    <LandingWrapper>
      <ContentBox>
        <TextContainer>
          <h1>Medic-Lab</h1>
          <p>Welcome to our state-of-the-art medical laboratory, dedicated to providing accurate and timely diagnostic services. Our expert team ensures the highest standards of quality and care in all test results.</p>
          <LoginButton onClick={handleLoginClick}>Log In</LoginButton>
        </TextContainer>
        <Image src={imageUrl} alt="Slika" />
      </ContentBox>
    </LandingWrapper>
  );
}

export default Landing;
