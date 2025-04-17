// next-sitemap.config.js
module.exports = {
    siteUrl: 'https://dyaneparis.com',
    generateRobotsTxt: true,
    sitemapSize: 7000,
    changefreq: 'monthly',
    priority: 0.7,
    exclude: ['/404', '/server-error'],
    alternateRefs: [
      {
        href: 'https://dyaneparis.com/fr',
        hreflang: 'fr',
      },
      {
        href: 'https://dyaneparis.com/en',
        hreflang: 'en',
      },
    ],
  };
  