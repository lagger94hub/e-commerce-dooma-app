import MyPool from "../db/db"

// every time a category update/insert/delete occurs this function should be called to update the paths of categories in the paths table

const updatePath = async () => {
  const [categories] = await MyPool.execute('select id, path_id from categories')
    for (const category of categories)
    {
      let finalPath = ''
      const [paths] = await MyPool.execute(`
      with recursive cte (id, name, parent_id) as (
        select     id,
                   name,
                   parent_id
        from       categories
        where      id = ?
        union all
        select     c.id,
                   c.name,
                   c.parent_id
        from       categories c
        inner join cte
                on c.id = cte.parent_id
      )
      select * from cte
      `, [category.id])
      for (const path of paths) {
        finalPath = `/${path.name.toLowerCase().replace(' ', '-')}${finalPath}`
      }
      await MyPool.execute('UPDATE paths SET path_to_root = ? WHERE id = ?', [finalPath, category.path_id])
    }
}
export default updatePath