/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SpinnerLoading } from '../SpinnerLoading';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Rating from './Rating/index';
import PaginationRating from './PaginationRating/index';
import axios from 'axios';
import './style.css';

const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [averageStar, setAverageStar] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [ratingsPerPage] = useState(3);

  const getBookData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/book/${bookId}`
      );
      setBook(response.data);
      // const ratingArray = [];
      // for (const property in book.ratings) {
      //   ratingArray.push(+book.ratings[property].star);
      // }
      // console.log(ratingArray);
      // setAverageStar(
      //   Math.ceil(
      //     ratingArray.reduce((acc, item) => acc + item) / ratingArray.length
      //   )
      // );

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
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
                        <a data-target={`#pic-${index}`} data-toggle='tab'>
                          <img
                            src={`http://localhost:8082/images/${image.name}`}
                            alt='book pic'
                          />
                        </a>
                      </li>
                    ) : (
                      <li>
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
                        <span className='fa fa-star checked'></span>
                      ) : (
                        <span className='fa fa-star'></span>
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
                    <button className='btn btn-outline-info'>
                      <AiOutlineShoppingCart /> Add To Cart
                    </button>
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
                    <span className='fa fa-star checked'></span>
                  ) : (
                    <span className='fa fa-star'></span>
                  )
                )}
              </div>
            </div>
            <div className='col-8'>
              <button
                className='btn btn-outline-info d-inline mr-2'
                style={{ width: '100px' }}
              >
                All
              </button>
              <button
                className='btn btn-outline-info d-inline mr-2'
                style={{ width: '100px' }}
              >
                5 star
              </button>
              <button
                className='btn btn-outline-info d-inline mr-2'
                style={{ width: '100px' }}
              >
                4 star
              </button>
              <button
                className='btn btn-outline-info d-inline mr-2'
                style={{ width: '100px' }}
              >
                3 star
              </button>
              <button
                className='btn btn-outline-info d-inline mr-2'
                style={{ width: '100px' }}
              >
                2 star
              </button>
              <button
                className='btn btn-outline-info d-inline'
                style={{ width: '100px' }}
              >
                1 star
              </button>
            </div>
          </div>
          <hr style={{ borderTop: '1px solid' }} />
          {currentRatings.map((rating) => (
            <Rating rating={rating} key={rating.id} />
          ))}
          <PaginationRating
            ratingsPerPage={ratingsPerPage}
            totalRatings={book.ratings.length}
            paginate={paginate}
          />
        </div>
      </div>
    </article>
  );
};

export default BookDetails;
