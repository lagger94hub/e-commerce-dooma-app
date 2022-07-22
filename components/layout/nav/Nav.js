import { useContext, useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faBars } from "@fortawesome/free-solid-svg-icons";

import classes from "./_nav.module.scss";
import CategoryMenu from "./../menus/category-menu/CategoryMenu";
import { MediaQueryContext } from "../../../store/media-query-context";

const Nav = (props) => {

  const desktop = useContext(MediaQueryContext)
  // here depending on the screen size we either show the menu by default or not
  // in Next.js because the server prerenders every page, the server can't tell the value of the media query beforehand
  const [isDesktop, setIsDesktop] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const showMenuHandler = () => {
    setShowMenu(!showMenu);
  };
  useEffect(() => {
    setIsDesktop(desktop);
  }, [setIsDesktop, desktop]);

  return (
    <nav className={`${"flex-row fjust-between falign-center"} ${classes.nav}`}>
      {/* CategoryMenu */}
      {/* To keep the nav styling max main categories most not exceed 8 */}
      {(isDesktop || (!isDesktop && showMenu)) && (
        <CategoryMenu
          setShowMenu={setShowMenu}
          isDesktop={isDesktop}
        />
      )}

      {/* icons list */}
      <ul>
        <li>
          <FontAwesomeIcon icon={faShoppingCart} />
        </li>
        <li onClick={showMenuHandler} className={classes.barsicon}>
          <FontAwesomeIcon icon={faBars} />
        </li>
      </ul>
    </nav>
  );
};
export default Nav;
