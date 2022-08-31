import MyPool from "../db/db";
import { logError } from "../utils/errorsLib";
import { queryProducts } from "../db/queries/products";

// get the products list in the catch all categories path
const getCategoryProducts = async (categoryPath, urlQuery, options) => {
  try {
    // based on the passed options queryproducts my return all or filterd products
    const { sqlQuery, sqlQueryArr } = queryProducts(
      categoryPath,
      urlQuery,
      options
    );
    // console.log(sqlQuery)
    // get the featured productsList according to filters
    const [products] = await MyPool.execute(sqlQuery, sqlQueryArr);

    return JSON.parse(JSON.stringify(products));
  } catch (e) {
    logError("getProductsList", e.message);
    throw e;
  }
};
export { getCategoryProducts };
