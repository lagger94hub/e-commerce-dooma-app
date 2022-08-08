import MyPool from "../db/db";
import queries from "../utils/queries";
import { logError } from "../utils/errorsLib";

// every time a category update/insert/delete occurs this function should be called to update the paths of categories in the paths table

const updateCategoriesPaths = async () => {
  try {
    const [categories] = await MyPool.execute(
      "select id, path_id from categories"
    );
    for (const category of categories) {
      let finalPath = "";
      const [paths] = await MyPool.execute(queries.getRootParent, [
        category.id,
      ]);
      for (let i = 0; i < paths.length; i++) {
        // if (i === 0)
        //   finalPath = `/${paths[0].slug}${finalPath}-c${paths[0].id}`
        // else
        finalPath = `/${paths[i].slug}${finalPath}`;
      }
      finalPath = "/categories" + finalPath;
      await MyPool.execute("UPDATE paths SET path_to_root = ? WHERE id = ?", [
        finalPath,
        category.path_id,
      ]);
    }
  } catch (e) {
    logError('updateCategoriesPaths', e.message, { isSource: true })
    throw e;
  }
};

const getCategoriesPaths = async (params) => {
  
  let pathsToRoot = [];
  let parent_id = null;
  try {
    for (let i = 0; i < params.length; i++) {
      const [result] = 
      parent_id ? 
      await MyPool.execute(`SELECT c.id, c.name, p.path_to_root FROM categories c JOIN paths p ON
      c.path_id = p.id
      WHERE visible=1 AND parent_id=? AND c.slug =?`, [parent_id, params[i]]) 
      :
      await MyPool.execute(`SELECT c.id, c.name, p.path_to_root FROM categories c JOIN paths p ON
      c.path_id = p.id
      WHERE visible=1 AND c.slug =?`, [params[i]])
      if (!result.length) return null;
      pathsToRoot.push(result[0]);
      parent_id = result[0].id;
    }
    return pathsToRoot
  } catch (e) {
    logError('validUrlParams', e.message, { isSource: true })
    throw e;
  }
};

export {
  getCategoriesPaths,
  updateCategoriesPaths
}