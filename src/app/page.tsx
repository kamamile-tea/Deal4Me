'use client';

import Image from "next/image";
import NavBar from "./components/NavBar";
import Button from '@mui/material/Button';
import { useState } from 'react';

export default function Home() {
  const [coupons, setCoupons] = useState<string>('');

  const getCoupons = async () => {
    const res = await fetch('http://localhost:3000/api/couponScraper');
    const { coupons } = await res.json();
    setCoupons(coupons);
  }
  return (
      <div>
         <Button onClick={() => {getCoupons()}}>hello</Button>
         <p>{coupons}</p>
      </div>

  );
}
