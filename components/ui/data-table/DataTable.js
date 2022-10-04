const DataTable = (props) => {
  // array of columns titles
  const rowsCount = props.rowsCount
  const clickables = props.clickables
  const selectables = props.selectables
  const customStyled = props.customStyled
  const columnsTitles = props.columnsTitles
  const rows = props.rows
  return (
    <table>
      <tr>
        {columnsTitles && columnsTitles.map((title, index) => {
          return (
            <th key={index}>{title}</th>
          )
        })}
      </tr>
      {rows && rows.map((row, index) => {
        return (
          <tr key={`row-${index}`}>
            {Object.values(row).map((value, valueIndex) => {
              return (
                <td key={`row-${index}-value-${valueIndex}`}>{value}</td>
              )
            })}
          </tr>
        )
      })}

    </table>
  )
}
export default DataTable