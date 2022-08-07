import MyPool from "../db/db"
import queries from "./queries"

// every time a category update/insert/delete occurs this function should be called to update the paths of categories in the paths table

const updatePath = async () => {
  const [categories] = await MyPool.execute('select id, path_id from categories')
    for (const category of categories)
    {
      let finalPath = ''
      const [paths] = await MyPool.execute(queries.getRootParent, [category.id])
      for (let i=0; i < paths.length; i++) {
        if (i === 0)
          finalPath = `/${paths[0].slug}${finalPath}-c${paths[0].id}`
        else
          finalPath = `/${paths[i].slug}${finalPath}`
      }
      finalPath = '/categories' + finalPath
      await MyPool.execute('UPDATE paths SET path_to_root = ? WHERE id = ?', [finalPath, category.path_id])
    }
}
export default updatePath