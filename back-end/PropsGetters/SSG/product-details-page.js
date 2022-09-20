import { logError } from "../../utils/errorsLib";
import { getSiteSettings } from "../../utils/siteSettings";
import { getNavCategories } from "../../categories/getCategories";
import { getProductDetails } from "../../products/getProducts";
import { getCategoriesPaths } from "../../categories/paths";

export default async function getProps(productSlug, colorId) {
  try {
    // get site settings
    const siteSettings = await getSiteSettings()
    // get navCategories
    const navCategories = await getNavCategories();

    // get categories paths for the root path component
    const pathsToRoot = await getCategoriesPaths(null, productSlug);
    
    

    // get the products details based on the product slug and colorid
    const productDetails = await getProductDetails(productSlug, colorId)

    if (productDetails.length) {
      // Add the product to the path to root
      pathsToRoot.push({ id: productSlug, name: productDetails[0].product_name, path_to_root: `/products/${productSlug}/${colorId}`})
    }

 
    return {
      siteSettings,
      navCategories,
      pathsToRoot,
      productDetails
    }
  } catch (e) {
    logError('getProps', e.message)
    throw e
  }
}