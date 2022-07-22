import classes from "./_d-category-details.module.scss";
import { Fragment } from "react";
import Link from "next/link";

const DCategoryDetails = (props) => {
  const children = props.selectedMenu.children;
  const categories = props.categories;
  const parentName = props.selectedMenu.name
  const parentFont = props.parentFont <= 0.7 ? 0.7 : props.parentFont;
  const childFont = props.childFont <= 0.625 ? 0.625 : props.parentFont;
  const padding = props.padding >= 4 ? 4 : props.padding;

  const list = props.list;

  return (
    <div className={classes.details}>
      <ul className={list ? classes.column : classes.row}>
        {children.map((child) => {
          return (
            <Fragment key={categories[child].id}>
              {categories[child].children.length ? (
                <>
                  <li
                    className={classes.parent}
                    style={{
                      fontSize: `${parentFont}rem`,
                      paddingLeft: `${padding}rem`,
                    }}
                  >
                    <strong>
                      <Link href={`${parentName}/${categories[child].name}`}>
                        {categories[child].name}
                      </Link>
                    </strong>

                    <DCategoryDetails
                      categories={categories}
                      list={true}
                      selectedMenu={{
                        children: categories[child].children,
                        name: `${parentName}/${categories[child].name}`
                      }}
                      childFont={childFont - 0.1}
                      parentFont={parentFont - 0.1}
                      padding={padding + 0.1}
                    />
                  </li>
                </>
              ) : (
                <li
                  className={classes.child}
                  style={{
                    fontSize: `${childFont}rem`,
                    paddingLeft: `${padding}rem`,
                  }}
                >
                  <Link href={`${parentName}/${categories[child].name}`}>
                    {categories[child].name}
                  </Link>
                </li>
              )}
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
};
export default DCategoryDetails;
