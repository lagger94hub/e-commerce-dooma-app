import addPersistentToProps from "../../../utils/persistent-data-builder";
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
    const props = {
      pathsToRoot,
      filteredProducts,
      filterData,
    }
    await addPersistentToProps(props)
    return props
  } catch (e) {
    logError("getProps", e.message);
    throw e;
  }
}
