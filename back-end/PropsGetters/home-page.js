import getCategories from "../utils/getCategories";
import MyPool from "../db/db";

export default async function getProps() {
  try {
    // get site settings
    const [siteSettings] = await MyPool.execute(
      `SELECT component_id, setting_key, setting_value from settings`,);

    // get categories
    const categories = await getCategories();



    //  get carousal 0 content
    const [carousal0] = await MyPool.execute(
      `SELECT cc.carousal_id, ca.name AS carousal_name, p.url, c.id AS item_id, c.name AS item_name, pa.path_to_root AS item_path, c.parent_id,  d.name AS discount_name, d.amount FROM category_carousals cc
    LEFT JOIN carousals ca ON cc.carousal_id = ca.id
    LEFT JOIN photos p ON p.category_id = cc.category_id
    LEFT JOIN categories c ON cc.category_id = c.id
    LEFT JOIN discounts d ON c.discount_id = d.id
    LEFT JOIN paths pa ON c.path_id = pa.id
    WHERE cc.carousal_id = ? AND c.visible = 1`,
      [0]
    );

    //  other carousals and data
    return {
      siteSettings,
      categories,
      carousal0,
    };
  } catch (e) {
    throw e;
  }
}
