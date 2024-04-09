/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["via.placeholder.com", "ucarecdn.com"]
  },
  async headers() {
    return [
      {
        source: "/api/v1/login",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*"
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS"
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "X-Requested-With, Content-Type, Authorization"
          },
          {
            key: "Access-Control-Allow-Credentials",
            value: "true"
          }
        ]
      }
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/v1/login",
        destination: "http://localhost:3000/api/v1/login"
      }
    ];
  }
};

module.exports = nextConfig;
