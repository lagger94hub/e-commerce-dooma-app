import AppliedFilters from "./applied-filters/AppliedFilters";
import SelectBox from "./select-box/SelectBox";
import classes from "./_filter.module.scss";



const Filter = (props) => {
  
  // filter reducer state and dispatch
  const filter = props.filter
  const dispatch = props.dispatch

  return (
    <section className={`flex-col fjust-center gap-48p ${classes.wrapper}`}>
      <div className={`flex-row fjust-between ${classes.filter}`}>
        <ul className={`flex-row fjust-start gap-8p`}>
          {filter.boxes.map((boxData, index) => {
            if (index === filter.boxes.length - 1)
              return
              
            return (
              <li key={index}>
                <SelectBox
                  data={boxData}
                  boxIndex={index}
                  check="square"
                  dispatch={dispatch}
                />
              </li>
            );
          })}
        </ul>
        <SelectBox
          data={filter.boxes[filter.boxes.length - 1]}
          check="circle"
          dispatch={dispatch}
          boxIndex={filter.boxes.length - 1}
        />
      </div>
      <AppliedFilters appliedFilters={filter.appliedFilters} />
    </section>
  );
};
export default Filter;
