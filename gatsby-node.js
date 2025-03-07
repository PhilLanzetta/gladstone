/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */

var slugify = require("slugify")

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions
  deletePage(page)
  // You can access the variable "locale" in your page queries now
  createPage({
    ...page,
    context: {
      ...page.context,
      locale: page.context.intl.language,
    },
  })
}

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
            node_locale
          }
        }
      }
      allContentfulExhibition(
        filter: {
          title: { ne: "Placeholder (does not show on site, do not delete)" }
        }
      ) {
        edges {
          node {
            slug
            node_locale
          }
        }
      }
      allContentfulFair(
        filter: {
          title: { ne: "Placeholder (does not appear on site, do not delete)" }
        }
      ) {
        edges {
          node {
            slug
            node_locale
          }
        }
      }
      allContentfulViewingRoom {
        edges {
          node {
            fair {
              slug
              node_locale
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
          nodes {
            tags
          }
      }
      allShopifyCollection {
        edges {
          node {
            handle
          }
        }
      }
      allContentfulFlexPage {
        edges {
          node {
            slug
            node_locale
          }
        }
      }
    }
  `)

  const artists = result.data.allContentfulArtist.edges

  const exhibits = result.data.allContentfulExhibition.edges

  const fairs = result.data.allContentfulFair.edges

  const flex = result.data.allContentfulFlexPage.edges

  const viewingRooms = result.data.allContentfulViewingRoom.edges

  const products = result.data.allShopifyProduct.edges

  const collections = result.data.allShopifyCollection.edges

  const artistProducts = result.data.artistProduct.nodes.reduce(
    (accumulator, object) => {
      return accumulator.concat(object.tags)
    },
    []
  ).filter(onlyUnique)

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

  flex.forEach(({ node }) => {
    const flexSlug = node.slug
    createPage({
      path: `/${flexSlug}`,
      component: require.resolve("./src/templates/flex-template.js"),
      context: { slug: flexSlug },
    })
  })

  viewingRooms.forEach(({ node }) => {
    const fairSlug = node.fair && node.fair[0].slug
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
      path: `/shop/artist/${slugify(artist, { lower: true })}`,
      component: require.resolve(
        "./src/templates/artist-collection-template.js"
      ),
      context: { artist: artist },
    })
  })
}
