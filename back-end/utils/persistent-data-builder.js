import MyPool from "../db/db";
import { logError } from "./errorsLib";

// because next js caches pages only, some pages has components with persistnet data across components so this data should be sent along with the props object every time we load a page

const getSiteSettings = async () => {
  try {
    const [siteSettings] = await MyPool.execute(
      `SELECT component_id, setting_key, setting_value from settings`,);
    return siteSettings
  } catch (e) {
    logError('getSiteSettings', e.message)
    throw e;
  }
}
const getNavCategories = async () => {
  try {
    const [rows] = await MyPool.execute(`
    select c.id, c.name, c.slug, c.parent_id, p.path_to_root from categories c
    JOIN paths p ON c.path_id = p.id WHERE visible = 1
    `);
    const categories = [];

    // this double loop can be improved
    for (let i = 0; i < rows.length; i++) {
      if (!categories[i])
        categories.push({
          id: rows[i].id,
          name: rows[i].name,
          slug: rows[i].slug,
          parentId: rows[i].parent_id,
          pathToRoot: rows[i].path_to_root,
          children: [],
        });
      for (let j = 0; j < rows.length; j++) {
        if (rows[i].id === rows[j].parent_id) categories[i].children.push(j);
      }
    }

    return categories;
  } catch (e) {
    logError('getNavCategories', e.message)
    throw e;
  }
};
// prepare data for persistent components and add them to props
const addPersistentToProps = async (props) => {
  // get site settings
  props.navCategories = await getNavCategories()
  // get navCategories
  props.siteSettings = await getSiteSettings()
}
export default addPersistentToProps
