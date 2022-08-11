import { getNavCategories } from "../../../categories/getCategories";
import { getSiteSettings } from "../../../utils/siteSettings";
import { getCategoriesPaths } from '../../../categories/paths'
import { logError } from "../../../utils/errorsLib";
import { getProductsList } from "../../../products/getProducts";

export default async function getProps(context) {
  const { categories } = context.params;
  const  { resolvedUrl }  = context
  try { 
    // get categories paths for the root path component
    const pathsToRoot = await getCategoriesPaths(categories)

    if (!pathsToRoot) {
      return
    }
    
    // get site settings
    const siteSettings = await getSiteSettings()

    // get navCategories
    const navCategories = await getNavCategories();

    // get products in productList by categoryPath, no filters applied
    const products = await getProductsList(resolvedUrl)

    return {
      siteSettings,
      navCategories,
      pathsToRoot,
      products
    };
  } catch (e) {
    logError('getProps', e.message)
    throw e;
  }
}
