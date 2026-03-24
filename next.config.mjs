/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["react-globe.gl", "three-globe"],
  experimental: {
    esmExternals: "loose",
  },
};

export default nextConfig;
