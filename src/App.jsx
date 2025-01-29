import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ValentineApp from './components/Valentine.jsx';
import Login from './components/Login.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route
            path="/bagchi"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ValentineApp />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
