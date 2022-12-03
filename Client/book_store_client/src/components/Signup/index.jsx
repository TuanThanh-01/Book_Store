import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { SpinnerLoading } from '../SpinnerLoading/index';
import axios from 'axios';
import { useState } from 'react';

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const sendDataSignup = async (data) => {
    try {
      const response = await axios.post(
        'http://localhost:8082/api/v1/auth/signup',
        data
      );
      alert(response.data.message);
      reset();
      navigate('/login');
    } catch (error) {
      setIsLoading(false);
      alert(error.response.data.message);
    }
  };

  const onSubmit = (values) => {
    setIsLoading(true);
    sendDataSignup(values);
  };

  if (isLoading) {
    return <SpinnerLoading />;
  }

  return (
    <section className='p-2' style={{ backgroundColor: 'white' }}>
      <div className='container h-100'>
        <div className='row d-flex justify-content-center align-items-center h-100'>
          <div className='col-lg-12 col-xl-11'>
            <div className='card text-black' style={{ borderRadius: '25px' }}>
              <div className='card-body p-md-5'>
                <div className='row justify-content-center'>
                  <div className='col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1'>
                    <p className='text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4'>
                      Sign up
                    </p>

                    <form className='mx-1 mx-md-4'>
                      <div className='d-flex flex-row align-items-center mb-4'>
                        <div
                          className='form-outline flex-fill mb-0'
                          style={{ width: '16.25rem' }}
                        >
                          <label className='form-label' htmlFor='firstName'>
                            First Name
                          </label>
                          <input
                            type='text'
                            id='firstName'
                            className='form-control'
                            {...register('firstName', {
                              required: 'please enter your first name',
                            })}
                          />
                          <small style={{ color: 'red' }}>
                            {errors.firstName?.message}
                          </small>
                        </div>
                      </div>

                      <div className='d-flex flex-row align-items-center mb-4'>
                        <div
                          className='form-outline flex-fill mb-0'
                          style={{ width: '16.25rem' }}
                        >
                          <label className='form-label' htmlFor='lastName'>
                            Last Name
                          </label>
                          <input
                            type='text'
                            id='lastName'
                            className='form-control'
                            {...register('lastName', {
                              required: 'please enter your last name',
                            })}
                          />
                          <small style={{ color: 'red' }}>
                            {errors.lastName?.message}
                          </small>
                        </div>
                      </div>

                      <div className='d-flex flex-row align-items-center mb-4'>
                        <div
                          className='form-outline flex-fill mb-0'
                          style={{ width: '16.25rem' }}
                        >
                          <label className='form-label' htmlFor='email'>
                            Email
                          </label>
                          <input
                            type='email'
                            id='email'
                            className='form-control'
                            {...register('email', {
                              required: 'please enter email',
                              pattern: {
                                value:
                                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'invalid email',
                              },
                            })}
                          />
                          <small style={{ color: 'red' }}>
                            {errors.email?.message}
                          </small>
                        </div>
                      </div>

                      <div className='d-flex flex-row align-items-center mb-4'>
                        <div
                          className='form-outline flex-fill mb-0'
                          style={{ width: '16.25rem' }}
                        >
                          <label className='form-label' htmlFor='password'>
                            Password
                          </label>
                          <input
                            type='password'
                            id='password'
                            className='form-control'
                            {...register('password', {
                              required: 'please enter password',
                              minLength: {
                                value: 6,
                                message: 'password at least 6 characters',
                              },
                            })}
                          />
                          <small style={{ color: 'red' }}>
                            {errors.password?.message}
                          </small>
                        </div>
                      </div>

                      <div
                        className='d-flex justify-content-center mx-4 mb-3 mb-lg-4'
                        style={{ paddingRight: '80px' }}
                      >
                        <button
                          type='submit'
                          className='btn btn-primary btn-lg'
                          onClick={handleSubmit(onSubmit)}
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className='col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2'>
                    <img
                      src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp'
                      className='img-fluid'
                      alt='Sample'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
