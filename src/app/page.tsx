'use client';

import Image from "next/image";
import NavBar from "./components/NavBar";
import Button from '@mui/material/Button';
import { useState } from 'react';
import CouponCard from "./components/CouponCard";
import Carousel from 'react-material-ui-carousel'
import Grid from '@mui/system/Unstable_Grid';
import Container from '@mui/material/Container';

export default function Home() {
  const [coupons, setCoupons] = useState([]);
  const [keywordMatches, setKeywordMatches] = useState([]);
  const [matches, setMatches] = useState([]);
  let start = 0;
  let count = 0;

  const getCoupons = async () => {
    const res = await fetch('http://localhost:3000/api/couponScraper');
    const response  = await res.json();
    setCoupons(response["filteredCoupons"]);
    setKeywordMatches(response["keywordMatch"]);
    setMatches(response["matches"]);
  }
  return (
      <div>
         <Button onClick={() => {getCoupons()}}>Refresh</Button>
         
         {keywordMatches.map((keywordMatch, i) => (
          <Grid container spacing={2}>
            <Grid xs={4}>
              <p>{keywordMatch}</p>
            </Grid>
            <Grid xs={8}>
              <Carousel autoPlay = {false}>
                {coupons.slice(start, matches[i]+start).map((coupon, index, arr) => (
                    <CouponCard key = {index}
                      brandName={coupon["brandName"]}
                      expiryDate={coupon["expiryDate"]}
                      description={coupon["description"]}
                      image={coupon["image"]}
                    />
                ))}
              </Carousel>
              
              <p hidden>
              {start = (matches[i]+start)}
              </p>
              
            </Grid>
          </Grid>
          
         ))}
         
      </div>

  );
}
