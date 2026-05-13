/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development practices
  reactStrictMode: true,

  // Use SWC compiler for faster minification (built into Next.js)
  swcMinify: true,

  compiler: {
    // Remove console.log statements in production for cleaner output
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Build optimizations
  productionBrowserSourceMaps: false, // Disable source maps in production for faster builds

  // Image optimization settings
  images: {
    domains: ["localhost"], // Allowed image domains
    minimumCacheTTL: 60, // Cache images for at least 60 seconds
  },

  // Packages that need to be transpiled (empty by default for performance)
  transpilePackages: [],
};

module.exports = nextConfig;
