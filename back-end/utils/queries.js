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
};
export default queries;
