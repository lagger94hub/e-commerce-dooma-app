import { useReducer } from "react"

const reducer = (state, action) => {
  switch(action.type) {
    case 'toggle-box': {
      return {
        ...state,
        boxes: state.boxes.map((box, index) => {
          if (index === action.boxIndex)
            return {...box, open: !box.open}
          return {...box, open: false}
        }) 
      }
    }
  }
}

const FilterReducerHook = (initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return [state, dispatch]
}
export default  FilterReducerHook