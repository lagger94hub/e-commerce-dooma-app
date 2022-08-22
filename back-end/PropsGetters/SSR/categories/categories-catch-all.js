import { getNavCategories } from "../../../categories/getCategories";
import { getSiteSettings } from "../../../utils/siteSettings";
import { getCategoriesPaths } from "../../../categories/paths";
import { logError } from "../../../utils/errorsLib";
import { getProductsList } from "../../../products/getProducts";
import { createFilterData } from "../../../products/filtration";

export default async function getProps(context) {
  const { categories } = context.params;
  const { query } = context;
  const noQueryUrl = context.resolvedUrl.split('?')[0];
  try {
    // get categories paths for the root path component
    const pathsToRoot = await getCategoriesPaths(categories);

    if (!pathsToRoot) {
      return;
    }

    // get site settings
    const siteSettings = await getSiteSettings();

    // get navCategories
    const navCategories = await getNavCategories();

    // get products in productList by categoryPath and query params
    const products = await getProductsList(noQueryUrl, query);

    // create filtration data
    const filterData = createFilterData(products, query)

    return {
      siteSettings,
      navCategories,
      pathsToRoot,
      products,
      filterData
    };
  } catch (e) {
    logError("getProps", e.message);
    throw e;
  }
}
