import React, { useEffect } from "react"
import Layout from "../components/layout"

const Shop = () => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://connect.squareupsandbox.com/v2/catalog/list",
        {
          headers: {
            "Square-Version": "2024-10-17",
            Authorization:
              "EAAAl4abMG2eH_HOaUO9bnK-PUsBn0WR351n5AldzMJaQMepRivmrUy6crg-TuxA",
            "Content-Type": "application/json",
          },
        }
      )
      const data = await response.json()
      console.log(data)
    }
    fetchData()
  }, [])

  return (
    <Layout>
      <div>Shop</div>
    </Layout>
  )
}

export default Shop
