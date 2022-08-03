import Link from "next/link";
import classes from "./_display-1.module.scss";
import DataCard from "../../ui/data-cards/DataCard";

const Display1 = (props) => {
  const dataArray = props.dataArray;
  const width = props.width
  const height = props.height
  
  return (
    <section
      className={`${
        classes.categories
      } ${"flex-col gap-32p fjust-center falign-center"}`}
    >
      <p className={classes.title}>{dataArray[0].display_name}</p>
      <ul className={`${"flex-row gap-48p fjust-center"}`}>
        {dataArray &&
          dataArray.map((data) => {
            return (
              <li
                className={
                  data.item_order && data.item_order % 2 === 0 ? classes.lower : ""
                }
                key={data.item_id}
                style={{ order: data.item_order ? data.item_order : 0 }}
              >
                <Link href={`${data.item_path}`} passHref>
                  <DataCard
                    itemName={data.item_name}
                    itemPhotoURL={data.url}
                    width={width}
                    height={height}
                    bordered={true}
                  />
                </Link>
              </li>
            );
          })}
      </ul>
    </section>
  );
};
export default Display1;
