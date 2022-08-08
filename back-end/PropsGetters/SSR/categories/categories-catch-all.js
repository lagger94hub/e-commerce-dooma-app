import { getNavCategories } from "../../../categories/getCategories";
import { getSiteSettings } from "../../../utils/siteSettings";
import { getCategoriesPaths } from '../../../categories/paths'
import { logError } from "../../../utils/errorsLib";

export default async function getProps(context) {
  const { categories } = context.params;

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


    return {
      siteSettings,
      navCategories,
      pathsToRoot
    };
  } catch (e) {
    logError('getProps', e.message)
    throw e;
  }
}
