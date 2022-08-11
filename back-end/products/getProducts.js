import MyPool from "../db/db";
import { logError } from "../utils/errorsLib";

const getProductsList = async (categoryPath) => {
  try {
  // get the initial featured productsList without filters applied
  const [products] = await MyPool.execute(`SELECT  p.id AS product_id, p.slug AS product_slug, p.name AS product_name, co.name AS product_color, co.id AS color_id,
  f.name AS product_fit, group_concat(DISTINCT pr.price) AS product_price, 
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
  WHERE pa.path_to_root = ? AND pr.visible = 1 AND pr.featured = 1
  GROUP BY pr.product_id, pr.color_id
  ORDER BY pr.created_at DESC
  LIMIT 20
`, [categoryPath]);

  return JSON.parse(JSON.stringify(products))

  } catch (e) {
    logError('getProductsList', e.message, { isSource: true })
    throw e
  }
};
export { getProductsList };
