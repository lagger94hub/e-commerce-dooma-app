import MyPool from "../db/db";
import { logError } from "../utils/errorsLib";
import {
  queryProducts,
  queryProductDetails,
  queryProductFabrics,
  queryProductColors,
} from "../db/queries/product-queries-builder";

// get the products list in the catch all categories path
const getCategoryProducts = async (categoryPath, urlQuery, options) => {
  try {
    // based on the passed options queryproducts my return all or filterd products
    const { sqlQuery, sqlQueryArr } = queryProducts(
      categoryPath,
      urlQuery,
      options
    );
    // get the featured productsList according to filters
    const [products] = await MyPool.execute(sqlQuery, sqlQueryArr);
    // console.log(products)
    return JSON.parse(JSON.stringify(products));
  } catch (e) {
    logError("getProductsList", e.message);
    throw e;
  }
};

// get the product details based on product slug and color id
const getProductDetails = async (productSlug, colorId) => {
  try {
    const { sqlQuery, sqlQueryArr } = queryProductDetails(productSlug, colorId);
    const [productDetails] = await MyPool.execute(sqlQuery, sqlQueryArr);
    return productDetails;
  } catch (e) {
    logError("getProductDetails", e.message);
    throw e;
  }
};

// get the product fabrics based on product slug and color id
const getProductFabrics = async (productSlug) => {
  try {
    const { sqlQuery, sqlQueryArr } = queryProductFabrics(productSlug);
    const [productFabrics] = await MyPool.execute(sqlQuery, sqlQueryArr);
    return productFabrics;
  } catch (e) {
    logError("getProductFabrics", e.message);
    throw e;
  }
};

// get the product colors based on product slug
const getProductColors = async (productSlug) => {
  try {
    const { sqlQuery, sqlQueryArr } = queryProductColors(productSlug);
    const [productColors] = await MyPool.execute(sqlQuery, sqlQueryArr);
    return productColors;
  } catch (e) {
    logError("getProductColors", e.message);
    throw e;
  }
};
export {
  getCategoryProducts,
  getProductDetails,
  getProductFabrics,
  getProductColors,
};
