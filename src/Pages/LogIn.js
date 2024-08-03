import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const backgroundImageUrl = 'https://img.freepik.com/free-photo/close-up-scientist-wearing-mask_23-2148926621.jpg?w=1380&t=st=1722457123~exp=1722457723~hmac=c8f2596cbc8a68f9fff0bd645bdc5e5f7ac7bceded4b161f0c0fb55dc5e0a489';
// Tamno siva pozadina
const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  background-image: url(${backgroundImageUrl});
  background-size:cover;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8); /* Zatamnjenje pozadine */
    z-index: 1;
  }
`;

const ContentBox = styled.div`
  position: relative;
  z-index: 2; /* Postavi iznad zatamnjene pozadine */
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 50%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  width: 30%;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: green;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  font-weight: bold;

  &:hover {
    background-color: transparent;
    color:black;
    font-weight:bold;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin: 10px 0;
`;

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const handleLoginClick = async () => {
      if (!username || !password) {
        setError('Both fields are required.');
        return;
      }
  
      try {
        const response = await fetch('https://localhost:7265/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
  
        if (response.ok) {
          const token = await response.text(); 
  
          localStorage.setItem('authToken', token);
  
          navigate('/Pages/HomePage');
        } else {
          const errorText = await response.text();
          setError(errorText);
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
  
    return (
      <LoginWrapper>
        <ContentBox>
          <h1>Log In</h1>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <SubmitButton onClick={handleLoginClick}>Log In</SubmitButton>
        </ContentBox>
      </LoginWrapper>
    );
  }

export default Login;

