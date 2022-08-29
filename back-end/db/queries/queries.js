const queries = {
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
  allProductsMinimal: `
  SELECT co.name AS product_color, f.name AS product_fit, group_concat(DISTINCT s.width_length) as width_length, group_concat(DISTINCT s.size) as size, group_concat(DISTINCT pr.price) AS product_price, 
  d.amount AS discount_amount, d.end_date AS discount_end_date,
  (pr.price - pr.price * (d.amount/100)) AS after_discount  
  FROM products p JOIN product_records pr ON pr.product_id = p.id
  JOIN categories c ON p.category_id = c.id
  JOIN paths pa ON c.path_id = pa.id
  LEFT OUTER JOIN discounts d ON c.discount_id = d.id
  JOIN colors co ON co.id = pr.color_id
  JOIN fits f ON f.id = p.fit_id
  JOIN sizes s ON s.id = pr.size_id
  WHERE (pa.path_to_root LIKE ?) AND pr.visible = 1 AND pr.featured = 1
  GROUP BY pr.product_id, pr.color_id
`
};
export default queries;
