import MyPool from "../db/db";
import { logError } from "../utils/errorsLib";


// generate filterstring and queryArr and orderString
const queryFilterUtil = (categoryPath, query) => {
  const queryArr = [`${categoryPath}%`]
  let filterString = ''
  let orderString = ''
  for (let param in query) {
    switch(param) {
      case 'color': {
        filterString+= `AND co.name= ? `
        queryArr.push(query[param])
        break
      }
      case 'fit': {
        filterString+= `AND f.name= ? `
        queryArr.push(query[param])
        break
      }
      case 'width': {
        filterString+= ` AND s.width= ? `
        queryArr.push(query[param])
        break
      }
      case 'length': {
        filterString+= `AND s.length= ? `
        queryArr.push(query[param])
        break
      }
      case 'price': {
        let min = query[param].split('-')[0]
        let max = query[param].split('-')[1]
        filterString+= `AND (pr.price >= ? AND pr.price <= ?)`
        queryArr.push(min)
        queryArr.push(max)
        break
      }
      case 'sort': {
        if (query[param] === 'ds-rate') {
          orderString = 'ORDER BY d.amount DESC'
        }
        if (query[param] === 'price-asc') {
          orderString = 'ORDER BY pr.price ASC'
        }
        if (query[param] === 'price-desc') {
          orderString = 'ORDER BY pr.price DESC'
        }
        break
      }
      default: break
    }  
  }
  if (!orderString) {
    orderString = 'ORDER BY pr.created_at DESC'
  }
  return { queryArr, filterString, orderString}
}

// get the products list in the catch all categories 
const getProductsList = async (categoryPath, query) => {

  const { queryArr, filterString, orderString } = queryFilterUtil(categoryPath, query)

  

  try {
  // get the featured productsList according to filters
  const [products] = await MyPool.execute(`SELECT  p.id AS product_id, p.slug AS product_slug, p.name AS product_name, co.name AS product_color, co.id AS color_id,
  f.name AS product_fit, group_concat(DISTINCT s.width) as width, group_concat(DISTINCT s.length) as length, group_concat(DISTINCT pr.price) AS product_price, 
  d.amount AS discount_amount, d.end_date AS discount_end_date, pr.created_at, group_concat(DISTINCT ph.url) AS images_urls
  FROM products p JOIN product_records pr ON pr.product_id = p.id
  JOIN categories c ON p.category_id = c.id
  JOIN paths pa ON c.path_id = pa.id
  LEFT OUTER JOIN discounts d ON c.discount_id = d.id
  JOIN product_photo_records ppr 
  ON ppr.color_id = pr.color_id  AND ppr.product_id = pr.product_id
  JOIN photos ph ON ppr.photo_id = ph.id
  JOIN colors co ON co.id = pr.color_id
  JOIN fits f ON f.id = p.fit_id
  JOIN sizes s ON s.id = pr.size_id
  WHERE (pa.path_to_root LIKE ?) AND pr.visible = 1 AND pr.featured = 1 ${filterString}
  GROUP BY pr.product_id, pr.color_id
  ${orderString}
`, queryArr);

  return JSON.parse(JSON.stringify(products))

  } catch (e) {
    logError('getProductsList', e.message, { isSource: true })
    throw e
  }
};
export { getProductsList };
