import { useContext, useEffect, useState } from "react";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import DimDisplay from "../../../ui/dim-display/DimDisplay";
import classes from "./_category-menu.module.scss";
import { DimmerContext } from "../../../../store/dimmer-context";
import MCategoryDetails from "../category-menu-details-mobile/MCategoryDetails";
import DCategoryDetails from "../category-menu-details-desktop/DCategoryDetails";
import dummyCategories from "../../../../dummy-data/dummy-categories";
import Logo from "../../logo/Logo";

// menu  to show categories and sub-categories
const CategoryMenu = (props) => {
  const toggleDimmer = useContext(DimmerContext).toggleDimmer;

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
    setLeftMenu(false)
    setSelectedMenu({
      children,
      name,
    });
  };
  const goBack = () => {
    setSelectedMenu(null);
  };
  const enterMenu = () => {
    setLeftMenu(false)
  }
  const leaveMenu = () => {
    setLeftMenu(true)
  }
  const leaveNav = () => {
    setTimerDone(false)
    setLeftMenu(true)
    setTimeout(() => {
      setTimerDone(true)
    }, 300)
  }
  useEffect(() => {
    if (timerDone) {
      if (leftMenu)
        setSelectedMenu(null)
    }
  }, [timerDone, leftMenu])



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
          {selectedMenu && !isDesktop && (
            <li className={classes.mobile}>
              <MCategoryDetails
                selectedMenu={selectedMenu}
                categories={dummyCategories}
                childFont={1.5}
                parentFont={1.5}
                padding={0.5}
              />
            </li>
          )}
          {selectedMenu && isDesktop && (
            <li
              className={classes.desktop}
              onMouseEnter={ () => enterMenu()}
              onMouseLeave={ () => leaveMenu()}
            >
              <DCategoryDetails
                selectedMenu={selectedMenu}
                categories={dummyCategories}
                childFont={1.2}
                parentFont={1.2}
                padding={0.1}
              />
            </li>
          )}
        </ul>
      </div>
    </>
  );
};
export default CategoryMenu;
