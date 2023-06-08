import './App.css';
import axios from 'axios';
import { useState } from 'react';
import Login from './components/login';
import Search from './components/search';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleLogout = async () => {
    const { status } = await axios.post(
      `${process.env.REACT_APP_API_PATH}/auth/logout`,
      {},
      {
        withCredentials: true,
      },
    );
    if (status === 200) {
      setIsAuthenticated(false);
    }
  };

  return !isAuthenticated ? (
    <Login setIsAuthenticated={setIsAuthenticated} />
  ) : (
    <Search isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
  );
}

export default App;
