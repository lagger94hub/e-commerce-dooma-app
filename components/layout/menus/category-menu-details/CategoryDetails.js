import classes from "./_category-details.module.scss";
import { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";

const CategoryDetails = (props) => {
  // a Component for mobile devices with width of 768px and less
  // we start with the array of children that contains indexes of children categories and for each child we find the corresponding object in the data array and if the object has children we would call the component again
  const children = props.selectedMenu.children;
  const categories = props.categories;
  const parentSlug = props.selectedMenu.slug
  const isDesktop = props.isDesktop;
  const setShowMenu = props.setShowMenu
  const setSelectedMenu = props.setSelectedMenu

  //  fonts to determine the categories parent and child sizes
  const parentFont = props.parentFont <= 0.9 ? 0.9 : props.parentFont;
  const childFont = props.childFont <= 0.8 ? 0.8: props.parentFont;
  const padding = props.padding >= 4 ? 4 : props.padding;

  // for desktop version
  const list = props.list;
  const myClass = isDesktop ? (list ? classes.column : classes.row) : null;
  const stateInitilaizer = {}
  for (const child of children) {
    stateInitilaizer[child] = false
  }

  //  for mobile version
  const [showSubCategory, setShowSubCategory] = useState(stateInitilaizer);

  const toggleCategory = (child) => {
    setShowSubCategory((oldState) => {
      return {...oldState, [child]: !oldState[child]}
    });
  };
  const closeParentMenu = () => {
    setShowMenu(false)
    setSelectedMenu(null)
  }
  return (
    <div className={classes.details}>
      <ul className={myClass}>
        {children.map((child) => {
          return (
            <Fragment key={categories[child].id}>
              {categories[child].children.length ? (
                <>
                  <li
                    className={classes.parent}
                    onClick={() => {
                      if (isDesktop) return;
                      toggleCategory(child);
                    }}
                    style={{
                      fontSize: `${parentFont}rem`,
                      paddingLeft: `${padding}rem`,
                    }}
                  >
                    <strong>
                      <Link href={categories[child].pathToRoot}>
                        <a onClick={closeParentMenu}>{categories[child].name}</a>
                      </Link>
                    </strong>
                    {!isDesktop && showSubCategory[child] && (
                      <FontAwesomeIcon
                        icon={faChevronUp}
                        className={classes.chevron}
                      />
                    )}
                    {!isDesktop && !showSubCategory[child] && (
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className={classes.chevron}
                      />
                    )}
                    {isDesktop && (
                      <CategoryDetails
                        categories={categories}
                        list={true}
                        selectedMenu={{
                          children: categories[child].children,
                          slug: `${parentSlug}/${categories[child].slug}`,
                        }}
                        childFont={childFont - 0.1}
                        parentFont={parentFont - 0.1}
                        padding={padding + 0.1}
                        isDesktop={isDesktop}
                        setShowMenu={setShowMenu}
                        setSelectedMenu={setSelectedMenu}

                      />
                    )}
                  </li>
                  {!isDesktop && showSubCategory[child] && (
                    <li>
                      <CategoryDetails
                        categories={categories}
                        selectedMenu={{
                          children: categories[child].children,
                          slug: `${parentSlug}/${categories[child].slug}`,
                        }}
                        childFont={childFont - 0.1}
                        parentFont={parentFont - 0.1}
                        padding={padding + 0.4}
                        isDesktop={isDesktop}
                        setShowMenu={setShowMenu}
                        setSelectedMenu={setSelectedMenu}
                      />
                    </li>
                  )}
                </>
              ) : (
                <li
                  className={classes.child}
                  style={{
                    fontSize: `${childFont}rem`,
                    paddingLeft: `${padding}rem`,
                  }}
                >
                  <Link href={categories[child].pathToRoot}>
                    <a onClick={closeParentMenu}>{categories[child].name}</a>
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
export default CategoryDetails;
