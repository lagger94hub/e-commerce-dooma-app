import { logError } from "../../utils/errorsLib";
import { getSiteSettings } from "../../utils/siteSettings";
import { getNavCategories } from "../../categories/getCategories";
import { getProductDetails } from "../../products/getProducts";

export default async function getProps(productSlug, colorId) {
  try {
    // get site settings
    const siteSettings = await getSiteSettings()
    // get navCategories
    const navCategories = await getNavCategories();

    // get the products details based on the product slug and colorid
    const productDetails = await getProductDetails(productSlug, colorId)

    // remember to check if the entered colorID and productId are wrong

    return {
      siteSettings,
      navCategories,
      productDetails
    }
  } catch (e) {
    logError('getProps', e.message)
    throw e
  }
}