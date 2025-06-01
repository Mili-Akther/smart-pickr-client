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
            <div>
                  {products.map(product=><HotProductCard key={product._id} product={product}></HotProductCard>)}
            </div>
            </div>
      );
};

export default HotProduct;