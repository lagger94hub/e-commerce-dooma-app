import classes from "./_applied-filters.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const AppliedFilters = (props) => {
  const appliedFilters = props.appliedFilters;
  return (
    <ul className={`flex-row gap-16p ${classes.applied}`}>
      {appliedFilters &&
        appliedFilters.map((filter, index) => {
          return (
            <li key={index} className={`flex-row gap-8p fjust-between`}>
              <span>{filter}</span>
              <span>
                <FontAwesomeIcon icon={faXmark} />
              </span>
            </li>
          );
        })}
      <li>
        <span>Remove All</span>
      </li>
    </ul>
  );
};
export default AppliedFilters;
