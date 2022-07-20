import DimDisplay from "../../../ui/dim-display/DimDisplay";
import classes from "./_category-menu.module.scss";

// menu suitable for mobile devices to show categories and sub-categories
const CategoryMenu = (props) => {
  return (
    <DimDisplay           
      setShowMenu={props.setShowMenu}>
      <ul className={classes.menu}></ul>
    </DimDisplay>
  );
};
export default CategoryMenu;
