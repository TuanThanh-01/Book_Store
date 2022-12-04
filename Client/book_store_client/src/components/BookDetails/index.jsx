import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SpinnerLoading } from '../SpinnerLoading';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Rating from './Rating/index';
import PaginationRating from './PaginationRating/index';
import axios from 'axios';
import './bookDetailsStyle.css';

let bookOrigin;

const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [averageStar, setAverageStar] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [ratingStar, setRatingStar] = useState(0);
  const [hover, setHover] = useState(0);
  const [ratingsPerPage] = useState(3);
  const navigate = useNavigate();

  const getBookData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/book/${bookId}`
      );
      setBook(response.data);
      bookOrigin = response.data;
      const ratingArray = [];
      for (const property in response.data.ratings) {
        ratingArray.push(+response.data.ratings[property].star);
      }
      setAverageStar(
        Math.ceil(
          ratingArray.reduce((acc, item) => acc + item) / ratingArray.length
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const filterRating = (starFilter) => {
    const newRatings = bookOrigin.ratings.filter(
      (rating) => rating.star === starFilter
    );
    const newBook = { ...book, ratings: newRatings };
    setBook(newBook);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const messageSuccessReview = document.querySelector('#alertSuccess');
    const message = document.querySelector('#review').value;
    const data = {
      star: ratingStar,
      message: message,
      userNameRating: localStorage.getItem('userName'),
    };
    axios
      .post(`http://localhost:8082/api/v1/book/${bookId}/rating`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        messageSuccessReview.style.display = '';
      })
      .catch(() => {
        alert('Cannot Review, Try again');
      });
  };

  const handleAddToCart = () => {
    const data = { bookId };
    axios
      .post(
        `http://localhost:8082/api/v1/cart/${localStorage.getItem(
          'userId'
        )}/addItem`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((res) => {
        alert('Add Item To Cart Success!!!');
        localStorage.setItem(`book ${bookId}`, 'added');
        navigate('/cart');
      })
      .catch(() => {
        alert('Cannot Add Item To Cart, Try Again');
      });
  };

  useEffect(() => {
    getBookData();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  const indexOfLastRating = currentPage * ratingsPerPage;
  const indexOfFirstRating = indexOfLastRating - ratingsPerPage;
  const currentRatings = book.ratings.slice(
    indexOfFirstRating,
    indexOfLastRating
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <article className='p-3' style={{ backgroundColor: '#EFF5F5' }}>
      <div className='container'>
        <div className='card'>
          <div className='container-fliud'>
            <div className='wrapper row'>
              <div className='preview col-md-6'>
                <div className='preview-pic tab-content'>
                  {book.bookImages.map((image, index) =>
                    index === 0 ? (
                      <div className='tab-pane active' id={`pic-${index}`}>
                        <img
                          src={`http://localhost:8082/images/${image.name}`}
                          alt='book pic'
                        />
                      </div>
                    ) : (
                      <div className='tab-pane' id={`pic-${index}`}>
                        <img
                          src={`http://localhost:8082/images/${image.name}`}
                          alt='book pic'
                        />
                      </div>
                    )
                  )}
                </div>
                <ul className='preview-thumbnail nav nav-tabs d-flex justify-content-center'>
                  {book.bookImages.map((image, index) =>
                    index === 1 ? (
                      <li className='active'>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a data-target={`#pic-${index}`} data-toggle='tab'>
                          <img
                            src={`http://localhost:8082/images/${image.name}`}
                            alt='book pic'
                          />
                        </a>
                      </li>
                    ) : (
                      <li>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a data-target={`#pic-${index}`} data-toggle='tab'>
                          <img
                            src={`http://localhost:8082/images/${image.name}`}
                            alt='book pic'
                          />
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className='details col-md-6'>
                <h3 className='product-title' style={{ marginBottom: '3px' }}>
                  {book.title}
                </h3>
                <h4 className=''>Author: {book.author}</h4>
                <div className='rating'>
                  <div className='stars'>
                    {[...Array(5).keys()].map((current) =>
                      current <= averageStar - 1 ? (
                        <span className='fa fa-star checked ml-1'></span>
                      ) : (
                        <span className='fa fa-star ml-1'></span>
                      )
                    )}
                  </div>
                  <span className='review-no'>
                    {book.ratings.length} reviews
                  </span>
                </div>
                <p className='product-description'>{book.description}</p>
                <h5 className='price'>
                  price: <span>{book.price} VND</span>
                </h5>
                <div className='font-weight-bold'>
                  <p>
                    Total Page:{' '}
                    <span className='font-weight-normal'>{book.totalPage}</span>
                  </p>
                  <p>
                    Date Release:{' '}
                    <span className='font-weight-normal'>
                      {book.dateRelease}
                    </span>{' '}
                  </p>
                  <p>
                    Category:{' '}
                    <span className='font-weight-normal'>{book.typeBook}</span>
                  </p>
                </div>
                <div className='text-center'>
                  {localStorage.getItem('token') ? (
                    localStorage.getItem(`book ${bookId}`) ? (
                      <button
                        className='btn btn-secondary'
                        onClick={handleAddToCart}
                        disabled={true}
                      >
                        The item is already in the cart
                      </button>
                    ) : (
                      <button
                        className='btn btn-outline-info'
                        onClick={handleAddToCart}
                      >
                        <AiOutlineShoppingCart /> Add To Cart
                      </button>
                    )
                  ) : (
                    <Link className='btn btn-outline-info' to='/login'>
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='card'>
          <h3>Customer Reviews</h3>
          <div className='row'>
            <div className='col-4'>
              <p>
                <span className='font-weight-bold' style={{ color: '#ee4d2d' }}>
                  {averageStar}
                </span>{' '}
                out of{' '}
                <span className='font-weight-bold' style={{ color: '#ee4d2d' }}>
                  5
                </span>
              </p>
              <div>
                {[...Array(5).keys()].map((current) =>
                  current <= averageStar - 1 ? (
                    <span className='fa fa-star checked ml-1'></span>
                  ) : (
                    <span className='fa fa-star ml-1'></span>
                  )
                )}
              </div>
            </div>
            <div className='col-8'>
              <button
                className='btn btn-outline-info d-inline mr-2'
                style={{ width: '100px' }}
                onClick={() => setBook(bookOrigin)}
              >
                All
              </button>
              <button
                className='btn btn-outline-info d-inline mr-2'
                style={{ width: '100px' }}
                onClick={() => {
                  filterRating(5);
                }}
              >
                5 star
              </button>
              <button
                className='btn btn-outline-info d-inline mr-2'
                style={{ width: '100px' }}
                onClick={() => {
                  filterRating(4);
                }}
              >
                4 star
              </button>
              <button
                className='btn btn-outline-info d-inline mr-2'
                style={{ width: '100px' }}
                onClick={() => {
                  filterRating(3);
                }}
              >
                3 star
              </button>
              <button
                className='btn btn-outline-info d-inline mr-2'
                style={{ width: '100px' }}
                onClick={() => {
                  filterRating(2);
                }}
              >
                2 star
              </button>
              <button
                className='btn btn-outline-info d-inline'
                style={{ width: '100px' }}
                onClick={() => {
                  filterRating(1);
                }}
              >
                1 star
              </button>
            </div>
          </div>
          <hr style={{ borderTop: '1px solid' }} />
          {currentRatings.map((rating, index) => (
            <Rating rating={rating} key={index} />
          ))}
          <PaginationRating
            ratingsPerPage={ratingsPerPage}
            totalRatings={book.ratings.length}
            paginate={paginate}
          />
        </div>
      </div>
      {localStorage.getItem('token') && (
        <div className='container'>
          <p
            id='alertSuccess'
            className='text-center bg-success'
            style={{ color: 'white', display: 'none' }}
          >
            Thank you for your review, we will consider your review to improve
            our service better
          </p>
          <h3>Review</h3>
          <form>
            <small class='form-text text-muted mb-2 font-italic font-weight-bold'>
              Reviews in here, maximum 100 characters
            </small>
            <textarea
              id='review'
              className='p-1'
              style={{
                width: '31.25rem',
                height: '6.25rem',
                resize: 'none',
                borderRadius: '0.625rem',
              }}
              maxLength='100'
            />
            <div className='mb-2'>
              {[...Array(5).keys()].map((_, index) => {
                index += 1;
                return (
                  <span
                    className={
                      index <= (hover || ratingStar)
                        ? 'fa fa-star checked ml-1'
                        : 'fa fa-star ml-1'
                    }
                    key={index}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setRatingStar(index)}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(ratingStar)}
                  ></span>
                );
              })}
            </div>
            <button
              type='submit'
              class='btn btn-outline-info d-block'
              onClick={handleSubmitReview}
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </article>
  );
};

export default BookDetails;
