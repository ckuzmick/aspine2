/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...config.externals, "playwright-core"];

      // Handling for .ttf files
      config.module.rules.push({
        test: /\.ttf$/,
        use: ["file-loader"],
      });

      // Optionally exclude html files from being processed
      // This is more of a workaround and might not be necessary
    }
    return config;
  },
};

export default nextConfig;
