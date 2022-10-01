const SelectSize = (props) => {
  const options = props.sizes
  return (
    <select>
      <option defaultValue={true}>Select Size</option>
      {options.length && options.map((option, index) => {
        return (<option key={index}>{option}</option>)
      })}
    </select>
  )
}
export default SelectSize