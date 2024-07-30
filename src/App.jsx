import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/admin/SignUp';
import SignIn from './pages/admin/SignIn';
import Dashboard from './pages/admin/Dashbaord';
import ViewItemDetails from './pages/ViewItemDetails';
import useAuth from './hooks/adminAuth';

const App = () => {

  const [isAuthenticated] = useAuth();

  if (isAuthenticated === null) {
    return <div></div>;
  }

  console.log(isAuthenticated);
  return (
    <Router>
      <Routes>

        {/* Admin Routes */}
        <Route path='/' element={<LandingPage />} />
        <Route path='/item/:id' element={<ViewItemDetails />} />
        <Route path='/admin'>
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="dashboard" element={ isAuthenticated ? <Dashboard /> : <Navigate to="/admin/signin" replace /> } />
        </Route>

      </Routes>
    </Router>
  );
};

export default App;
