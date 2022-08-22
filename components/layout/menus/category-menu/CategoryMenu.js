import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import DimDisplay from "../../../ui/dim-display/DimDisplay";
import Logo from "../../logo/Logo";
import CategoryDetails from "../category-menu-details/CategoryDetails";

import { DimmerContext } from "../../../../store/dimmer-context";
import { NavCategoriesContext } from "../../../../store/nav-categories-context";
import { SettingsContext } from "../../../../store/settings-context";

import classes from "./_category-menu.module.scss";

// menu  to show categories and sub-categories
const CategoryMenu = (props) => {
  const toggleDimmer = useContext(DimmerContext).toggleDimmer;
  const siteSettings = useContext(SettingsContext).siteSettings;
  const categories = useContext(NavCategoriesContext).navCategories;

  const isDesktop = props.isDesktop;
  const setShowMenu = props.setShowMenu;

  // filtering header settings of all settings
  const categoryMenuSettings = useMemo(() => {
    if (!siteSettings) return
    return siteSettings.filter((setting) => {
      return setting.component_id === 1;
    });
  }, [siteSettings])
    

  // bring the setting of the logo from the header settings
  const logoSetting = useMemo(() => {

    if (!categoryMenuSettings) return

    return categoryMenuSettings.find((categoryMenuSetting) => {
      return categoryMenuSetting.setting_key === "logoPath";
    });

  }, [categoryMenuSettings])
    
  // states and setStates
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [timerDone, setTimerDone] = useState(false);
  const [leftMenu, setLeftMenu] = useState(true);

  const closeMenu = useCallback(() => {
    toggleDimmer(false);
    setShowMenu(false);
  }, [toggleDimmer, setShowMenu])

  const selectMenu = useCallback((children, slug, name) => {
    if (!children.length) return;
    setLeftMenu(false);
    setSelectedMenu({
      children,
      slug,
      name
    });
  }, [])
  const goBack = useCallback(() => {
    setSelectedMenu(null);
  }, [])

  const enterMenu = useCallback(() => {
    setLeftMenu(false);
  }, [

  ])
  const leaveMenu = useCallback(() => {
    setLeftMenu(true);
  }, [])

  const leaveNav = useCallback(() => {
    setTimerDone(false);
    setLeftMenu(true);
    setTimeout(() => {
      setTimerDone(true);
    }, 300);
  }, [])


  // useEffects
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
        onClick={() => selectMenu(category.children, category.slug, category.name)}
        onMouseEnter={() => selectMenu(category.children, category.slug, category.name)}
        onMouseLeave={() => leaveNav()}
      >
        {isDesktop ? (
          <Link href={category.pathToRoot}><a onClick={() => setSelectedMenu(null)}>{category.name}</a></Link>
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
                  src={logoSetting && logoSetting.setting_value}
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
          {categories &&
            categories.map((category, index) => {
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
                setSelectedMenu={setSelectedMenu}
                categories={categories}
                childFont={isDesktop ? 1.2 : 1.5}
                parentFont={isDesktop ? 1.2 : 1.5}
                padding={isDesktop ? 0.1 : 0.5}
                isDesktop={isDesktop}
                setShowMenu={setShowMenu}
              />
            </li>
          )}
        </ul>
      </div>
    </>
  );
};
export default CategoryMenu;
