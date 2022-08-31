import { getNavCategories } from "../../../categories/getCategories";
import { getSiteSettings } from "../../../utils/siteSettings";
import { getCategoriesPaths } from "../../../categories/paths";
import { logError } from "../../../utils/errorsLib";
import { getCategoryProducts } from "../../../products/getProducts";
import { createFilterData } from "../../../products/filtration/filterData";

export default async function getProps(context) {
  const { categories } = context.params;
  const urlQuery = context.query;
  const noQueryUrl = context.resolvedUrl.split("?")[0];
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

    // get filtered products using url query
    const filteredProducts = await getCategoryProducts(noQueryUrl, urlQuery, {
      filtered: true,
    });
    
    // this is used by createFilterData
    const allProducts = await getCategoryProducts(noQueryUrl, urlQuery, {
      filtered: false, minimalData: true
    });
    // create filtration data
    const filterData = createFilterData(
      allProducts,
      filteredProducts,
      urlQuery
    );


    return {
      siteSettings,
      navCategories,
      pathsToRoot,
      filteredProducts,
      filterData,
    };
  } catch (e) {
    logError("getProps", e.message);
    throw e;
  }
}
