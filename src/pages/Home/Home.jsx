import React from 'react';
import Banner from './Banner';
import HotProduct from './HotProduct';
import PromoCards from './PromoCards';
import TrendingSlider from './TrendingSlider';
import DiscountSection from './DiscountSection';


const Home = () => {
      return (
            <div>
            <Banner></Banner>
            <HotProduct></HotProduct>
            <PromoCards></PromoCards>
            <TrendingSlider></TrendingSlider>
            <DiscountSection></DiscountSection>
            </div>
      );
};

export default Home;