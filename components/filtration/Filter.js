import FilterReducerHook from "../../reducers/filter-reducer-hook";
import AppliedFilters from "./applied-filters/AppliedFilters";
import SelectBox from "./select-box/SelectBox";
import classes from "./_filter.module.scss";

const initialState = {
  boxes: [
    {
      name: "Color",
      open: false,
      items: [
        { name: "Blue", quantity: 3, checked: true },
        { name: "Blue", quantity: 1, checked: true },
        { name: "Blue", quantity: 3, checked: false },
        { name: "Blue", quantity: 1, checked: false },
        { name: "Blue", quantity: 3, checked: false },
        { name: "Blue", quantity: 1, checked: false },
      ],
    },
    {
      name: "Price",
      open: false,
      items: [
        { name: "100TL-200TL", quantity: 2, checked: false },
        { name: "200TL-300TL", quantity: 3, checked: false },
      ],
    },
    {
      name: "Fit",
      open: false,
      items: [
        { name: "Skinny", quantity: 10, checked: false },
        { name: "Regular", quantity: 23, checked: false },
      ],
    },
    {
      name: "Sort By",
      open: false,
      items: [
        { name: "Featured", checked: true },
        { name: "Price(High to Low)", checked: false },
        { name: "Price(Low to High)", checked: false },
        { name: "Discount Rate", checked: false },
      ],
    },
  ],

  appliedFilters: ["Skinny", "100TL-200TL", "Blue"],
};

const Filter = (props) => {
  const [state, dispatch] = FilterReducerHook(initialState);
  return (
    <section className={`flex-col fjust-center gap-48p ${classes.wrapper}`}>
      <div className={`flex-row fjust-between ${classes.filter}`}>
        <ul className={`flex-row fjust-start gap-8p`}>
          {state.boxes.map((boxData, index) => {
            if (index === state.boxes.length - 1)
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
          data={state.boxes[state.boxes.length - 1]}
          check="circle"
          dispatch={dispatch}
          boxIndex={state.boxes.length - 1}
        />
      </div>
      <AppliedFilters appliedFilters={state.appliedFilters} />
    </section>
  );
};
export default Filter;
