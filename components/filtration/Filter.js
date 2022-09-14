import { faClose, faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useContext, useEffect, useState } from "react";

import AppliedFilters from "./applied-filters/AppliedFilters";
import SelectBox from "./select-box/SelectBox";
import classes from "./_filter.module.scss";
import { MediaQueryContext } from "../../store/media-query-context";

const Filter = (props) => {
  // filter reducer state and dispatch
  const filter = props.filter;
  const dispatch = props.dispatch;

  // check if desktop screen to render different filter versions
  const isDesktop = useContext(MediaQueryContext);

  const [filterMenu, setFilterMenu] = useState(isDesktop);
  const showFilterMenu = useCallback(() => {
    setFilterMenu(true);
  }, []);
  const hideFilterMenu = useCallback(() => {
    console.log('hide')
    setFilterMenu(false);
  }, []);
  useEffect(() => {
    setFilterMenu(isDesktop)
  }, [isDesktop, setFilterMenu])

  return (
    <section className={`flex-col gap-16p ${classes.section}`}>
      {filterMenu && (
        <div className={`flex-col fjust-center gap-32p ${classes.wrapper}`}>
          <div className={classes.filter}>
            {!isDesktop && (
              <FontAwesomeIcon
                icon={faClose}
                className={classes.close}
                onClick={hideFilterMenu}
              />
            )}
            {!isDesktop && <h3>Filter</h3>}
            <ul className={`flex-row fjust-start gap-8p`}>
              {filter.boxes.map((boxData, index) => {
                if (index === filter.boxes.length - 1) return;

                return (
                  <li key={index}>
                    <SelectBox
                      data={boxData}
                      boxIndex={index}
                      shape="square"
                      dispatch={dispatch}
                      isDesktop={isDesktop}
                      hideFilterMenu={hideFilterMenu}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
      <div className={`flex-row gap-16p ${classes["sort-wrapper"]}`}>
        {isDesktop && (
          <div className={classes.sort}>
            <SelectBox
              data={filter.boxes[filter.boxes.length - 1]}
              shape="circle"
              dispatch={dispatch}
              boxIndex={filter.boxes.length - 1}
              isDesktop={isDesktop}
              hideFilterMenu={hideFilterMenu}
            />
            <p>({filter.productsCount}) products</p>
          </div>
        )}
        {!isDesktop && (
          <div className={`flex-row gap-8p`} onClick={showFilterMenu}>
            <FontAwesomeIcon icon={faFilter} className={classes.close} />
            <p>Filter</p>
          </div>
        )}
        {!isDesktop && (
          <div className={`flex-row gap-8p`}>
            <SelectBox
              data={filter.boxes[filter.boxes.length - 1]}
              shape="circle"
              dispatch={dispatch}
              boxIndex={filter.boxes.length - 1}
              isDesktop={true}
              iconed={true}
              hideFilterMenu={hideFilterMenu}
            />
          </div>
        )}
      </div>
      <AppliedFilters
        appliedFilters={filter.appliedFilters}
        showRemoveAll={true}
        dispatch={dispatch}
      />
    </section>
  );
};
export default Filter;
