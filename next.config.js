/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  
  reactStrictMode: true,

  poweredByHeader: false,

  compress: true,
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'captainbinary.com', // API source domain
      },
      {
        protocol: 'http',
        hostname: 'captainbinary.com', // In case HTTP is used
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  async headers() {
    // Adds security headers to all routes
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY", // Prevents iframe-based attacks
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff", // Prevents MIME-type sniffing or attack
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin", // Controls data sharing between sites
          },
        ],
      },
    ];
  },
  
  async redirects() {
    return [
      {
        source: '/',
        destination: '/products',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
