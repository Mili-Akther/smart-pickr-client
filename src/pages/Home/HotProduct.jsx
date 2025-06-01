import React, { useEffect, useState } from 'react';
import HotProductCard from './HotProductCard';

const HotProduct = () => {
      const [products,setJobs] = useState([]);
      useEffect(()=>{
            fetch("http://localhost:5000/products")
            .then(res=>res.json())
            .then(data=>setJobs(data))
      },[])
      return (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-black gap-4 ">
            {products.map((product) => (
              <HotProductCard
                key={product._id}
                product={product}
              ></HotProductCard>
            ))}
          </div>
        </div>
      );
};

export default HotProduct;