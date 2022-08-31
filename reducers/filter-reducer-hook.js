import { useReducer } from "react";

const reducer = (state, action) => {
  const appliedFiltersModifier = (state, boxName, itemName, type) => {
    let queryKey = state.appliedFilters[boxName]
    if (!queryKey && type) {
    // double rendering causing this part to render twice

      return {
        ...state.appliedFilters,
        [boxName]: itemName
      }
    }
    if (Array.isArray(queryKey)) {
      if (queryKey.includes(itemName)) {
        if (queryKey.length - 1 === 0) {
          let ob = state.appliedFilters
          delete ob[`${boxName}`]
          return ob
        }
  
        return {
          ...state.appliedFilters,
          [boxName]: queryKey.filter((arrItem) => arrItem !== itemName)
        }
      }
  
      return {
        ...state.appliedFilters,
        [boxName]: [...queryKey, itemName]
      }
    }
    
  }
  switch (action.type) {
    case "toggle-box": {
      return {
        ...state,
        boxes: state.boxes.map((box, index) => {
          if (index === action.boxIndex) return { ...box, open: !box.open };
          return { ...box, open: false };
        }),
      };
    }
    case "select-item": {
      return {
        ...state,
        boxes: state.boxes.map((box, boxIn) => {
          if (boxIn !== action.boxIndex) return box;
          return {
            ...box,
            items: box.items.map((item, itemIn) => {
              // if sorting box
              if (boxIn === state.boxes.length - 1) {
                if (itemIn !== action.itemIndex) {
                  return {
                    ...item,
                    checked: false,
                  };
                } else {
                  return {
                    ...item,
                    checked: !item.checked,
                  };
                }
              }
              if (itemIn !== action.itemIndex) return item;
              return {
                ...item,
                checked: !item.checked,
              };
            }),
          };
        }),
        appliedFilters: appliedFiltersModifier(state, action.name, action.itemName, action.type)
      };
    }
    // case 'calibrate': {
    //   return {
    //     ...state,
    //     boxes: state.boxes.map((box, index) => {
    //       return {...box, }
    //     })
    //   }
    // }
  }
};

const useFilterReducer = (initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, dispatch];
};
export default useFilterReducer;
