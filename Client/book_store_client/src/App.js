import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login/index';
import Forbidden from './components/Forbidden/index';
import SharedLayOut from './components/SharedLayout';
import Signup from './components/Signup/index';
import HomePage from './components/HomePage/index';
import Admin from './components/Admin/index';
import NewBook from './components/Admin/components/NewBook/index';
import UpdateBook from './components/Admin/components/UpdateBook/index';
import BookDetails from './components/BookDetails/index';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SharedLayOut />}>
          <Route index element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/manageBook' element={<Admin />} />
          <Route path='/newBook' element={<NewBook />} />
          <Route path='/updateBook/:bookId' element={<UpdateBook />} />
          <Route path='/viewBook/:bookId' element={<BookDetails />} />
        </Route>
        <Route path='*' element={<Forbidden />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
