import MyPool from "../db/db";
// getting the menus

export default async function getCategories() {
  try {
    const [rows] = await MyPool.execute("select id, name, parent_id from categories WHERE visible = 1");
    const categories = []

    // this double loop can be improved 
    for (let i = 0; i < rows.length; i++) {
      if (!categories[i])
        categories.push({
          id: rows[i].id,
          name: rows[i].name,
          parentId: rows[i].parent_id,
          children: []
        })
      for (let j = 0; j < rows.length; j++) {
        if (rows[i].id === rows[j].parent_id)
          categories[i].children.push(j);
      }
    }
    console.log(categories);

    return categories
  } catch (e) {
    throw e
  }
}
