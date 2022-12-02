import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { SpinnerLoading } from '../../../SpinnerLoading';
import axios from 'axios';
import './style.css';
import { useState } from 'react';

const NewBook = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

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
                      {...register('dateRelease', {
                        required: 'choose date release',
                      })}
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
                      id='totalPage'
                      min='10000'
                      {...register('price', {
                        required: 'enter the price',
                      })}
                    />
                    <small style={{ color: 'red' }}>
                      {errors.price?.message}
                    </small>
                  </div>
                </div>

                <div className='text-center text-lg-start mt-4 pt-2'>
                  <button
                    type='submit'
                    className='btn btn-lg'
                    style={{
                      paddingLeft: '2.5rem',
                      paddingRight: '2.5rem',
                      backgroundColor: '#3c4048',
                      color: 'white',
                    }}
                    onClick={handleSubmit(submitForm)}
                  >
                    Save Book
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewBook;
