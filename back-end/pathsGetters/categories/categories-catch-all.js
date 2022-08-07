import MyPool from "../../db/db"

export default async function getPaths() {
  try {
    // all visible categories are prerendered and cached
    const [categories] = await MyPool.execute(`
    SELECT p.path_to_root from categories c JOIN paths p ON c.path_id = p.id WHERE c.visible = 1`)
    const paths = categories.map((category) => {
      let path = category.path_to_root.split('/')
      return {
        params: {
          categories: path.filter((segment, index) => index > 1)
        }
      }
    })
    return paths
  } catch (e) {
    console.log(e.message)
    throw e
  }
}