import { writeFile } from 'node:fs'
import { cookies } from 'next/headers'
import { NextApiRequest, NextApiResponse } from 'next';

const keywords = ["nail", "deodorant", "allegra"];

const retailerCouponSite = 'https://www.walgreens.com/offers/v1/svc/coupons/recommended';
let couponCount;


const getCoupons = async (req: NextApiRequest, res: NextApiResponse) => {
  //prepocess, to run prior to actual request for all coupon entries. This gets necessary cookies and total coupon count.
  const intercept = await fetch('https://www.walgreens.com/offers/v1/svc/coupons/recommended', {method: 'POST'});
  const interCookies = intercept.headers.getSetCookie().join(" ");
  couponCount = await intercept.json();
  couponCount = couponCount["summary"]["availableCount"];
  const walgBody = JSON.stringify({"recSize": couponCount});
  const contentLength = new Blob([walgBody]).size;
  console.log(couponCount);

  //Actul request for ALL coupons available
  const response = await fetch(retailerCouponSite, {method: 'POST', headers: {Cookie: interCookies, "Content-Type": "application/json", "Content-Length": contentLength.toString()}, body: walgBody});
  let coupons = await response.json();

  coupons = coupons["coupons"];
  let filteredCoupons = [];

  for(let i = 0; i < couponCount; i++){
    for(let j = 0; j < keywords.length; j++){
      if(coupons[i]["description"].toLowerCase().includes(keywords[j])){
        filteredCoupons.push(coupons[i]);
      }
    }
  }

  console.log(filteredCoupons);
  res.status(200).json({ filteredCoupons });
}

export default getCoupons