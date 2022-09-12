import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { toFriendlyBoxItemName } from "../../../utils/user-friendly-content";
import classes from "./_applied-filters.module.scss";

const AppliedFilters = (props) => {
  // const appliedFilters = props.appliedFilters;
  const appliedFilters = props.appliedFilters;
  const showRemoveAll = props.showRemoveAll;
  const dispatch = props.dispatch

  // if the applied filters is an array then the boxName would be numbers, and the removeOne function would fail, so we send the array name as an alternative(alt) to boxName
  const alt = props.alt


  // remove filters when x is pressed
  const removeOne = (itemName, boxName) => {
    dispatch({ type: "remove-one", itemName, boxName, first: true})
  }
  const removeAll = () => {
    dispatch({ type: 'remove-all' })
  }
  return (
    <ul className={`flex-row gap-16p ${classes.applied}`}>
      {appliedFilters &&
        Object.keys(appliedFilters).map((boxName, index) => {
          return (
            <li key={index} className={`flex-row gap-8p fjust-between`}>
              {boxName !== "categories" && (
                <>
                  {Array.isArray(appliedFilters[boxName]) ? (
                    <AppliedFilters
                      appliedFilters={appliedFilters[boxName]}
                      showRemoveAll={false}
                      dispatch={dispatch}
                      alt={boxName}
                    />
                  ) : (
                    <>
                      <span>{toFriendlyBoxItemName(boxName, appliedFilters[boxName])}</span>
                      <span>
                        <FontAwesomeIcon icon={faXmark} onClick={() => removeOne(appliedFilters[boxName], alt ? alt : boxName)} />
                      </span>
                    </>
                  )}
                </>
              )}
            </li>
          );
        })}
      {showRemoveAll && Object.keys(appliedFilters).length > 1 && (
        <li className={`flex-row gap-8p fjust-between`} onClick={removeAll}>
          <span className={classes.remove}>Remove All</span>
          <span>
            <FontAwesomeIcon icon={faXmark}/>
          </span>
        </li>
      )}
    </ul>
  );
};
export default AppliedFilters;
