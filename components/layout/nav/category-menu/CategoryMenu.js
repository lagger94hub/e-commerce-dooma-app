import { useContext, useEffect, useState } from "react";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import DimDisplay from "../../../ui/dim-display/DimDisplay";
import classes from "./_category-menu.module.scss";
import { DimmerContext } from "../../../../store/dimmer-context";
import CategoryMenuDetails from "../category-menu-details/CategoryMenuDetails";
import dummyCategories from "../../../../dummy-data/dummy-categories";
import Logo from "../../logo/Logo";

// menu  to show categories and sub-categories
const CategoryMenu = (props) => {
  const toggleDimmer = useContext(DimmerContext).toggleDimmer;

  const isDesktop = props.isDesktop;
  const setShowMenu = props.setShowMenu;

  const [selectedMenu, setSelectedMenu] = useState(null);
  const [touchCoor, setTouchCoor] = useState()

  useEffect(() => {
    toggleDimmer(!isDesktop);
  }, [toggleDimmer, isDesktop]);

  const closeMenu = () => {
    toggleDimmer(false);
    setShowMenu(false);
  };
  const selectMenu = (children, name) => {
    setSelectedMenu({
      children,
      name,
    });
  };
  const goBack = () => {
    setSelectedMenu(null);
  };
  const touchStartHandler = () => {

  }
  const menuLogic = (category) => {
    const item = (
      <li
        onTouchStart={touchStartHandler}
        key={category.id}
        onClick={() => selectMenu(category.children, category.name)}
      >
        {category.name}
      </li>
    );
    if (isDesktop) {
      if (selectedMenu) return item;
      else return item;
    }
    // mobile
    else {
      if (selectedMenu) return;
      else return item;
    }
  };
  return (
    <>
      <DimDisplay showContent={setShowMenu} />
      <div className={classes.wrapper}>
        {!isDesktop && (
          <div className="flex-row fjust-between falign-center">
            <div className="flex-row falign-center gap-8p">
              {!selectedMenu && (
                <Logo
                  src={"/images/site/logo-dark.png"}
                  alt={"site logo"}
                  height={50}
                  width={50}
                  className={"logo"}
                />
              )}
              {selectedMenu && (
                <FontAwesomeIcon icon={faArrowLeft} onClick={goBack} />
              )}
              {selectedMenu && <p>{selectedMenu.name}</p>}
            </div>
            <span onClick={closeMenu}>x</span>
          </div>
        )}
        <ul className={classes.menu}>
          {dummyCategories.map((category, index) => {
            return !category.parentId && menuLogic(category);
          })}
          {/* depending on the screen width we render one of the menu components */}
          {selectedMenu && (
            <li>
              <CategoryMenuDetails
                selectedMenu={selectedMenu}
                categories={dummyCategories}
                childFont={1.5}
                parentFont={1.5}
                padding={0.5}
              />
            </li>
          )}
        </ul>
      </div>
    </>
  );
};
export default CategoryMenu;
