import { getNavCategories, getDisplayCategories } from "../utils/getCategories";
import updatePaths from '../utils/updatePaths'
import MyPool from "../db/db";

export default async function getProps() {
  try {
    // get site settings
    const [siteSettings] = await MyPool.execute(
      `SELECT component_id, setting_key, setting_value from settings`,);

    await updatePaths()

    // get navCategories
    const navCategories = await getNavCategories();



    //  get display 0 content
    const display0 = await getDisplayCategories(0)

    //  get display 1 content
    const display1 = await getDisplayCategories(1)

    //  other carousals and data
    return {
      siteSettings,
      navCategories,
      display0,
      display1
    };
  } catch (e) {
    throw e;
  }
}
