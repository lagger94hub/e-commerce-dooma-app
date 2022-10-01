import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import classes from "./_accordion.module.scss";
import { useCallback, useState } from "react";
import { toFriendlyName } from "../../../utils/user-friendly-content";
const Accordion = (props) => {
  const dataArr = props.dataArr;
  const [tab, setTab] = useState(null)
  const openTab = useCallback((tabIndex) => {
    if (tab === tabIndex) return setTab(null)
    setTab(tabIndex)
  }, [setTab, tab])

  return (
    <div className={`flex-col gap-16p ${classes.wrapper}`}>
      {dataArr.length ? (
        dataArr.map((item, index) => {
          return (
            <div className={`flex-col gap-8p ${classes.tab}`} key={index}>
              <div className={`flex-row fjust-between ${classes.title}`} onClick={() => openTab(index)}>
                <span>{item.title}</span>
                <span>
                  <FontAwesomeIcon icon={tab === index ? faChevronUp : faChevronDown} />
                </span>
              </div>
              {tab === index && item.body && item.array && 
                <ul className={`flex-col gap-8p ${classes.body}`}>
                  {item.body.map((subItem, index) => {
                    return (
                      <li key={`sub-${index}`}>
                        <span>{toFriendlyName(subItem.fabric_name)}&nbsp;</span><span>{subItem.percentage}%</span>
                      </li>
                    )
                  })}
                </ul>
              }
              {tab === index && item.body && !item.array && 
                <p className={classes.body}>{item.body}</p>
              }
            </div>
          );
        })
      ) : (
        <p>----</p>
      )}
    </div>
  );
};
export default Accordion;
