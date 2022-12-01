import { Link } from 'react-router-dom';

const Book = ({ book }) => {
  const handleDeleteBook = (e) => {
    const confirmDelte = window.confirm(
      'Are you sure you want to delte this book?'
    );
    if (confirmDelte) {
    }
  };

  return (
    <div className='row p-4 mb-5' style={{ boxShadow: '0.5px 0.5px 2px 1px' }}>
      <div className='col'>
        <img
          src={`http://localhost:8082/images/${book.bookImages[0].name}`}
          alt='book'
          width='100px'
          height='150px'
        />
      </div>
      <div className='col-6'>
        <h4
          className='font-weight-bold mb-2'
          style={{
            marginBottom: '2px',
            textTransform: 'capitalize',
            color: '#2B3A55',
          }}
        >
          Title: {book.title}
        </h4>
        <h5
          style={{
            marginBottom: '2px',
            textTransform: 'capitalize',
            color: '#344D67',
          }}
        >
          Author: {book.author}
        </h5>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe nihil
          dolor iste amet, incidunt maxime, delectus expedita velit laboriosam
          eaque esse, doloremque minima magnam et. Commodi officiis quas
          delectus consequatur.
        </p>
      </div>
      <div className='col justify-content-center align-items-center d-flex'>
        <Link to={`/updateBook/${book.id}`} className='btn btn-outline-info'>
          Update
        </Link>
        <button
          className='ml-2 btn btn-outline-danger'
          onClick={handleDeleteBook}
          id={book.id}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Book;
