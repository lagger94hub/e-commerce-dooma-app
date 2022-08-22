import { getNavCategories, getDisplayCategories } from "../../categories/getCategories";
import { getSiteSettings } from "../../utils/siteSettings";
import { logError } from "../../utils/errorsLib";
import { updateCategoriesPaths } from "../../categories/paths";


export default async function getProps() {
  try {
    // await updateCategoriesPaths()
    
    // get site settings
    const siteSettings = await getSiteSettings()


    // get navCategories
    const navCategories = await getNavCategories();



    //  get display 0 content
    const display0 = await getDisplayCategories(0)

    //  get display 1 content
    const display1 = await getDisplayCategories(1)

    // get display 2 content
    const display2 = await getDisplayCategories(2)

    // get display 3 content
    const display3 = await getDisplayCategories(3)



    //  other carousals and data
    return {
      siteSettings,
      navCategories,
      display0,
      display1,
      display2,
      display3
    };
  } catch (e) {
    logError('getProps', e.message)
    throw e;
  }
}
