import { MetadataRoute } from 'next';

export const navMenuList = [
  { title: 'Home', href: '/' },
];

export const siteMapData = [
  {
    url: 'https://example.com',
    lastModified: new Date(),
  },
  {
    url: 'https://example.com/about',
    lastModified: new Date(),
  },
];

export const robotsCrawlerData: MetadataRoute.Robots = {
  rules: {
    userAgent: '*',
    allow: '/',
    disallow: '/private',
  },
  sitemap: 'https://acme.com/sitemap.xml',
};

// TODO: fetch form coinmarketcap.com
export const getMarketCap = () => 12093884;

export const getAppPerformance = (args:any) => {
  // TODO: remote to server
  // console.log(args);
}