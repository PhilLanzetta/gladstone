const pagesQueryEN = `{
  allContentfulEntry(filter: { node_locale: { eq: "en" }, contentful_id: {nin: ["uC942hXE8PzJdEnGrsc1N", "6NpF313v6WrZRPg5ORbKej"]} }) {
    edges {
      node {
        id
        internal {
          contentDigest
        }
        ... on ContentfulArtist {
          artistEntry: id
          name
          isGladstoneArtist
          internal {
            contentDigest
          }
          slug
          featuredBiography {
            childMarkdownRemark {
              excerpt(pruneLength: 200, format: HTML)
            }
          }
          featuredImage {
            image {
              description
              gatsbyImageData(width: 300)
            }
          }
        }
        ... on ContentfulExhibition {
          exhibitEntry: id
          artists {
            name
          }
          internal {
            contentDigest
          }
          exhibitionDescription {
            childMarkdownRemark {
              excerpt(format: HTML, pruneLength: 200)
            }
          }
          tileImage {
            image {
              description
              gatsbyImageData(width: 300)
            }
          }
          location
          region
          slug
          startDate
          endDate
          title
        }
        ... on ContentfulFair {
          fairEntry: id
          artists {
            name
          }
          internal {
            contentDigest
          }
          fairDescription {
            childMarkdownRemark {
              excerpt(format: HTML, pruneLength: 200)
            }
          }
          slug
          startDate
          tileImage {
            image {
              description
              gatsbyImageData(width: 300)
            }
          }
          title
          endDate
        }
        ... on ContentfulNewsEntry {
          newsEntry: id
          newsImage {
            description
            gatsbyImageData(width: 300)
          }
          newsText {
            childMarkdownRemark {
              excerpt(format: HTML, pruneLength: 200)
            }
          }
          internal {
            contentDigest
          }
          link {
            url
            label
          }
          date
        }
      }
    }
  }
}`

const pagesQueryKO = `{
  allContentfulEntry(filter: { node_locale: { eq: "ko" }, contentful_id: {nin: ["uC942hXE8PzJdEnGrsc1N", "6NpF313v6WrZRPg5ORbKej"]} }) {
    edges {
      node {
        id
        internal {
          contentDigest
        }
        ... on ContentfulArtist {
          artistEntry: id
          name
          isGladstoneArtist
          internal {
            contentDigest
          }
          slug
          featuredBiography {
            childMarkdownRemark {
              excerpt(pruneLength: 200, format: HTML)
            }
          }
          featuredImage {
            image {
              description
              gatsbyImageData(width: 300)
            }
          }
        }
        ... on ContentfulExhibition {
          exhibitEntry: id
          artists {
            name
          }
          internal {
            contentDigest
          }
          exhibitionDescription {
            childMarkdownRemark {
              excerpt(format: HTML, pruneLength: 200)
            }
          }
          tileImage {
            image {
              description
              gatsbyImageData(width: 300)
            }
          }
          location
          region
          slug
          startDate
          endDate
          title
        }
        ... on ContentfulFair {
          fairEntry: id
          artists {
            name
          }
          internal {
            contentDigest
          }
          fairDescription {
            childMarkdownRemark {
              excerpt(format: HTML, pruneLength: 200)
            }
          }
          slug
          startDate
          tileImage {
            image {
              description
              gatsbyImageData(width: 300)
            }
          }
          title
          endDate
        }
        ... on ContentfulNewsEntry {
          newsEntry: id
          newsImage {
            description
            gatsbyImageData(width: 300)
          }
          newsText {
            childMarkdownRemark {
              excerpt(format: HTML, pruneLength: 200)
            }
          }
          internal {
            contentDigest
          }
          link {
            url
            label
          }
          date
        }
      }
    }
  }
}`

const pagesQueryZH = `{
  allContentfulEntry(filter: { node_locale: { eq: "zh" }, contentful_id: {nin: ["uC942hXE8PzJdEnGrsc1N", "6NpF313v6WrZRPg5ORbKej"]} }) {
    edges {
      node {
        id
        internal {
          contentDigest
        }
        ... on ContentfulArtist {
          artistEntry: id
          name
          isGladstoneArtist
          internal {
            contentDigest
          }
          slug
          featuredBiography {
            childMarkdownRemark {
              excerpt(pruneLength: 200, format: HTML)
            }
          }
          featuredImage {
            image {
              description
              gatsbyImageData(width: 300)
            }
          }
        }
        ... on ContentfulExhibition {
          exhibitEntry: id
          artists {
            name
          }
          internal {
            contentDigest
          }
          exhibitionDescription {
            childMarkdownRemark {
              excerpt(format: HTML, pruneLength: 200)
            }
          }
          tileImage {
            image {
              description
              gatsbyImageData(width: 300)
            }
          }
          location
          region
          slug
          startDate
          endDate
          title
        }
        ... on ContentfulFair {
          fairEntry: id
          artists {
            name
          }
          internal {
            contentDigest
          }
          fairDescription {
            childMarkdownRemark {
              excerpt(format: HTML, pruneLength: 200)
            }
          }
          slug
          startDate
          tileImage {
            image {
              description
              gatsbyImageData(width: 300)
            }
          }
          title
          endDate
        }
        ... on ContentfulNewsEntry {
          newsEntry: id
          newsImage {
            description
            gatsbyImageData(width: 300)
          }
          newsText {
            childMarkdownRemark {
              excerpt(format: HTML, pruneLength: 200)
            }
          }
          internal {
            contentDigest
          }
          link {
            url
            label
          }
          date
        }
      }
    }
  }
}`

const shopifyQuery = `{
  allShopifyProduct(filter: {status: {eq: ACTIVE}}) {
    edges {
      node {
        id
        internal {
          contentDigest
        }
        title
        handle
        metafield(key: "artist", namespace: "custom") {
          value
        }
        featuredImage {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 300)
            }
          }
        }
      }
    }
  }
}`

const pageToAlgoliaRecord = edge => {
  const { artistEntry, exhibitEntry, fairEntry, newsEntry, id, ...rest } =
    edge.node

  if (artistEntry) {
    return {
      objectID: id,
      searchCategory: "Artist",
      searchCategoryDisplay: "Artist",
      ...rest,
    }
  } else if (exhibitEntry) {
    return {
      objectID: id,
      searchCategory: "Exhibition",
      searchCategoryDisplay: "Exhibition",
      ...rest,
    }
  } else if (fairEntry) {
    return {
      objectID: id,
      searchCategory: "Fair",
      searchCategoryDisplay: "Fair",
      ...rest,
    }
  } else if (newsEntry) {
    return {
      objectID: id,
      searchCategory: "News",
      searchCategoryDisplay: "News",
      ...rest,
    }
  } else {
    return { objectID: id, ...rest }
  }
}

const koPageToAlgoliaRecord = edge => {
  const { artistEntry, exhibitEntry, fairEntry, newsEntry, id, ...rest } =
    edge.node

  if (artistEntry) {
    return {
      objectID: id,
      searchCategory: "Artist",
      searchCategoryDisplay: "아티스트",
      ...rest,
    }
  } else if (exhibitEntry) {
    return {
      objectID: id,
      searchCategory: "Exhibition",
      searchCategoryDisplay: "전시회",
      ...rest,
    }
  } else if (fairEntry) {
    return {
      objectID: id,
      searchCategory: "Fair",
      searchCategoryDisplay: "박람회",
      ...rest,
    }
  } else if (newsEntry) {
    return {
      objectID: id,
      searchCategory: "News",
      searchCategoryDisplay: "소식",
      ...rest,
    }
  } else {
    return { objectID: id, ...rest }
  }
}

const zhPageToAlgoliaRecord = edge => {
  const { artistEntry, exhibitEntry, fairEntry, newsEntry, id, ...rest } =
    edge.node

  if (artistEntry) {
    return {
      objectID: id,
      searchCategory: "Artist",
      searchCategoryDisplay: "艺术家",
      ...rest,
    }
  } else if (exhibitEntry) {
    return {
      objectID: id,
      searchCategory: "Exhibition",
      searchCategoryDisplay: "展览",
      ...rest,
    }
  } else if (fairEntry) {
    return {
      objectID: id,
      searchCategory: "Fair",
      searchCategoryDisplay: "博览会",
      ...rest,
    }
  } else if (newsEntry) {
    return {
      objectID: id,
      searchCategory: "News",
      searchCategoryDisplay: "消息",
      ...rest,
    }
  } else {
    return { objectID: id, ...rest }
  }
}

const productToAlgoliaRecord = edge => {
  const { id, ...rest } = edge.node

  return {
    objectID: id,
    searchCategory: "Shop",
    searchCategoryDisplay: "Shop",
    ...rest,
  }
}

const zhProductToAlgoliaRecord = edge => {
  const { id, ...rest } = edge.node

  return {
    objectID: id,
    searchCategory: "Shop",
    searchCategoryDisplay: "店铺",
    ...rest,
  }
}

const koProductToAlgoliaRecord = edge => {
  const { id, ...rest } = edge.node

  return {
    objectID: id,
    searchCategory: "Shop",
    searchCategoryDisplay: "가게",
    ...rest,
  }
}

const queries = [
  {
    query: pagesQueryEN,
    transformer: ({ data }) =>
      data.allContentfulEntry.edges.map(edge => pageToAlgoliaRecord(edge)),
    indexName: `Pages`,
  },
  {
    query: pagesQueryKO,
    transformer: ({ data }) =>
      data.allContentfulEntry.edges.map(edge => koPageToAlgoliaRecord(edge)),
    indexName: `Korean Pages`,
  },
  {
    query: pagesQueryZH,
    transformer: ({ data }) =>
      data.allContentfulEntry.edges.map(edge => zhPageToAlgoliaRecord(edge)),
    indexName: `Chinese Pages`,
  },
  {
    query: shopifyQuery,
    transformer: ({ data }) =>
      data.allShopifyProduct.edges.map(edge => zhProductToAlgoliaRecord(edge)),
    indexName: `Chinese Pages`,
  },
  {
    query: shopifyQuery,
    transformer: ({ data }) =>
      data.allShopifyProduct.edges.map(edge => koProductToAlgoliaRecord(edge)),
    indexName: `Korean Pages`,
  },
  {
    query: shopifyQuery,
    transformer: ({ data }) =>
      data.allShopifyProduct.edges.map(edge => productToAlgoliaRecord(edge)),
    indexName: `Pages`,
  },
]

module.exports = queries
