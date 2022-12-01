import { Link, useNavigate } from 'react-router-dom';
import {
  AiFillFacebook,
  AiOutlineTwitter,
  AiFillLinkedin,
} from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { SpinnerLoading } from '../SpinnerLoading/index';
import axios from 'axios';
import { useState } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const sendDataLogin = async (data) => {
    try {
      const response = await axios.post(
        'http://localhost:8082/api/v1/auth/login',
        data
      );

      localStorage.setItem('userEmail', response.data.email);
      localStorage.setItem('role', response.data.roles[0]);
      localStorage.setItem(
        'userName',
        `${response.data.firstName} ${response.data.lastName}`
      );
      localStorage.setItem('token', response.data.token);
      reset();
      navigate('/');
    } catch (error) {
      setIsLoading(false);
      alert('wrong email or password');
    }
  };

  if (isLoading) {
    return <SpinnerLoading />;
  }

  const onSubmit = (values) => {
    setIsLoading(true);
    sendDataLogin(values);
  };

  return (
    <article>
      <section className='vh-100 mt-2'>
        <div className='container-fluid h-custom'>
          <div className='row d-flex justify-content-center align-items-center h-100'>
            <div className='col-md-9 col-lg-6 col-xl-5'>
              <img
                src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp'
                className='img-fluid'
                alt='sample'
              />
            </div>
            <div className='col-md-8 col-lg-6 col-xl-4 offset-xl-1'>
              <form>
                <div className='d-flex flex-row align-items-center justify-content-center justify-content-lg-start'>
                  <p className='lead fw-normal mb-0 me-3 mr-2'>Login with</p>
                  <button
                    type='button'
                    className='btn mx-1 btn-floating rounded-circle btn-small'
                  >
                    <AiFillFacebook />
                  </button>

                  <button
                    type='button'
                    className='btn btn-floating mx-1 rounded-circle'
                  >
                    <AiOutlineTwitter />
                  </button>

                  <button
                    type='button'
                    className='btn  btn-floating mx-1 rounded-circle'
                  >
                    <AiFillLinkedin />
                  </button>
                </div>

                <div className='divider d-flex align-items-center my-4'>
                  <p className='text-center fw-bold mx-3 mb-0'>Or</p>
                </div>

                <div className='form-outline mb-4'>
                  <label className='form-label' htmlFor='emailInput'>
                    Email address
                  </label>
                  <input
                    type='email'
                    id='emailInput'
                    className='form-control form-control-lg'
                    {...register('email', {
                      required: 'please enter email',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'invalid email',
                      },
                    })}
                  />
                  <small style={{ color: 'red' }}>
                    {errors.email?.message}
                  </small>
                </div>

                <div className='form-outline mb-3'>
                  <label className='form-label' htmlFor='passwordInput'>
                    Password
                  </label>
                  <input
                    type='password'
                    id='passwordInput'
                    className='form-control form-control-lg'
                    {...register('password', {
                      required: 'please enter password',
                    })}
                  />
                  <small style={{ color: 'red' }}>
                    {errors.password?.message}
                  </small>
                </div>

                <div className='text-center text-lg-start mt-4 pt-2'>
                  <button
                    type='submit'
                    className='btn btn-primary btn-lg'
                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                    onClick={handleSubmit(onSubmit)}
                  >
                    Login
                  </button>
                  <p className='fw-bold mt-2 pt-1 mb-4'>
                    Don't have an account?{' '}
                    <Link to='/signup' className='link-danger'>
                      Register
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
};

export default Login;
