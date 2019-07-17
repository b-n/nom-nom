require('ts-node').register();
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})
const locales = require('./src/data/languages')

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  host: process.env.CONTENTFUL_HOST
}

const { spaceId, accessToken } = contentfulConfig

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the access token need to be provided.'
  )
}

module.exports = {
  siteMetadata: {
    title: 'Nom-nom. Om nom nom nom',
    languages: locales.languages,
    defaultLocale: locales.defaultLocale,
  },
  pathPrefix: '/nom-nom',
  plugins: [
    'gatsby-transformer-remark',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },
    'gatsby-plugin-typescript',
    'gatsby-plugin-tslint',
  ],
}
