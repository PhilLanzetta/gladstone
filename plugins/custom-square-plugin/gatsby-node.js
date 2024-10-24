const { Client, Environment } = require("square")

const client = new Client({
  accessToken: process.env.SQUARE_TOKEN,
  environment: Environment.Production,
})

async function fetchProducts() {
  try {
    const { result, ...httpResponse } = await client.catalogApi.listCatalog()

    const products = result.objects.filter(object => object.type === "ITEM")

    return products
  } catch (error) {
    console.error("Error fetching products:", error)
  }
}

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
}) => {
  // Get items
  const squareItems = await fetchProducts()

  // Convert raw book results to nodes
  for (const item of squareItems) {
    actions.createNode({
      ...item,
      id: createNodeId(`SquareItem-${item.id}`),
      parent: null,
      children: [],
      internal: {
        type: "SquareProduct",
        contentDigest: createContentDigest(item),
      },
    })
  }
}
