'use client';

import Image from "next/image";
import NavBar from "./components/NavBar";
import Button from '@mui/material/Button';
import { useState } from 'react';
import CouponCard from "./components/CouponCard";
import CouponCarousel from "./components/CouponCarousel";
import Carousel from 'react-material-ui-carousel'

export default function Home() {
  const [coupons, setCoupons] = useState([]);
  const [keywordMatches, setKeywordMatches] = useState([]);

  const getCoupons = async () => {
    const res = await fetch('http://localhost:3000/api/couponScraper');
    const response  = await res.json();
    setCoupons(response["filteredCoupons"]);
    setKeywordMatches(response["keywordMatch"]);

  }
  return (
      <div>
         <Button onClick={() => {getCoupons()}}>hello</Button>
         {keywordMatches.map((keywordMatch) => 
          <Carousel autoPlay = {false}>
            {coupons.map((coupon, index) => 
              <CouponCard key = {index} description={coupon["description"]}/>
            )}
          </Carousel>
         )}
      </div>

  );
}
