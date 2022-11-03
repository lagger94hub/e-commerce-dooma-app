import { logError } from "../../utils/errorsLib";
import {addPersistentToProps} from "../../utils/persistent-data-builder";
import { getProductColors, getProductDetails, getProductFabrics } from "../../products/getProducts";
import { getCategoriesPaths } from "../../categories/paths";

export default async function getProps(productSlug, colorId) {
  try {
    // get categories paths for the root path component
    const pathsToRoot = await getCategoriesPaths(null, productSlug);
    // get the product details based on the product slug and colorid
    const productDetails = await getProductDetails(productSlug, colorId)

    // if no products found 
    if (!productDetails.length) return
    // get the product fabrics by the product slug
    const productFabrics = await getProductFabrics(productSlug)

    // get the product colors by the product slug
    const productColors = await getProductColors(productSlug)


    if (productDetails.length) {
      // Add the product to the path to root
      pathsToRoot.push({ id: productSlug, name: productDetails[0].product_name, path_to_root: `/products/${productSlug}/${colorId}`})
    }
    // add fabrics data to product details
    productDetails.push(productFabrics)
    // add the product colors to the product details
    productDetails.push(productColors)
    const props = {
      pathsToRoot,
      productDetails,
    }
    // add persistent components data to props
    await addPersistentToProps(props)

    return props

  } catch (e) {
    logError('getProps', e.message)
    throw e
  }
}