import { writeFile } from 'node:fs'
import { cookies } from 'next/headers'
import { NextApiRequest, NextApiResponse } from 'next';

const retailerCouponSite = 'https://www.walgreens.com/offers/v1/svc/coupons/recommended';
const walgBody = JSON.stringify({"recSize": 200});
const contentLength = new Blob([walgBody]).size;


const getCoupons = async (req: NextApiRequest, res: NextApiResponse) => {
  const intercept = await fetch('https://www.walgreens.com/offers/v1/svc/coupons/recommended');
  const interCookies = intercept.headers.getSetCookie().join(" ");
  console.log(interCookies);
  const response = await fetch(retailerCouponSite, {method: 'POST', headers: {Cookie: interCookies, "Content-Type": "application/json", "Content-Length": contentLength.toString()}, body: walgBody});
  const html = await response.json();

  const coupons = html;

  console.log(coupons);
  //res.status(200).json({ coupons });
  return '{}'
}

export default getCoupons