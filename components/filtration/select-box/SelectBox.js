import { useCallback } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCheck,
  faChevronDown,
  faChevronRight,
  faChevronUp,
  faSort,
} from "@fortawesome/free-solid-svg-icons";

import classes from "./_select-box.module.scss";
import {
  toFriendlyBoxItemName,
  toFriendlyBoxName,
} from "../../../utils/user-friendly-content";
const SelectBox = (props) => {
  const disptach = props.dispatch;
  const { name, items, open } = props.data;
  const boxIndex = props.boxIndex;
  const isDesktop = props.isDesktop;
  const shape = props.shape;
  const hideFilterMenu= props.hideFilterMenu
  // like the sort box has an icon with it
  const iconed = props.iconed;

  // close and open drop-down menu
  const toggleBox = useCallback(() => {
    disptach({ type: "toggle-box", boxIndex });
  }, [boxIndex, disptach]);

  // select item from box
  const selectItem = useCallback(
    (itemIndex, itemName) => {
        disptach({
          type: "select-item",
          boxIndex,
          itemIndex,
          boxName: name,
          itemName,
          first: true,
        });
        hideFilterMenu()
    },
    [disptach, boxIndex, name, hideFilterMenu]
  );
  return (
    <div className={classes.wrapper}>
      <div
        className={`${classes.header} flex-row fjust-between`}
        onClick={toggleBox}
      >
        {iconed && (
          <FontAwesomeIcon icon={faSort} className={classes["sort-icon"]} />
        )}
        <span>{toFriendlyBoxName(name)}</span>
        {isDesktop && !iconed && (
          <span>
            {open ? (
              <FontAwesomeIcon icon={faChevronUp} className={classes.chevup} />
            ) : (
              <FontAwesomeIcon
                icon={faChevronDown}
                className={classes.chevdown}
              />
            )}
          </span>
        )}
        {!isDesktop && !iconed && (
          <FontAwesomeIcon
            icon={faChevronRight}
            className={classes.chevright}
          />
        )}
      </div>
      <ul
        className={`${isDesktop ? classes.body : classes["body-mobile"]} ${
          open ? null : classes.closed
        }`}
      >
        {!isDesktop && <h3>{toFriendlyBoxName(name)}</h3>}
        {!isDesktop && (
          <FontAwesomeIcon
            icon={faArrowLeft}
            className={classes.back}
            onClick={toggleBox}
          />
        )}
        {items &&
          items.length &&
          items.map((item, index) => {
            return (
              <li
                key={index}
                className={`flex-row fjust-start falign-center gap-8p`}
                onClick={() => selectItem(index, item.name)}
              >
                {isDesktop && (
                  <span
                    className={
                      item.checked
                        ? `${classes[shape]} ${classes.checked}`
                        : classes[shape]
                    }
                  ></span>
                )}
                {!item.quantity && (
                  <span>{toFriendlyBoxItemName(name, item.name)}</span>
                )}
                {item.quantity && (
                  <span>
                    {toFriendlyBoxItemName(name, item.name)} ({item.quantity})
                  </span>
                )}
                {!isDesktop && item.checked && (
                  <FontAwesomeIcon
                  style={{paddingRight: '1.5rem', fontSize: '1.5rem'}}
                  icon={faCheck}/>
                )}
              </li>
            );
          })}
      </ul>
    </div>
  );
};
export default SelectBox;
