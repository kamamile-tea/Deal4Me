import { writeFile } from 'node:fs'
import { cookies } from 'next/headers'
import { NextApiRequest, NextApiResponse } from 'next';

const keywords = ["nail", "deodorant", "allegra", "cake"];

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
  let matches  = [];
  let matchAmount = 0;
  let keywordMatch = [];

  for(let i = 0; i < keywords.length; i++){
    matchAmount = 0;
    for(let j = 0; j < couponCount; j++){
      if(coupons[j]["description"].toLowerCase().includes(keywords[i])){
        filteredCoupons.push(coupons[j]);
        matchAmount = matchAmount + 1;
      }
    }
    if(matchAmount != 0){
      keywordMatch.push(keywords[i]);
      matches.push(matchAmount);
    }
  }

  let data = {filteredCoupons, matches, "filteredCouponsLen": filteredCoupons.length, "keywordMatch": keywordMatch}

  console.log(data);
  res.status(200).json(data);
}

export default getCoupons