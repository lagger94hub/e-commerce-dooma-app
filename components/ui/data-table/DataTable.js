import Image from "next/image";
import Link from "next/link";
import Button from "../../ui/buttons/Button";
import classes from "./_data-table.module.scss";
const DataTable = (props) => {
  // array of columns titles
  const title = props.title;
  const columnsTitles = props.columnsTitles;
  const rows = props.rows;
  const clickHandler = props.clickHandler;
  const selectChangeHandler = props.selectChangeHandler;
  return (
    <table className={`${classes["table-body"]}`}>
      <thead>
        <tr>
          {columnsTitles &&
            columnsTitles.map((title, index) => {
              return <th key={index}>{title}</th>;
            })}
        </tr>
      </thead>
      <tbody>
        {rows &&
          rows.length !== 0 &&
          rows.map((row, index) => {
            return (
              <tr key={`row-${row.id}`}>
                {Object.keys(row).map((key, keyIndex) => {
                  if (key === "id") return;
                  if (key === "img")
                    return (
                      <td
                        className={classes["td-image"]}
                        key={`row-${index}-value-${keyIndex}`}
                      >
                        <Link href={row[key].linkURL}>
                          <a>
                            <Image
                              src={row[key].imgURL}
                              alt="thumbnail"
                              height={600}
                              width={600}
                            ></Image>
                          </a>
                        </Link>
                      </td>
                    );
                  if (key === "selectBox") {
                    return (
                      <td key={`row-${index}-value-${keyIndex}`}>
                        <select
                          defaultValue={row[key].default}
                          onChange={(e) => selectChangeHandler(e, row.id)}
                        >
                          {row[key].values.map((value, index) => {
                            return (
                              <option
                                key={`selectBox-option-${index}`}
                                value={value}
                              >
                                {`${value} ${row[key].optionTitle}`}
                              </option>
                            );
                          })}
                        </select>
                      </td>
                    );
                  }
                  if (key === "button")
                    return (
                      <td key={`row-${index}-value-${keyIndex}`}>
                        <Button
                          title={row[key].title}
                          onClick={() => clickHandler(row.id)}
                          styles={["default", "dark"]}
                        />
                      </td>
                    );
                  if (key === "price") {
                    return (
                      <td key={`row-${index}-value-${keyIndex}`}>
                        <div className="flex-col gap-8p">
                          {row[key].discountRate !== 0 ? (
                           <>
                            <span className={classes.strike}><s><i>{row[key].originalPrice} TL</i></s></span>
                            <span>
                              {row[key].originalPrice -
                                (row[key].originalPrice *
                                  row[key].discountRate) /
                                  100}{" "}
                              TL -{" "}
                            </span>
                            <span>
                              <span className={classes.discount}>
                                {row[key].discountRate}%
                              </span>{" "}
                              discount
                            </span>
                           </>
                          ) : (
                            <span>{row[key].originalPrice} TL</span>
                          )}
                        </div>
                      </td>
                    );
                  }
                  return (
                    <td key={`row-${index}-value-${keyIndex}`}>{row[key]}</td>
                  );
                })}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};
export default DataTable;
