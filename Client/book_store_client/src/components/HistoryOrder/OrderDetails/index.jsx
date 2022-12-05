import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const OrderDetails = ({ orderItem }) => {
  const unitCurrency = Intl.NumberFormat('en-US');

  let [orderStatus, setOrderStatus] = useState(
    orderItem.listOderItem[0].status
  );

  const handleCancelOrder = () => {
    axios
      .get(`http://localhost:8082/api/v1/order/cancel/${orderItem.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(() => {
        alert('Cancel order success');
        setOrderStatus('Cancel');
      })
      .catch(() => {
        alert('False to cancel order');
      });
  };

  return (
    <div className='row p-4 mb-5' style={{ boxShadow: '0.5px 0.5px 2px 1px' }}>
      <p className='mb-3 font-weight-bold'>Date order: {orderItem.dateOrder}</p>
      {orderItem.listOderItem.map((order, index) => (
        <div className='container'>
          <div className='row mb-2'>
            <div className='col-1'>
              <img
                src={`http://localhost:8082/images/${order.book.bookImages[0].name}`}
                alt='book'
                width='50px'
                height='50px'
              />
            </div>
            <div className='col-3'>
              <p
                style={{
                  marginBottom: '2px',
                  textTransform: 'capitalize',
                  color: '#2B3A55',
                }}
              >
                <span className='font-weight-bold'>Title:</span>{' '}
                {order.book.title}
              </p>
              <p
                style={{
                  marginBottom: '2px',
                  textTransform: 'capitalize',
                  color: '#344D67',
                }}
              >
                <span className='font-weight-bold'>Author:</span>{' '}
                {order.book.author}
              </p>
            </div>
            <div className='col-3'>
              <p
                style={{
                  marginBottom: '2px',
                  textTransform: 'capitalize',
                  color: '#344D67',
                }}
              >
                <span className='font-weight-bold'>Category:</span>{' '}
                {order.book.typeBook}
              </p>
              <p
                style={{
                  marginBottom: '2px',
                  textTransform: 'capitalize',
                  color: '#344D67',
                }}
              >
                <span className='font-weight-bold'>Date Release:</span>{' '}
                {order.book.dateRelease}
              </p>
            </div>
            <div className='col-3'>
              <p
                style={{
                  marginBottom: '2px',
                  textTransform: 'capitalize',
                  color: '#344D67',
                }}
              >
                <span className='font-weight-bold'>Quantity:</span>{' '}
                {order.quantity}
              </p>
              <p
                style={{
                  marginBottom: '2px',
                  textTransform: 'capitalize',
                  color: '#344D67',
                }}
              >
                <span className='font-weight-bold'>total:</span>{' '}
                {unitCurrency.format(order.book.price * order.quantity)} VND
              </p>
            </div>
            <div>
              <Link
                to={`/viewBook/${order.book.id}`}
                className='mt-2 btn btn-outline-info'
                style={{
                  marginBottom: '2px',
                  textTransform: 'capitalize',
                }}
              >
                View Details Book
              </Link>
            </div>
          </div>
          {index === orderItem.listOderItem.length - 1 || <hr />}
        </div>
      ))}

      <div className='container'>
        <hr style={{ borderTop: '3px dashed #393E46' }} />
        <div className='row mt-2'>
          <div className='col-6'>
            <p
              style={{
                marginBottom: '2px',
                textTransform: 'capitalize',
                color: '#344D67',
              }}
            >
              <span className='font-weight-bold font-italic'>
                delivery address:
              </span>{' '}
              {orderItem.address}
            </p>
            <p
              style={{
                marginBottom: '2px',
                textTransform: 'capitalize',
                color: '#344D67',
              }}
            >
              <span className='font-weight-bold font-italic'>
                phone number:
              </span>{' '}
              {orderItem.phoneNumber}
            </p>
            <p
              style={{
                marginBottom: '2px',
                textTransform: 'capitalize',
                color: '#344D67',
              }}
            >
              <span className='font-weight-bold font-italic'>
                Recipient's name:
              </span>{' '}
              {orderItem.fullNameUserOrder}
            </p>
          </div>
          <div>
            <h5 style={{ textTransform: 'capitalize' }}>
              Total invoice:{' '}
              <span style={{ color: '#1D1CE5' }}>
                {unitCurrency.format(
                  orderItem.listOderItem
                    .map((order) => order.quantity * order.book.price)
                    .reduce((acc, current) => acc + current)
                )}{' '}
                VND
              </span>
            </h5>
            <h5 style={{ textTransform: 'capitalize' }}>
              Status Order:{' '}
              {orderStatus === 'pending' ? (
                <span className='font-italic' style={{ color: '#FFBF00' }}>
                  {orderStatus}
                </span>
              ) : orderStatus === 'Cancel' ? (
                <span className='font-italic' style={{ color: '#E14D2A' }}>
                  {orderStatus}
                </span>
              ) : (
                <span className='font-italic' style={{ color: '#68B984' }}>
                  {orderStatus}
                </span>
              )}
            </h5>
            {orderStatus === 'pending' ? (
              <button
                type='button'
                className='btn btn-outline-danger mt-2'
                onClick={handleCancelOrder}
              >
                Cancel Order
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
