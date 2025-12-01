import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  swcMinify: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "localhost",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "incleanshoes.ru",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "admin.incleanshoes.ru",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.incleanshoes.ru",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cleanshoes.proxiesseller.cc",
        pathname: "/**",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
