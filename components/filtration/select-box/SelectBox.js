import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import classes from "./_select-box.module.scss";
const SelectBox = (props) => {
  const check = props.check;
  const disptach = props.dispatch;
  const { name, items, open } = props.data;
  const boxIndex = props.boxIndex;

  const toggleBox = () => {
    disptach({ type: "toggle-box", boxIndex });
  };

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
              <li key={index} className={`flex-row fjust-start gap-8p`}>
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
