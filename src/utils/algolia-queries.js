const pagesQueryEN = `{
  allContentfulEntry(filter: {node_locale: {eq: "en"}}) {
    edges {
      node {
        id
        internal {
          contentDigest
        }
        ... on ContentfulArtist {
          artistEntry: id
          name
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
            gatsbyImageData(layout: FULL_WIDTH)
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
            gatsbyImageData
          }
        }
          location
          region
          slug
          startDate
          endDate
          title
        }
      }
    }
  }
}`

const pagesQueryKO = `{
  allContentfulEntry(filter: {node_locale: {eq: "ko"}}) {
    edges {
      node {
        id
        internal {
          contentDigest
        }
        ... on ContentfulArtist {
          artistEntry: id
          name
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
            gatsbyImageData(layout: FULL_WIDTH)
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
            gatsbyImageData
          }
        }
          location
          region
          slug
          startDate
          endDate
          title
        }
      }
    }
  }
}`

const pagesQueryZH = `{
  allContentfulEntry(filter: {node_locale: {eq: "zh"}}) {
    edges {
      node {
        id
        internal {
          contentDigest
        }
        ... on ContentfulArtist {
          artistEntry: id
          name
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
            gatsbyImageData(layout: FULL_WIDTH)
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
            gatsbyImageData
          }
        }
          location
          region
          slug
          startDate
          endDate
          title
        }
      }
    }
  }
}`

const pageToAlgoliaRecord = edge => {
  const { artistEntry, exhibitEntry, id, ...rest } = edge.node

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
  } else {
    return { objectID: id, ...rest }
  }
}

const koPageToAlgoliaRecord = edge => {
  const { artistEntry, exhibitEntry, id, ...rest } = edge.node

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
  } else {
    return { objectID: id, ...rest }
  }
}

const zhPageToAlgoliaRecord = edge => {
  const { artistEntry, exhibitEntry, id, ...rest } = edge.node

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
  } else {
    return { objectID: id, ...rest }
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
]

module.exports = queries
