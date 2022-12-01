import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SpinnerLoading } from '../SpinnerLoading/index';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import Book from './components/Book/index';
import Pagination from './components/Pagination/index';
import axios from 'axios';

const url = 'http://localhost:8082/api/v1/books';
let books;

const HomePage = () => {
  const [listBook, setListBook] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [keyWord, setKeyWord] = useState('');
  const [booksPerPage] = useState(3);

  const getListBook = async () => {
    try {
      const response = await axios.get(url);
      setListBook(response.data);
      books = response.data;
      setIsLoading(false);
    } catch (error) {
      alert('please reload again');
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyWord) {
      setListBook(listBook.filter((book) => book.title.includes(keyWord)));
    } else {
      setListBook(books);
    }
    setKeyWord('');
    console.log(keyWord);
  };

  useEffect(() => {
    getListBook();
  }, []);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  // Get current posts
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = listBook.slice(indexOfFirstBook, indexOfLastBook);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <article className='mb-3'>
      <h1 className='text-center mb-4' style={{ color: '#344D67' }}>
        Manage Book
      </h1>
      <div className='container'>
        <div className='text-right'>
          <Link
            className='btn btn-outline-success my-2 my-sm-0 btn-lg '
            to='/newBook'
          >
            Add New Book <AiOutlinePlusCircle className='pb-1' />
          </Link>
        </div>
        <div>
          <form className='form-inline' onSubmit={handleSubmit}>
            <input
              className='col-4 mr-2 rounded'
              placeholder='Enter title'
              value={keyWord}
              onChange={(e) => setKeyWord(e.target.value)}
            ></input>
            <button
              className='btn btn-outline-primary my-2 my-sm-0 btn-sm'
              type='submit'
            >
              Search
            </button>
          </form>
        </div>
        <div className='mt-2'>
          <p className='font-weight-bold'>
            Number of results: ({listBook.length})
          </p>
        </div>

        {currentBooks.map((book) => (
          <Book book={book} key={book.id} />
        ))}

        <div className='justify-content-center align-items-center d-flex'>
          <Pagination
            booksPerPage={booksPerPage}
            totalBooks={listBook.length}
            paginate={paginate}
          />
        </div>
      </div>
    </article>
  );
};

export default HomePage;
