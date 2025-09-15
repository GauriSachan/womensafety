import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Resources from './pages/Resources';
import Articles from './pages/Articles';
import Emergency from './pages/Emergency';
import Contact from './pages/Contact';
// Import other pages (to be created)
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Downloads from './pages/Downloads';
// import Newsletter from './pages/Newsletter';
// import SelfDefense from './pages/SelfDefense';
// import Workshop from './pages/Workshop';
// import Quiz from './pages/Quiz';
// import Chatbot from './pages/Chatbot';
// import SafetyDashboard from './pages/SafetyDashboard';

import './styles/globals.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Placeholder routes - will be implemented */}
          <Route path="/resources" element={<Resources />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<div className="container" style={{padding: '2rem'}}><h1>Login Page</h1><p>Coming soon...</p></div>} />
          <Route path="/signup" element={<div className="container" style={{padding: '2rem'}}><h1>Signup Page</h1><p>Coming soon...</p></div>} />
          <Route path="/downloads" element={<div className="container" style={{padding: '2rem'}}><h1>Downloads Page</h1><p>Coming soon...</p></div>} />
          <Route path="/newsletter" element={<div className="container" style={{padding: '2rem'}}><h1>Newsletter Page</h1><p>Coming soon...</p></div>} />
          <Route path="/self-defense" element={<div className="container" style={{padding: '2rem'}}><h1>Self Defense Page</h1><p>Coming soon...</p></div>} />
          <Route path="/workshop" element={<div className="container" style={{padding: '2rem'}}><h1>Workshop Page</h1><p>Coming soon...</p></div>} />
          <Route path="/quiz" element={<div className="container" style={{padding: '2rem'}}><h1>Quiz Page</h1><p>Coming soon...</p></div>} />
          <Route path="/chatbot" element={<div className="container" style={{padding: '2rem'}}><h1>Chatbot Page</h1><p>Coming soon...</p></div>} />
          <Route path="/safety-dashboard" element={<div className="container" style={{padding: '2rem'}}><h1>Safety Dashboard</h1><p>Coming soon...</p></div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
