import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      'localhost',
      'incleanshoes.ru',
      'api.incleanshoes.ru',
      'cleanshoes.proxiesseller.cc',
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
