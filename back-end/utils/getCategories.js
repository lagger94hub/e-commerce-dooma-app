import MyPool from "../db/db";
// getting the menus

  const getNavCategories = async () => {
  try {
    const [rows] = await MyPool.execute(`
    select c.id, c.name, c.slug, c.parent_id, p.path_to_root from categories c
    JOIN paths p ON c.path_id = p.id WHERE visible = 1
    `);
    const categories = []

    // this double loop can be improved 
    for (let i = 0; i < rows.length; i++) {
      if (!categories[i])
        categories.push({
          id: rows[i].id,
          name: rows[i].name,
          slug: rows[i].slug,
          parentId: rows[i].parent_id,
          pathToRoot: rows[i].path_to_root,
          children: []
        })
      for (let j = 0; j < rows.length; j++) {
        if (rows[i].id === rows[j].parent_id)
          categories[i].children.push(j);
      }
    }

    return categories
  } catch (e) {
    throw e
  }
}
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
    return categories
  } catch (e) {
    throw e
  }
}
export {
  getNavCategories,
  getDisplayCategories
}