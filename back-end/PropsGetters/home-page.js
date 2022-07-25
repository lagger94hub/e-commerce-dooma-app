
import getCategories from "../utils/getCategories"

// get featured prodcuts for the main page from the database 
export default async function getProps() {
  try {
    const categories = await getCategories()

    // to get the featured products for the homepage
    // const [products, field] = await MyPool.execute("select * from product_records");

    return {
      categories
    }
  } catch (e) {
    throw e
  }
}

