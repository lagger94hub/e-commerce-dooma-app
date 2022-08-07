import MyPool from "../../db/db";
import { getNavCategories } from "../../utils/getCategories";

export default async function getProps(context) {
  const { params } = context
  // validate params

  try {
    // get site settings
    const [siteSettings] = await MyPool.execute(
      `SELECT component_id, setting_key, setting_value from settings`
    );

    // get navCategories
    const navCategories = await getNavCategories();
    return {
      siteSettings,
      navCategories
    }
    // get the corresponding category's products and subcategories if available
    
  } catch (e) {
    throw e;
  }
}
