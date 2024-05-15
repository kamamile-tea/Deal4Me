'use client';

import Image from "next/image";
import NavBar from "./components/NavBar";
import Button from '@mui/material/Button';
import { useState } from 'react';

export default function Home() {
  const [coupons, setCoupons] = useState([]);

  const getCoupons = async () => {
    const res = await fetch('http://localhost:3000/api/couponScraper');
    const response  = await res.json();
    setCoupons(response["filteredCoupons"]);
  }
  return (
      <div>
         <Button onClick={() => {getCoupons()}}>hello</Button>
         {coupons.map((coupon, index) => 
          <p key = {index}>COUPON {coupon["description"]}</p>
         )}
      </div>

  );
}
