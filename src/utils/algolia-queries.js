const pagesQuery = `{
  allContentfulEntry {
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
          featuredImage {
            image {
              description
              gatsbyImageData(width: 300)
            }
          }
          slug
          press {
            publication
            title
          }
          featuredBiography {
            childMarkdownRemark {
              excerpt(pruneLength: 300, format: HTML)
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
              excerpt(format: HTML, pruneLength: 300)
            }
          }
          location
          region
          slug
          startDate
          endDate
          title
          tileImage {
            image {
              description
              gatsbyImageData(width: 300)
            }
          }
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
      ...rest,
    }
  } else if (exhibitEntry) {
    return {
      objectID: id,
      searchCategory: "Exhibition",
      ...rest,
    }
  } else {
    return { objectID: id, ...rest }
  }
}

const queries = [
  {
    query: pagesQuery,
    transformer: ({ data }) =>
      data.allContentfulEntry.edges.map(edge => pageToAlgoliaRecord(edge)),
    indexName: `Pages`,
  },
]

module.exports = queries
