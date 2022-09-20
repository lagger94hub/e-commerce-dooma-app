import { logError } from "../utils/errorsLib";
import MyPool from "../db/db";
import queries from "../db/queries/queries";
// get the cached products' slugs and colors
const getCachedProducts = async () => {
  try {
    // get the cached products' slugs and colors
    const [products] = await MyPool.execute(queries.cachedProducts);
    const paths = [];
    for (let product of products) {
      paths.push({
        params: {
          productSlug: product.slug,
          colorId: product.color_id.toString(),
        },
      });
    }
    return paths;
  } catch (e) {
    logError("getCachedProducts", e.message);
    throw e
  }
};
export { getCachedProducts };
