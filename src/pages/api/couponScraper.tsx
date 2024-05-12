import { writeFile } from 'node:fs'
import { JSDOM } from 'jsdom'
import { NextApiRequest, NextApiResponse } from 'next';

let retailerCouponSite = 'https://www.walgreens.com/offers/offers.jsp?ban=dl_dlsp_MegaMenu_Coupons';

const getCoupons = async (req: NextApiRequest, res: NextApiResponse) => {
    const response = await fetch(retailerCouponSite);
    const html = await response.text();

    const dom = new JSDOM(html);
    const document  = dom.window.document;

    const coupons = document.querySelector('.font__eighteen')?.textContent;

    console.log(coupons);
    res.status(200).json({ coupons });
}

export default getCoupons