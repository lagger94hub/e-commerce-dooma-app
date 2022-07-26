import { useContext, useEffect, useState } from "react";
import Link from "next/link";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import DimDisplay from "../../../ui/dim-display/DimDisplay";
import classes from "./_category-menu.module.scss";
import { DimmerContext } from "../../../../store/dimmer-context";
// import dummyCategories from "../../../../dummy-data/dummy-categories";
import Logo from "../../logo/Logo";
import CategoryDetails from "../category-menu-details/CategoryDetails";
import { CategoriesContext } from "../../../../store/categories-context";

// menu  to show categories and sub-categories
const CategoryMenu = (props) => {
  const toggleDimmer = useContext(DimmerContext).toggleDimmer;
  const categories = useContext(CategoriesContext).categories

  const isDesktop = props.isDesktop;
  const setShowMenu = props.setShowMenu;

  const [selectedMenu, setSelectedMenu] = useState(null);
  const [timerDone, setTimerDone] = useState(false);
  const [leftMenu, setLeftMenu] = useState(true);

  const closeMenu = () => {
    toggleDimmer(false);
    setShowMenu(false);
  };
  const selectMenu = (children, name) => {
    if (!children.length)
    return
    setLeftMenu(false);
    setSelectedMenu({
      children,
      name,
    });
  };
  const goBack = () => {
    setSelectedMenu(null);
  };
  const enterMenu = () => {
    setLeftMenu(false);
  };
  const leaveMenu = () => {
    setLeftMenu(true);
  };
  const leaveNav = () => {
    setTimerDone(false);
    setLeftMenu(true);
    setTimeout(() => {
      setTimerDone(true);
    }, 300);
  };
  useEffect(() => {
    if (timerDone) {
      if (leftMenu) setSelectedMenu(null);
    }
  }, [timerDone, leftMenu]);

  useEffect(() => {
    toggleDimmer(!isDesktop);
  }, [toggleDimmer, isDesktop]);

  const menuLogic = (category) => {
    const item = (
      <li
        className={!isDesktop ? classes.mobile : null}
        key={category.id}
        onClick={() => selectMenu(category.children, category.name)}
        onMouseEnter={() => selectMenu(category.children, category.name)}
        onMouseLeave={() => leaveNav()}
      >
        {isDesktop ? (
          <Link href={`/${category.name.toLowerCase()}`}>{category.name}</Link>
        ) : (
          category.name
        )}
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
          {categories && categories.map((category, index) => {
            return !category.parentId && menuLogic(category);
          })}
          {/* depending on the screen width we render one of the menu components */}
          {selectedMenu && (
            <li
              className={isDesktop ? classes.desktop : classes.mobile}
              onMouseEnter={() => {
                if (!isDesktop) return;
                enterMenu();
              }}
              onMouseLeave={() => {
                if (!isDesktop) return;
                leaveMenu();
              }}
            >
              <CategoryDetails
                selectedMenu={selectedMenu}
                categories={categories}
                childFont={isDesktop ? 1.2 : 1.5}
                parentFont={isDesktop ? 1.2 : 1.5}
                padding={isDesktop ? 0.1 : 0.5}
                isDesktop={isDesktop}
              />
            </li>
          )}
        </ul>
      </div>
    </>
  );
};
export default CategoryMenu;
