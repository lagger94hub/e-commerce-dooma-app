import queries from "./queries"
import { sqlQueryDependencies } from "./sqlQueryUtils"
// filterd products query
const queryProducts = (categoryPath, urlQuery, filtered) => {

  if (!categoryPath || !urlQuery)
    throw new Error('Missing argument.')

  if (!filtered) 
    return {sqlQuery: queries.allProducts, sqlQueryArr: [`${categoryPath}%`]}

  const { sqlQueryArr, filterString, orderString } = sqlQueryDependencies(urlQuery, { initialArray: [`${categoryPath}%`] })

  return {
    sqlQuery: `SELECT  p.id AS product_id, p.slug AS product_slug, p.name AS product_name, co.name AS product_color, co.id AS color_id,
    f.name AS product_fit, group_concat(DISTINCT s.width) as width, group_concat(DISTINCT s.length) as length, group_concat(DISTINCT s.size) as size, group_concat(DISTINCT pr.price) AS product_price, 
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
    `,
    sqlQueryArr
  }
}
export {
  queryProducts
}
