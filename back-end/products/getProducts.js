import MyPool from "../db/db";
import { logError } from "../utils/errorsLib";
import { queryProducts } from "../db/queries/products";

// get the products list in the catch all categories path
const getProductsList = async (categoryPath, urlQuery, options) => {
  try {
    const { filtered } = options;
    const { sqlQuery, sqlQueryArr } = queryProducts(
      categoryPath,
      urlQuery,
      filtered
    );
    // get the featured productsList according to filters
    const [products] = await MyPool.execute(sqlQuery, sqlQueryArr);

    return JSON.parse(JSON.stringify(products));
  } catch (e) {
    logError("getProductsList", e.message);
    throw e;
  }
};
export { getProductsList };
