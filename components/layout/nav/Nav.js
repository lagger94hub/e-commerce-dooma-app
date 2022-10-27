import { useContext, useState, useCallback } from "react";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faBars,
  faBagShopping,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

import classes from "./_nav.module.scss";
import CategoryMenu from "./../menus/category-menu/CategoryMenu";
import { MediaQueryContext } from "../../../store/media-query-context";
import { CartContext } from "../../../store/cart-context";
import AddToCartNot from "../../ui/notifications/add-to-cart-notification/AddToCartNot";

const Nav = (props) => {
  const isDesktop = useContext(MediaQueryContext);
  // here depending on the screen size we either show the menu by default or not
  // in Next.js because the server prerenders every page, the server can't tell the value of the media query beforehand
  const [showMenu, setShowMenu] = useState(false);

  const showMenuHandler = useCallback(() => {
    setShowMenu(!showMenu);
  }, [setShowMenu, showMenu]);

  // get the number of items inside the cart
  const itemsQuant = useContext(CartContext).state.items;

  const notifications = useContext(CartContext).state.notifications

  return (
    <nav className={`${"flex-row fjust-between falign-center"} ${classes.nav}`}>
      {/* CategoryMenu */}
      {/* To keep the nav styling max main categories most not exceed 8 */}
      {(isDesktop || (!isDesktop && showMenu)) && (
        <CategoryMenu setShowMenu={setShowMenu} isDesktop={isDesktop} />
      )}

      {/* easy access list */}
      <ul
        className={`${classes.icons_list} flex-row gap-8p fjust-start falign-center`}
      >
        <li>
          <FontAwesomeIcon icon={faSearch} />
        </li>
        <li>
          <FontAwesomeIcon icon={faUser} />
        </li>
        <li className={classes.cart}>
          <Link href={"/cart"}>
            <a>
              {itemsQuant && itemsQuant.length !== 0 && (
                <span className={classes["cart-count"]}>
                  {itemsQuant.length}
                </span>
              )}
              <FontAwesomeIcon icon={faBagShopping} />
            </a>
          </Link>
        </li>
        <li onClick={showMenuHandler} className={classes.barsicon}>
          <FontAwesomeIcon icon={faBars} />
        </li>
      </ul>
      {notifications && notifications.length !== 0 && notifications.map((notification, index) => {
        return (
          <AddToCartNot key={index} cartData={notification} notificationIndex={index}/>
        )
      })}
    </nav>
  );
};
export default Nav;
