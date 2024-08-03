import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: #f5f5f5;
    font-family: Arial, sans-serif;
  }
`;

const HomeWrapper = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 80px;
`;

const UserCard = styled.div`
  width: 300px;
  height: 300px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: box-shadow 0.3s;
  
  &:hover {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  }
`;

const UserTitle = styled.h2`
  margin: 0;
  font-size: 2.0em;
  color: #333;
`;

const UserDetail = styled.p`
  margin: 5px 0;
  font-size: 1.5em;
  color: #555;

  span {
    color: black; 
  }

  .value {
    color: #90EE90; 
  }
`;

const Header = styled.div`
  position: fixed; 
  top: 0;
  left: 0;
  right: 0;
  background-color: #333;
  color: white;
  padding: 0px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000; 
`;

const changeColor = keyframes`
  from {
    background-color: green;
  }
  to {
    background-color: transparent;
  }
`;

const AddButton = styled.button`
  background-color: green;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 15px 25px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    background-color: transparent;
    color: green;
    animation: ${changeColor} 0.5s forwards;
  }
`;

const LogoutButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    background-color: darkred;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  width: 80%;
  max-width: 600px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  position: relative;
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.button`
  background: red;
  color: white;
  border: none;
  border-radius: 100%;
  padding: 5px 10px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 16px;
`;

const UserImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-right: 20px;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const Label = styled.label`
  margin-top: 10px;
  font-weight: bold;
  width: 50%;
`;

const Input = styled.input`
  margin-right: 50px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 95%; 
`;

const Select = styled.select`
  margin-right: 50px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 95%;
`;

const ModalButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  background-color: green;
  color: white;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: darkgreen;
  }
`;

function formatDate(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function Home() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    name: '',
    orders: 1,
    imageUrl: '',
    dateOfBirth: '',
    role: 'Employee'
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('authToken');

      try {
        const response = await fetch('https://localhost:7265/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          const errorText = await response.text();
          alert(errorText);
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        setError(`There was a problem with the fetch operation: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const fetchUserDetails = async (userId) => {
    const token = localStorage.getItem('authToken');
    
    try {
      const response = await fetch(`https://localhost:7265/users/details/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSelectedUser(data);
      } else {
        const errorText = await response.text();
        alert(errorText);
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setError(`There was a problem with the fetch operation: ${error.message}`);
    }
  };

  const handleUserClick = (user) => {
    fetchUserDetails(user.userId);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSave = async () => {
    if (!selectedUser.username || !selectedUser.name || !selectedUser.dateOfBirth || !selectedUser.imageUrl) {
      alert('All fields must be filled out.');
      return;
    }
    else if (selectedUser.username.length < 5) {
      alert('Username must be longer than 5 characters.');
      return;
    }
  
    const token = localStorage.getItem('authToken');
    
    try {
      const response = await fetch(`https://localhost:7265/users/update/${selectedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(selectedUser),
      });
  
      if (response.ok) {
        alert('User details updated successfully');
        setSelectedUser(null);
      } else {
        const errorText = await response.text();
        setError(`Failed to update user details: ${errorText}`);
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setError(`There was a problem with the fetch operation: ${error.message}`);
    }
  };

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddUser = async () => {
    if (!newUser.username || !newUser.password || !newUser.name || !newUser.dateOfBirth || !newUser.imageUrl) {
      alert('All fields must be filled out.');
      return;
    }
    else if (newUser.username.length < 5 || newUser.password.length < 5) {
      alert('Username and password must be longer than 5 characters.');
      return;
    }
  
    const token = localStorage.getItem('authToken');
    
    try {
      const response = await fetch('https://localhost:7265/users/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newUser),
      });
  
      if (response.ok) {
        alert('User added successfully');
        closeAddModal();
        setNewUser({
          username: '',
          password: '',
          name: '',
          orders: 1,
          imageUrl: '',
          dateOfBirth: '',
          role: 'Employee'
        });
        // Refetch the users
        const data = await response.json();
        setUsers(prevUsers => [...prevUsers, data]);
      } else {
        const errorText = await response.text();
        setError(`Failed to add user: ${errorText}`);
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setError(`There was a problem with the fetch operation: ${error.message}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/Pages/LogIn');
  };

  return (
    <>
      <GlobalStyle /> 
      <Header>
        <h1>Users</h1>
        <div>
          <AddButton onClick={openAddModal}>Add</AddButton>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </div>
      </Header>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <HomeWrapper>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {users.length === 0 && !error && <p>No users found.</p>}
          {users.map(user => (
            <UserCard key={user.userId} onClick={() => handleUserClick(user)}>
              <UserTitle>{user.name}</UserTitle>
              <UserDetail><span>ID:</span> <span className="value">{user.userId || 'N/A'}</span></UserDetail>
              <UserDetail><span>Username:</span> <span className="value">{user.username || 'N/A'}</span></UserDetail>
              <UserDetail><span>Last Login:</span> <span className="value">{formatDate(user.lastLoginDate)}</span></UserDetail>
            </UserCard>
          ))}
        </HomeWrapper>
      )}
      {selectedUser && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
            <UserDetails>
              <UserImage src={selectedUser.imageUrl} alt={selectedUser.name} />
              <div>
                <Label>ID:</Label>
                <Input name="id" value={selectedUser.id || ''} onChange={handleInputChange} readOnly />
                <Label>Username:</Label>
                <Input name="username" value={selectedUser.username || ''} onChange={handleInputChange} />
                <Label>Name:</Label>
                <Input name="name" value={selectedUser.name || ''} onChange={handleInputChange} />
                <Label>Date of Birth: {formatDate(selectedUser.dateOfBirth)}</Label>
                <Input name="dateOfBirth" type="date" value={selectedUser.dateOfBirth ? formatDate(selectedUser.dateOfBirth) : ''} onChange={handleInputChange} />
                <Label>Status:</Label>
                <Input name="status" value={selectedUser.status || ''} onChange={handleInputChange}  readOnly />
                <Label>Image url:</Label>
                <Input name="imageUrl" value={selectedUser.imageUrl || ''} onChange={handleInputChange}   />
                <Label>Last Login:</Label>
                <Input name="lastLoginDate" type="date" value={selectedUser.lastLoginDate ? formatDate(selectedUser.lastLoginDate) : ''} onChange={handleInputChange}  readOnly/>
                <ModalButton onClick={handleSave}>Save Changes</ModalButton>
              </div>
            </UserDetails>
          </ModalContent>
        </ModalOverlay>
      )}
      {isAddModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={closeAddModal}>&times;</CloseButton>
            <UserDetails>
              <div>
                <Label>Username:</Label>
                <Input name="username" value={newUser.username} onChange={handleNewUserChange} />
                <Label>Password:</Label>
                <Input name="password" type="password" value={newUser.password} onChange={handleNewUserChange} />
                <Label>Name:</Label>
                <Input name="name" value={newUser.name} onChange={handleNewUserChange} />
                <Label>Orders:</Label>
                <Select name="orders" value={newUser.orders} onChange={handleNewUserChange}>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </Select>
                <Label>Image URL:</Label>
                <Input name="imageUrl" value={newUser.imageUrl} onChange={handleNewUserChange} />
                <Label>Date of Birth:</Label>
                <Input name="dateOfBirth" type="date" value={newUser.dateOfBirth} onChange={handleNewUserChange} />
                <Label>Role:</Label>
                <Select name="role" value={newUser.role} onChange={handleNewUserChange}>
                  <option value="Admin">Admin</option>
                  <option value="Employee">Employee</option>
                </Select>
                <ModalButton onClick={handleAddUser}>Add User</ModalButton>
              </div>
            </UserDetails>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}

export default Home;
