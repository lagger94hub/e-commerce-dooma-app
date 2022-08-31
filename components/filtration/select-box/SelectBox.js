import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import classes from "./_select-box.module.scss";
import { useCallback } from "react";
const SelectBox = (props) => {

  const disptach = props.dispatch;
  const { name, items, open } = props.data;
  const boxIndex = props.boxIndex;

  // close and open drop-down menu
  const toggleBox = useCallback(() => {
    disptach({ type: "toggle-box", boxIndex });
  }, [boxIndex, disptach])

  // select item from box
  const selectItem = useCallback((itemIndex, itemName) => {
    disptach({ type: "select-item", boxIndex, itemIndex, name, itemName})
  }, [disptach, boxIndex, name])

  return (
    <div className={classes.wrapper}>
      <div
        className={`${classes.header} flex-row fjust-between`}
        onClick={toggleBox}
      >
        <span>{name}</span>
        <span>
          {open ? (
            <FontAwesomeIcon icon={faChevronUp} />
          ) : (
            <FontAwesomeIcon icon={faChevronDown} />
          )}
        </span>
      </div>
      <ul className={`${classes.body} ${open ? null : classes.closed}`}>
        {items &&
          items.length &&
          items.map((item, index) => {
            return (
              <li key={index} className={`flex-row fjust-start gap-8p`} onClick={() => selectItem(index, item.name)}>
                <span
                  className={
                    item.checked
                      ? `${classes.box} ${classes.checked}`
                      : classes.box
                  }
                ></span>
                {!item.quantity && <span>{item.name}</span>}
                {item.quantity && (
                  <span>
                    {item.name} ({item.quantity})
                  </span>
                )}
              </li>
            );
          })}
      </ul>
    </div>
  );
};
export default SelectBox;
