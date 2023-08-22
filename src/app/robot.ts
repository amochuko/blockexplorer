import { MetadataRoute } from 'next';
import { robotsCrawlerData } from './api/data';

export default function robots(): MetadataRoute.Robots {
  return robotsCrawlerData;
}
