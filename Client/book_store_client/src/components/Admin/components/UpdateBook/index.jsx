import { useState, useEffect } from 'react';
import axios from 'axios';
import { SpinnerLoading } from '../../../SpinnerLoading';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const UpdateBook = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [book, setBook] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [disabled, setDisabled] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const getBookData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/book/${bookId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setBook(response.data);
      console.log(book);
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

  const submitForm = (values) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('author', values.author);
    formData.append('description', values.description);
    formData.append(
      'dateRelease',
      values.dateRelease.split('-').reverse().join('/')
    );
    formData.append('totalPage', values.totalPage);
    formData.append('typeBook', values.typeBook);
    formData.append('price', values.price);

    let imageArray = [];

    for (const property in values.images) {
      imageArray.push(values.images[property]);
    }

    imageArray.slice(0, -2).forEach((image) => {
      formData.append('images', image);
    });

    setIsLoading(true);

    axios
      .post('http://localhost:8082/api/v1/admin/book/save', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        alert('Save book successfully!!!');
        reset();
        navigate('/manageBook');
      })
      .catch((err) => {
        setIsLoading(false);
        alert(err.response.data);
      });
  };

  const handlePreviewImage = (e) => {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      document.querySelector('.preview').innerHTML = '';

      fileReader.onload = function () {
        const url = fileReader.result;
        document
          .querySelector('.preview')
          .insertAdjacentHTML(
            'beforeend',
            `<img src="${url}" alt="${file.name}" class="preview-img"/>`
          );
      };
    }
  };

  if (isLoading) {
    return <SpinnerLoading />;
  }

  return (
    <article className='p-3' style={{ backgroundColor: '#EFF5F5' }}>
      <div className='container-fluid'>
        <div className='row mt-3'>
          <div className='col' id='columnFirst'>
            {disabled ? (
              <div
                id='carouselExampleControls'
                class='carousel slide'
                data-ride='carousel'
              >
                <div class='carousel-inner'>
                  {/* {book.bookImages.forEach((image) => console.log(image.name))} */}
                  {book.bookImages.map((image, index) =>
                    index === 1 ? (
                      <div class='carousel-item active'>
                        <img
                          class='d-block w-100'
                          src={`http://localhost:8082/images/${image.name}`}
                          alt='First slide'
                        />
                      </div>
                    ) : (
                      <div class='carousel-item'>
                        <img
                          class='d-block w-100'
                          src={`http://localhost:8082/images/${image.name}`}
                          alt='First slide'
                        />
                      </div>
                    )
                  )}
                  {/* <div class='carousel-item active'>
                    <img class='d-block w-100' src='...' alt='First slide' />
                  </div>
                  <div class='carousel-item'>
                    <img class='d-block w-100' src='...' alt='Second slide' />
                  </div>
                  <div class='carousel-item'>
                    <img class='d-block w-100' src='...' alt='Third slide' />
                  </div> */}
                </div>
                <a
                  class='carousel-control-prev'
                  href='#carouselExampleControls'
                  role='button'
                  data-slide='prev'
                >
                  <span
                    class='carousel-control-prev-icon'
                    aria-hidden='true'
                  ></span>
                  <span class='sr-only'>Previous</span>
                </a>
                <a
                  class='carousel-control-next'
                  href='#carouselExampleControls'
                  role='button'
                  data-slide='next'
                >
                  <span
                    class='carousel-control-next-icon'
                    aria-hidden='true'
                  ></span>
                  <span class='sr-only'>Next</span>
                </a>
              </div>
            ) : (
              <div className='container'>
                <h3 className='mb-5 text-center'>Choose Images</h3>
                <input
                  id='uploadFile'
                  type='file'
                  className='form-control mb-4'
                  style={{ width: '500px' }}
                  multiple
                  accept='image/*'
                  {...register('images', {
                    required: 'choose images book',
                  })}
                  onChange={handlePreviewImage}
                />
                <small id='imageFile' style={{ color: 'red' }}>
                  {errors.images?.message}
                </small>
                <div className='preview'></div>
              </div>
            )}
          </div>

          <div className='col' id='columnSecond'>
            <h3 className='text-center mb-3'>Book Infomation</h3>
            <div
              className='container p-3'
              style={{
                boxShadow: '0.5px 0.5px 2px 1px',
                backgroundColor: 'white',
              }}
            >
              <form id='bookSaveForm'>
                <div className='form-row'>
                  <div className='form-group col-md-6'>
                    <label htmlFor='title' className='font-weight-bold'>
                      Title
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='title'
                      {...register('title', {
                        required: 'enter title book',
                      })}
                      disabled={disabled}
                      defaultValue={book.title}
                    />
                    <small style={{ color: 'red' }}>
                      {errors.title?.message}
                    </small>
                  </div>
                  <div className='form-group col-md-6'>
                    <label htmlFor='author' className='font-weight-bold'>
                      Author
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='author'
                      {...register('author', {
                        required: 'enter author name',
                      })}
                      disabled={disabled}
                      defaultValue={book.author}
                    />
                    <small style={{ color: 'red' }}>
                      {errors.author?.message}
                    </small>
                  </div>
                </div>

                <div className='form-group'>
                  <label htmlFor='description' className='font-weight-bold'>
                    Description
                  </label>

                  <textarea
                    id='description'
                    className='form-control'
                    rows='4'
                    style={{ resize: 'none' }}
                    {...register('description', {
                      required: 'enter the description',
                    })}
                    disabled={disabled}
                    defaultValue={book.description}
                  ></textarea>
                  <small style={{ color: 'red' }}>
                    {errors.description?.message}
                  </small>
                </div>

                <div className='form-row'>
                  <div className='form-group col-md-6'>
                    <label htmlFor='dateRelease' className='font-weight-bold'>
                      Date Release
                    </label>
                    <input
                      type='date'
                      className='form-control'
                      id='dateRelease'
                      disabled={disabled}
                      {...register('dateRelease', {
                        required: 'choose date release',
                      })}
                      defaultValue={new Date(
                        book.dateRelease.split('/').reverse().join('-')
                      )
                        .toISOString()
                        .substring(0, 10)}
                    />
                    <small style={{ color: 'red' }}>
                      {errors.dateRelease?.message}
                    </small>
                  </div>
                  <div className='form-group col-md-6'>
                    <label htmlFor='totalPage' className='font-weight-bold'>
                      Total Page
                    </label>
                    <input
                      type='number'
                      className='form-control'
                      id='totalPage'
                      min='20'
                      {...register('totalPage', {
                        required: 'enter total page book',
                      })}
                      disabled={disabled}
                      defaultValue={book.totalPage}
                    />
                    <small style={{ color: 'red' }}>
                      {errors.totalPage?.message}
                    </small>
                  </div>
                </div>

                <div className='form-row'>
                  <div className='form-group col-md-6'>
                    <label htmlFor='typeBook' className='font-weight-bold'>
                      Type Book
                    </label>
                    <select
                      id='typeBook'
                      className='form-control'
                      {...register('typeBook', {
                        required: 'choose the type book',
                      })}
                      disabled={disabled}
                      defaultValue={book.typeBook}
                    >
                      <option selected>Data</option>
                      <option>DevOps</option>
                      <option>Programming Language</option>
                      <option>Machine Learning</option>
                    </select>
                    <small style={{ color: 'red' }}>
                      {errors.typeBook?.message}
                    </small>
                  </div>
                  <div className='form-group col-md-6'>
                    <label htmlFor='totalPage' className='font-weight-bold'>
                      Price
                    </label>
                    <input
                      type='number'
                      className='form-control'
                      id='price'
                      min='10000'
                      {...register('price', {
                        required: 'enter the price',
                      })}
                      disabled={disabled}
                      defaultValue={book.price}
                    />
                    <small style={{ color: 'red' }}>
                      {errors.price?.message}
                    </small>
                  </div>
                </div>

                <div className='text-center'>
                  <div className='d-inline-block text-center text-lg-start mt-4 pt-2 mr-5'>
                    <button
                      id='editButton'
                      type='button'
                      className='btn btn-outline-info'
                      style={{
                        paddingLeft: '2.5rem',
                        paddingRight: '2.5rem',
                      }}
                      onClick={() => {
                        setDisabled(!disabled);
                        setValue(
                          'title',
                          document.querySelector('#title').value,
                          { shouldValidate: true }
                        );
                        setValue(
                          'author',
                          document.querySelector('#author').value,
                          { shouldValidate: true }
                        );
                        setValue(
                          'description',
                          document.querySelector('#description').value,
                          { shouldValidate: true }
                        );
                        setValue(
                          'dateRelease',
                          document.querySelector('#dateRelease').value,
                          { shouldValidate: true }
                        );
                        setValue(
                          'totalPage',
                          document.querySelector('#totalPage').value,
                          { shouldValidate: true }
                        );
                        setValue(
                          'typeBook',
                          document.querySelector('#typeBook').value,
                          { shouldValidate: true }
                        );
                        setValue(
                          'price',
                          document.querySelector('#price').value,
                          { shouldValidate: true }
                        );
                      }}
                    >
                      Edit Book
                    </button>
                  </div>

                  <div className='d-inline-block text-center text-lg-start mt-4 pt-2'>
                    <button
                      type='submit'
                      className='btn btn-outline-info'
                      style={{
                        paddingLeft: '2.5rem',
                        paddingRight: '2.5rem',
                      }}
                      onClick={handleSubmit(submitForm)}
                    >
                      Save Book
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default UpdateBook;
