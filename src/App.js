import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/HomePage';
import Landing from './Pages/Landing';
import Login from './Pages/LogIn'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Pages/HomePage" element={<Home/>} />
        <Route path="/Pages/LogIn" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
