// next.config.js
const path = require('path')
const withCSS = require('@zeit/next-css')
const Dotenv = require('dotenv-webpack')
const withPlugins = require('next-compose-plugins')

// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.css'] = file => {}
}

const nextConfig = {
  /* config options here */
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    // Perform customizations to webpack config
    // Important: return the modified config

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '<components>': path.resolve(__dirname, './components'),
    }

    new Dotenv({
      path: path.join(__dirname, '.env'),
      safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      silent: true, // hide any errors
    })

    return config
  },
}

module.exports = withPlugins(
  [
    [
      withCSS,
      {
        cssModules: false,
        cssLoaderOptions: {
          localIdentName: '[local]___[hash:base64:5]',
        },
      },
    ],
  ],
  nextConfig,
)
