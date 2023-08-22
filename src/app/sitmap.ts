import { MetadataRoute } from 'next';
import { siteMapData } from './api/data';

export default function sitemap(): MetadataRoute.Sitemap {
  return siteMapData
}
