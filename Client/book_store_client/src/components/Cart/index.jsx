import { useEffect } from 'react';
import { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { SpinnerLoading } from '../SpinnerLoading';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState({});

  const getCartData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/cart/${localStorage.getItem('userId')}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setCart(response.data.listCartItem);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCartData();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  return (
    <article className='p-3' style={{ backgroundColor: '#EFF5F5' }}>
      <div
        className='container p-4'
        style={{
          boxShadow: '0.5px 0.5px 2px 1px',
          backgroundColor: 'white',
          borderRadius: '0.625rem',
        }}
      >
        <div className='row'>
          <div className='col-12'>
            <div className='table-responsive'>
              <table className='table table-striped'>
                <thead>
                  <tr>
                    <th scope='col'> </th>
                    <th scope='col'>Product</th>
                    <th scope='col'>Category</th>
                    <th scope='col' className='text-center'>
                      Quantity
                    </th>
                    <th scope='col' className='text-right'>
                      Price
                    </th>
                    <th scope='col' className='text-right'>
                      <button className='btn btn-outline-danger'>
                        Clear Cart
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((cartItem, index) => (
                    <tr key={index}>
                      <td>
                        <img
                          src={`http://localhost:8082/images/${cartItem.book.bookImages[0].name}`}
                          alt=''
                          width='50px'
                          height='50px'
                        />{' '}
                      </td>
                      <td>{cartItem.book.title}</td>
                      <td>{cartItem.book.typeBook}</td>
                      <td>
                        <input
                          className='form-control'
                          id={`quantityItem${index}`}
                          type='number'
                          min={1}
                          defaultValue={1}
                          onChange={() => {
                            const quantity = document.querySelector(
                              `#quantityItem${index}`
                            ).value;
                            document.querySelector(
                              `#cart${index}`
                            ).innerText = `${
                              cartItem.book.price * quantity
                            } VND`;
                          }}
                        />
                      </td>
                      <td className='text-right' id={`cart${index}`}>
                        {cartItem.book.price} VND
                      </td>
                      <td
                        className='text-center'
                        style={{ paddingLeft: '3.75rem' }}
                      >
                        <button className='btn btn-sm btn-danger'>
                          <i className='fa fa-trash'></i>{' '}
                        </button>{' '}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>Sub-Total</td>
                    <td className='text-right'>255,90 €</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>Shipping</td>
                    <td className='text-right'>20000VND</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <strong>Total</strong>
                    </td>
                    <td className='text-right'>
                      <strong>346,90 €</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className='col mb-2'>
            <div className='row'>
              <div className='col-sm-12 col-md-6'>
                <Link to='/' className='btn btn-block btn-outline-info'>
                  Continue Shopping
                </Link>
              </div>
              <div className='col-sm-12 col-md-6 text-right'>
                <button className='btn btn-block btn-outline-success text-uppercase'>
                  Check out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Cart;
