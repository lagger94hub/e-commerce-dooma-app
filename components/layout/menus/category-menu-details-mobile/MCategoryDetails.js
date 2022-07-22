import { Fragment, useState } from "react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classes from "./_m-category-details.module.scss";

const CategoryMenuDetails = (props) => {
  // a Component for mobile devices with width of 768px and less
  // we start with the array of children that contains indexes of children categories and for each child we find the corresponding object in the data array and if the object has children we would call the component again
  const children = props.selectedMenu.children;
  const categories = props.categories;
  //  fonts to determine the categories parent and child sizes
  const parentFont = props.parentFont <= 0.7 ? 0.7 : props.parentFont;
  const childFont = props.childFont <= 0.625 ? 0.625 : props.parentFont;
  const padding = props.padding >= 4 ? 4 : props.padding

  const [showSubCategory, setShowSubCategory] = useState(false);

  const toggleCategory = () => {
    setShowSubCategory(!showSubCategory);
  };
  return (
    <div className={classes.details}>
      <ul>
        {children.map((child) => {
          return (
            <Fragment key={categories[child].id}>
              {categories[child].children.length ? (
                <>
                  <li
                    className={classes.parent}
                    onClick={toggleCategory}
                    style={{ fontSize: `${parentFont}rem`, paddingLeft: `${padding}rem` }}
                  >
                    <strong>{categories[child].name}</strong>
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={classes.chevron}
                    />
                  </li>
                  {showSubCategory && (
                    <li>
                      <CategoryMenuDetails
                        selectedMenu={{
                          children: categories[child].children,
                        }}
                        categories={categories}
                        childFont={childFont - 0.3}
                        parentFont={parentFont - 0.3}
                        padding={padding + 0.4}
                        
                      />
                    </li>
                  )}
                </>
              ) : (
                <li 
                className={classes.child}
                style={{ fontSize: `${childFont}rem`, paddingLeft: `${padding}rem` }}>
                  {categories[child].name}
                </li>
              )}
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
};
export default CategoryMenuDetails;
