import MyPool from '../db/db'
import { logError } from "../utils/errorsLib";
// getting the menus


const getDisplayCategories = async (displayId) => {
  try {
    const [categories] = await MyPool.execute(
      `SELECT cd.display_id, cd.order AS item_order, d.name AS display_name, p.url, c.id AS item_id, c.name AS item_name, pa.path_to_root AS item_path, c.parent_id,  dis.name AS discount_name, dis.amount FROM category_displays cd
      LEFT JOIN displays d ON cd.display_id = d.id
      LEFT JOIN photos p ON p.category_id = cd.category_id
      LEFT JOIN categories c ON cd.category_id = c.id
      LEFT JOIN discounts dis ON c.discount_id = dis.id
      LEFT JOIN paths pa ON c.path_id = pa.id
      WHERE cd.display_id = ? AND c.visible = 1`,
      [displayId]
    );
    return categories;
  } catch (e) {
    logError('getDisplayCategories', e.message)
    throw e;
  }
};
export { getDisplayCategories };
