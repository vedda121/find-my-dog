import { useState } from 'react';
import Login from './components/login';
import Search from './components/search';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  return !isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Search />;
}

export default App;
