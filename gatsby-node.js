/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */

var slugify = require("slugify")

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index
  }
  const result = await graphql(`
    query GetData {
      allContentfulArtist(filter: { isGladstoneArtist: { eq: true } }) {
        edges {
          node {
            slug
            name
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
      allContentfulFair {
        edges {
          node {
            slug
          }
        }
      }
      allContentfulViewingRoom {
        edges {
          node {
            fair {
              slug
            }
          }
        }
      }
      allShopifyProduct {
        edges {
          node {
            handle
          }
        }
      }
      artistProduct: allShopifyProduct {
        edges {
          node {
            metafield(key: "artist", namespace: "custom") {
              value
            }
          }
        }
      }
      allShopifyCollection {
        edges {
          node {
            handle
          }
        }
      }
    }
  `)

  const artists = result.data.allContentfulArtist.edges

  const exhibits = result.data.allContentfulExhibition.edges

  const fairs = result.data.allContentfulFair.edges

  const viewingRooms = result.data.allContentfulViewingRoom.edges

  const products = result.data.allShopifyProduct.edges

  const collections = result.data.allShopifyCollection.edges

  const artistProducts = result.data.artistProduct.edges
    .map(edge => edge.node.metafield?.value)
    .filter(node => node !== undefined)
    .filter(onlyUnique)

  artists.forEach(({ node }) => {
    const artistSlug = node.slug
    createPage({
      path: `/artist/${artistSlug}`,
      component: require.resolve("./src/templates/artist-template.js"),
      context: { slug: artistSlug, name: node.name },
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

  fairs.forEach(({ node }) => {
    const fairSlug = node.slug
    createPage({
      path: `/fair/${fairSlug}`,
      component: require.resolve("./src/templates/fair-template.js"),
      context: { slug: fairSlug },
    })
  })

  viewingRooms.forEach(({ node }) => {
    const fairSlug = node.fair.slug
    createPage({
      path: `/fair/${fairSlug}/viewing-room`,
      component: require.resolve("./src/templates/viewingRoom-template.js"),
      context: { slug: fairSlug },
    })
  })

  products.forEach(({ node }) => {
    const productSlug = node.handle
    createPage({
      path: `/shop/${productSlug}`,
      component: require.resolve("./src/templates/product-template.js"),
      context: { handle: productSlug },
    })
  })

  collections.forEach(({ node }) => {
    const collectionSlug = node.handle
    createPage({
      path: `/shop/${collectionSlug}`,
      component: require.resolve("./src/templates/collection-template.js"),
      context: { handle: collectionSlug },
    })
  })

  artistProducts.forEach(node => {
    const artist = node
    createPage({
      path: `/shop/${slugify(artist, { lower: true })}`,
      component: require.resolve(
        "./src/templates/artist-collection-template.js"
      ),
      context: { artist: artist },
    })
  })
}
