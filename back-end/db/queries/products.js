import queries from "./queries"
import { sqlQueryDependencies } from "./sqlQueryUtils"
// filterd products query
const queryProducts = (categoryPath, urlQuery, options) => {

  
  const { filtered, minimalData } = options;

  if (!categoryPath || !urlQuery)
    throw new Error('Missing argument.')

  // return all products with minimal data for counting purposes
  if (!filtered && minimalData)
    return {sqlQuery: queries.allProductsMinimal, sqlQueryArr: [`${categoryPath}%`]}

  let dependencies = {}
  // based on filterd we either create a sql query to get all products or to get the products that meet certian filters
  if (filtered) {
    dependencies = sqlQueryDependencies(urlQuery, { initialArray: [`${categoryPath}%`] })
  } else {
    dependencies.sqlQueryArr = [`${categoryPath}%`]
  }

  return {
    sqlQuery: `SELECT  p.id AS product_id, p.slug AS product_slug, p.name AS product_name, co.name AS product_color, co.id AS color_id,
    f.name AS product_fit, group_concat(DISTINCT s.width_length) as width_length, group_concat(DISTINCT s.size) as size, group_concat(DISTINCT pr.price) AS product_price, 
    d.amount AS discount_amount, d.end_date AS discount_end_date, pr.created_at, group_concat(DISTINCT ph.url) AS images_urls,
    group_concat(DISTINCT (pr.price - pr.price * (d.amount/100))) AS after_discount
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
    WHERE (pa.path_to_root LIKE ?) AND pr.visible = 1 
   ${dependencies.filterString ? dependencies.filterString : ''}
    GROUP BY pr.product_id, pr.color_id
    ${dependencies.orderString ? dependencies.orderString : ''}
    `,
    sqlQueryArr: dependencies.sqlQueryArr ? dependencies.sqlQueryArr : []
  }
}
const queryProductDetails = (productSlug, colorId) => {
  return {
    sqlQuery: queries.productDetails,
    sqlQueryArr: [colorId, productSlug]
  }
}
export {
  queryProducts,
  queryProductDetails
}
