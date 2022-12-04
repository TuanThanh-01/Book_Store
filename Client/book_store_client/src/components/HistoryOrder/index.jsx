import { useEffect } from 'react';
import { useState } from 'react';
import { SpinnerLoading } from '../SpinnerLoading/index';
import OrderDetails from './OrderDetails/index';
import axios from 'axios';

const HistoryOrder = () => {
  const [order, setOrder] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getDataOrder = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/order/${localStorage.getItem(
          'userId'
        )}/orders`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setOrder(response.data);
    } catch (error) {
      alert('fetch order data false');
    }
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
      <h1 className='text-center mb-4' style={{ color: '#344D67' }}>
        History Order
      </h1>
      <div className='container'>
        {order.map((orderItem, index) => (
          <OrderDetails key={index} orderItem={orderItem} />
        ))}
      </div>
    </article>
  );
};

export default HistoryOrder;
