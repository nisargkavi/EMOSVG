/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/:emoji*",
        destination: "/api/emoji?emoji=:emoji*",
      },
    ];
  },
};

module.exports = nextConfig;
