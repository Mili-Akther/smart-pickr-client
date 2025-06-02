import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';

const MyFeedbacks = () => {
      const {user}= useAuth();
      const [products,setProducts]=useState([]);
      useEffect(()=>{
            fetch(`http://localhost:5000/product-Feedback?email=${user.email}`)
              .then((res) => res.json())
              .then((data) => setProducts(data));
      },[user?.email])
      return (
        <div>
          <h2 className="text-3xl">My Feedbacks: {products.length}</h2>
        </div>
      );
};
export default MyFeedbacks;