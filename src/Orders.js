import React, { useEffect, useState } from 'react';
import './Orders.css';
import { db } from './firebase';
import { useStateValue } from './StateProvider';
import { collection, doc, query, orderBy, onSnapshot } from 'firebase/firestore'; // Modular Firestore imports
import Order from './Order';

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      const ordersRef = query(
        collection(doc(db, 'users', user?.uid), 'orders'),
        orderBy('created', 'desc')
      );

      // Subscribe to the Firestore collection
      const unsubscribe = onSnapshot(ordersRef, (snapshot) => {
        setOrders(snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        })));
      });

      // Cleanup listener on unmount
      return unsubscribe;
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <div className="orders">
      <h1>Your Orders</h1>

      <div className="orders__order">
        {orders?.map((order) => (
          <Order key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
