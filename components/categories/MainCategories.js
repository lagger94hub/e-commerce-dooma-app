import Link from "next/link";
import classes from "./_main-categories.module.scss";
import DataCard from "../ui/data-cards/DataCard";

const MainCategories = (props) => {
  const dataArray = props.dataArray;
  return (
    <section
      className={`${
        classes.categories
      } ${"flex-col gap-20p fjust-center falign-center"}`}
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
                    width={375}
                    height={475}
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
export default MainCategories;
