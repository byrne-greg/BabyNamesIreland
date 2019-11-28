module.exports = {
  siteMetadata: {
    title: `Baby Names Ireland`,
    description: `Search and find popular baby names in Ireland`,
    author: `@gregbyrne - https://www.linkedin.com/in/byrne-greg/8`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#589738`,
        theme_color: `#589738`,
        display: `minimal-ui`,
        icon: `src/images/bni-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
