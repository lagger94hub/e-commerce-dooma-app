import { useContext, useState, useCallback } from "react";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faBars, faBagShopping, faSearch } from "@fortawesome/free-solid-svg-icons";

import classes from "./_nav.module.scss";
import CategoryMenu from "./../menus/category-menu/CategoryMenu";
import { MediaQueryContext } from "../../../store/media-query-context";

const Nav = (props) => {

  const isDesktop = useContext(MediaQueryContext)
  // here depending on the screen size we either show the menu by default or not
  // in Next.js because the server prerenders every page, the server can't tell the value of the media query beforehand
  const [showMenu, setShowMenu] = useState(false);
  const showMenuHandler = useCallback(() => {
    setShowMenu(!showMenu);
  }, [setShowMenu, showMenu])
  

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

      {/* easy access list */}
      <ul className={`${classes.icons_list} flex-row gap-8p fjust-start falign-center`}>
        <li>
          <FontAwesomeIcon icon={faSearch} />
        </li>
        <li>
          <FontAwesomeIcon icon={faUser} />
        </li>
        <li>
          <Link href={'/cart'}>
            <FontAwesomeIcon icon={faBagShopping} />
          </Link>
        </li>
        <li onClick={showMenuHandler} className={classes.barsicon}>
          <FontAwesomeIcon icon={faBars} />
        </li>
      </ul>
    </nav>
  );
};
export default Nav;
