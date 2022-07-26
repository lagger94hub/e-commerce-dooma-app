const queries = {
  // paths related
  getRootParent: `
  with recursive cte (id, slug, name, parent_id) as (
    select     id,
               slug,
               name,
               parent_id
    from       categories
    where      id = ?
    union all
    select     c.id,
               c.slug,
       c.name,
               c.parent_id
    from       categories c
    inner join cte
            on c.id = cte.parent_id
  )
  select * from cte
  `,
  getCategoryPath: `
  SELECT path_to_root FROM paths pa 
  JOIN categories c ON c.path_id = pa.id
  JOIN products p ON p.category_id = c.id
  WHERE p.slug = ?
  `,

  // products related
  allProductsMinimal: `
  SELECT co.name AS product_color, f.name AS product_fit, group_concat(DISTINCT s.width_length) as width_length, group_concat(DISTINCT s.size) as size, p.price AS product_price, 
  d.amount AS discount_amount, d.end_date AS discount_end_date,
  (p.price - p.price * (d.amount/100)) AS after_discount  
  FROM products p JOIN product_records pr ON pr.product_id = p.id
  JOIN categories c ON p.category_id = c.id
  JOIN paths pa ON c.path_id = pa.id
  LEFT OUTER JOIN discounts d ON c.discount_id = d.id
  JOIN colors co ON co.id = pr.color_id
  JOIN fits f ON f.id = p.fit_id
  JOIN sizes s ON s.id = pr.size_id
  WHERE (pa.path_to_root LIKE ?) AND pr.visible = 1 
  GROUP BY pr.product_id, pr.color_id
`,
  cachedProducts: `
  SELECT p.slug, c.id AS color_id FROM products p 
  JOIN product_records pr ON pr.product_id = p.id
  JOIN colors c ON pr.color_id = c.id
  WHERE pr.cached = 1 AND pr.visible = 1
  GROUP BY pr.color_id, p.id`,

  productDetails: `
  SELECT p.slug, p.name AS product_name, p.description, c.name AS color_name, c.id AS color_id, f.name AS fit, 
  dis.amount AS discount_amount, dis.name AS discount_name, p.price AS price, 
  GROUP_CONCAT(DISTINCT ph.url) AS photos_urls, GROUP_CONCAT(DISTINCT CONCAT(s.size,',',pr.stock) SEPARATOR ';') AS size_stocks, GROUP_CONCAT(DISTINCT CONCAT(s.width_length,',',pr.stock) SEPARATOR ';') AS width_length_stocks
  FROM products p  
  LEFT OUTER JOIN product_records pr ON pr.product_id = p.id
  LEFT OUTER JOIN categories cat ON p.category_id = cat.id
  LEFT OUTER JOIN discounts dis ON dis.id = cat.discount_id
  LEFT OUTER JOIN colors c ON c.id = pr.color_id
  LEFT OUTER JOIN sizes s ON s.id = pr.size_id
  LEFT OUTER JOIN fits f ON p.fit_id = f.id
  LEFT OUTER JOIN product_photo_records ppr ON ppr.color_id = pr.color_id AND ppr.product_id = pr.product_id
  LEFT OUTER JOIN photos ph ON ppr.photo_id = ph.id
  WHERE pr.color_id = ? AND p.slug = ? AND pr.visible = 1
  GROUP BY p.slug, p.name, c.name, c.id`,

  productFabrics: `
  select f.name AS fabric_name, ph.percentage 
  FROM product_fabrics ph LEFT OUTER JOIN products p ON p.id = ph.product_id
  LEFT OUTER JOIN fabrics f ON ph.fabric_id = f.id
  WHERE p.slug = ?
  ORDER BY ph.percentage DESC`,

  productColors: `
  SELECT pr.color_id, c.name AS color_name FROM product_records pr
  LEFT OUTER JOIN products p ON p.id = pr.product_id
  LEFT OUTER JOIN colors c ON c.id = pr.color_id
  WHERE p.slug = ?
  GROUP BY pr.color_id
  `,
};
export default queries;
