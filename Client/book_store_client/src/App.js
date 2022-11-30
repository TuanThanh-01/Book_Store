import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login/index';
import Forbidden from './components/Forbidden/index';
import SharedLayOut from './components/SharedLayout';
import Signup from './components/Signup/index';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<SharedLayOut user={user} setUser={setUser} />}
        >
          <Route index element={<div>home page</div>} />
          <Route path='/login' element={<Login setUser={setUser} />} />
          <Route path='/signup' element={<Signup />} />
        </Route>
        <Route path='*' element={<Forbidden />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
