// generate-sitemap.js
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BASE_URL = "https://www.logistix.fi";

const generateSitemap = () => {
  const articlesDir = path.join(process.cwd(), "content/articles");
  const filenames = fs.existsSync(articlesDir) ? fs.readdirSync(articlesDir) : [];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  const staticUrls = [
    '/',
    '/yrityksille',
    '/yhteys',
    '/me',
  ];

  staticUrls.forEach((url, i) => {
    sitemap += `
  <url>
    <loc>${BASE_URL}${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${(1 - i * 0.1).toFixed(1)}</priority>
  </url>`;
  });

  filenames.forEach((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const articleUrl = `${BASE_URL}/articles/${slug}`;
    sitemap += `
  <url>
    <loc>${articleUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  fs.writeFileSync(path.join(process.cwd(), "public/sitemap.xml"), sitemap.trim());
  console.log("✅ sitemap.xml generated!");
};

generateSitemap();