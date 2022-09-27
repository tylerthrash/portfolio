const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [
      path.join(__dirname, 'styles'),
      path.join(__dirname, 'styles/abstracts'),
      path.join(__dirname, 'styles/components'),
      path.join(__dirname, 'styles/base'),
      path.join(__dirname, 'styles/themes'),
      path.join(__dirname, 'styles/utilities'),
    ]
  }
}

module.exports = nextConfig
