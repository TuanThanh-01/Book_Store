import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { SpinnerLoading } from '../SpinnerLoading/index';
import OrderDetailsUser from './OrderDetailsUser/index';

const ManageOrder = () => {
  const [allOrder, setAllOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getDataOrder = async () => {
    try {
      const response = await axios.get('http://localhost:8082/api/v1/orders', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setAllOrder(response.data);
    } catch (error) {}
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
        Manage Order
      </h1>
      <div className='container'>
        {allOrder.map((orderItem, index) => (
          <OrderDetailsUser key={index} orderItem={orderItem} />
        ))}
      </div>
    </article>
  );
};

export default ManageOrder;
