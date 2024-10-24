/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const result = await graphql(`
    query GetData {
      allContentfulArtist {
        edges {
          node {
            slug
          }
        }
      }
      allContentfulExhibition {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  const artists = result.data.allContentfulArtist.edges

  const exhibits = result.data.allContentfulExhibition.edges

  artists.forEach(({ node }) => {
    const artistSlug = node.slug
    createPage({
      path: `/artist/${artistSlug}`,
      component: require.resolve("./src/templates/artist-template.js"),
      context: { slug: artistSlug },
    })
  })

  exhibits.forEach(({ node }) => {
    const exhibitSlug = node.slug
    createPage({
      path: `/exhibit/${exhibitSlug}`,
      component: require.resolve("./src/templates/exhibit-template.js"),
      context: { slug: exhibitSlug },
    })
  })
}