import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faBars } from "@fortawesome/free-solid-svg-icons";

import classes from "./_nav.module.scss";
import DropDownItem from "./drop-down-item/DropDownItem";
import dummyCategories from "../../../dummy-data/dummy-categories";
import CategoryMenu from "./category-menu/CategoryMenu";

const Nav = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const showCategoryMenu = () => {
    // List of categories comming from props
    for (let i = 0; i < dummyCategories.length; i++) {
      for (let j = 0; j < dummyCategories.length; j++) {
        if (dummyCategories[i].id === dummyCategories[j].parentId)
          dummyCategories[i].children.push(j);
      }
    }
    setShowMenu(true);
  };

  return (
    <nav className={`${"flex-row fjust-between"} ${classes.nav}`}>
      {/* categories list */}
      <ul>
        <DropDownItem itemTitle={"category 1"} />
        <DropDownItem itemTitle={"category 2"} />
      </ul>
      {/* icons list */}
      <ul>
        <li>
          <FontAwesomeIcon icon={faShoppingCart} />
        </li>
        <li onClick={showCategoryMenu}>
          <FontAwesomeIcon icon={faBars} />
        </li>
      </ul>
      {/* CategoryMenu For Mobile */}
      {showMenu && (
        <CategoryMenu
          setShowMenu={setShowMenu}
          categories={dummyCategories}
        />
      )}
      {/* CategoryMenu For Desktop */}
    </nav>
  );
};
export default Nav;
