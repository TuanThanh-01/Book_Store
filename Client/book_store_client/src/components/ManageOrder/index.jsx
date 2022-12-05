import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { SpinnerLoading } from '../SpinnerLoading/index';
import { Link } from 'react-router-dom';

let allOrderOrigin;
const ManageOrder = () => {
  const [allOrder, setAllOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const unitCurrency = Intl.NumberFormat('en-US');

  const getDataOrder = async () => {
    try {
      const response = await axios.get('http://localhost:8082/api/v1/orders', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setAllOrder(response.data);
      allOrderOrigin = response.data;
    } catch (error) {}
  };

  const handleCancelOrder = (e) => {
    axios
      .get(`http://localhost:8082/api/v1/order/cancel/${e.target.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(() => {
        alert('Cancel order success');
        window.location.reload();
      })
      .catch(() => {
        alert('False to cancel order');
      });
  };

  const handleConfirmOrder = (e) => {
    axios
      .get(`http://localhost:8082/api/v1/order/confirm/${e.target.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(() => {
        alert('Confirm order success');
        window.location.reload();
      })
      .catch(() => {
        alert('False to confirm order');
      });
  };

  useEffect(() => {
    getDataOrder();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  return (
    <article className='mb-3'>
      <h1 className='text-center' style={{ color: '#344D67' }}>
        Manage Order
      </h1>
      <div className='ml-3 mb-3'>
        <p className='font-weight-bold' style={{ marginBottom: '3px' }}>
          Filter Order Status
        </p>
        <form className='form-row'>
          <div className='form-group'>
            <select
              id='statusOrder'
              className='form-control'
              onChange={(e) => {
                const statusFilter = e.target.value;

                if (statusFilter !== 'All Order') {
                  const tmpArrOrder = allOrderOrigin.filter(
                    (order) =>
                      order.listOderItem[0].status.toLowerCase() ===
                      statusFilter.toLowerCase()
                  );
                  setAllOrder(tmpArrOrder);
                } else {
                  setAllOrder(allOrderOrigin);
                }
              }}
            >
              <option defaultValue>All Order</option>
              <option>Pending</option>
              <option>Confirm</option>
              <option>Cancel</option>
            </select>
          </div>
        </form>
      </div>
      <div className='container'>
        {allOrder.map((orderItem) => (
          <div
            className='row p-4 mb-5'
            style={{ boxShadow: '0.5px 0.5px 2px 1px' }}
          >
            <div className='col-6 mb-3'>
              <p className='font-weight-bold'>
                Date order: {orderItem.dateOrder}
              </p>
            </div>
            <div className='col-6'>
              <p className='font-weight-bold text-right'>
                User Email: {orderItem.user.email}
              </p>
            </div>

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
                      {unitCurrency.format(order.book.price * order.quantity)}{' '}
                      VND
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
                          .map(
                            (order, index) => order.quantity * order.book.price
                          )
                          .reduce((acc, current) => acc + current)
                      )}{' '}
                      VND
                    </span>
                  </h5>
                  <h5 style={{ textTransform: 'capitalize' }}>
                    Status Order:{' '}
                    {orderItem.listOderItem[0].status === 'pending' ? (
                      <span
                        className='font-italic'
                        style={{ color: '#FFBF00' }}
                      >
                        {orderItem.listOderItem[0].status}
                      </span>
                    ) : orderItem.listOderItem[0].status === 'Cancel' ? (
                      <span
                        className='font-italic'
                        style={{ color: '#E14D2A' }}
                      >
                        {orderItem.listOderItem[0].status}
                      </span>
                    ) : (
                      <span
                        className='font-italic'
                        style={{ color: '#68B984' }}
                      >
                        {orderItem.listOderItem[0].status}
                      </span>
                    )}
                  </h5>
                  {orderItem.listOderItem[0].status === 'pending' ? (
                    <div>
                      <button
                        id={`${orderItem.id}`}
                        type='button'
                        className='btn btn-outline-success mt-2 mr-2'
                        onClick={handleConfirmOrder}
                      >
                        Confirm Order
                      </button>

                      <button
                        id={`${orderItem.id}`}
                        type='button'
                        className='btn btn-outline-danger mt-2'
                        onClick={handleCancelOrder}
                      >
                        Cancel Order
                      </button>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};

export default ManageOrder;
