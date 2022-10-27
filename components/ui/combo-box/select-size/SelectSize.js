import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo, useRef } from "react";

import useOutsideClickDetector from "../../../../utils/outside-click-detector-hook";
import classes from "./_select-size.module.scss";
const SelectSize = (props) => {
  const {
    listStyle,
    wrapperStyle,
    options,
    openSelect,
    selectSize,
    selectedSize,
    toggleSelectMenu,
    closeSelectMenu,
    addButtonRef,
  } = useMemo(() => {
    const listStyle = props.listStyle;
    const wrapperStyle = props.wrapperStyle;
    const options = props.sizes;
    const openSelect = props.openSelect;
    const selectedSize = props.selectedSize;
    const toggleSelectMenu = props.toggleSelectMenu;
    const closeSelectMenu = props.closeSelectMenu;
    const selectSize = props.selectSize;
    // this is to ignore the add button
    const addButtonRef = props.addButtonRef;
    return {
      listStyle,
      wrapperStyle,
      options,
      openSelect,
      selectSize,
      selectedSize,
      toggleSelectMenu,
      closeSelectMenu,
      addButtonRef,
    };
  }, [
    props.listStyle,
    props.wrapperStyle,
    props.sizes,
    props.openSelect,
    props.selectedSize,
    props.toggleSelectMenu,
    props.closeSelectMenu,
    props.selectSize,
    props.addButtonRef,
  ]);
  // ref of the element we want to target its outside click
  const selectListRef = useRef(null);
  // calling the custom hook to bind this ref to it
  useOutsideClickDetector(selectListRef, closeSelectMenu, addButtonRef.current);
  return (
    <div className={classes.wrapper} ref={selectListRef} style={wrapperStyle}>
      <div onClick={toggleSelectMenu} className={classes["default-option"]}>
        {selectedSize ? selectedSize.toUpperCase() : "Select Size"}
        <FontAwesomeIcon icon={faChevronDown} className={classes.chevron} />
      </div>
      {openSelect && options && options.length && (
        <div
          className={`${classes["sizes-list-wrapper"]} flex-col gap-8p`}
          style={listStyle}
        >
          <h6>Select Size</h6>
          <div className={`${classes["sizes-list"]} flex-row gap-8p`}>
            {options.map((option, index) => {
              return (
                <span
                  key={index}
                  onClick={() => {
                    if (parseInt(option.split(',')[1]) !== 0) selectSize(option.split(',')[0]);
                  }}
                  className={
                    (parseInt(option.split(',')[1]) === 0)
                      ? `${classes.size} ${classes.disabled}`
                      : `${
                          option.split(',')[0] === selectedSize
                            ? `${classes.size} ${classes.selected}`
                            : classes.size
                        }`
                  }
                >
                  {option.split(',')[0].toUpperCase()}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
export default SelectSize;
