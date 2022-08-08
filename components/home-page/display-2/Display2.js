import Image from "next/image";
import Link from "next/link";
import React from "react";
import classes from "./_display-2.module.scss";
const Display2 = (props) => {
  const width = props.width;
  const height = props.height;
  const dataArray = props.dataArray;

  return (
    <div
      className={`${classes.wrapper} flex-col gap-32p fjust-center falign-center`}
    >
      <p className={classes.title}>{dataArray[0].display_name}</p>
      <div
        className={`${classes.collections} flex-row fjust-center falign-center`}
      >
        {dataArray.map((data, index) => {
          return (
            <React.Fragment key={data.item_id}>
              <div
                style={{ order: data.item_order ? data.item_order : null }}
                className={`${
                  classes[`collection-${data.item_order}`]
                } flex-col falign-center fjust-center`}
              >
                {/* {!(data.item_order === 1) && (
                  <div className={classes[`bar-${index}`]}></div>
                )} */}
                <Link href={`${data.item_path}`} >
                  <a 
                  className={classes[`name-${data.item_order}`]}
                  >
                    {data.item_name}
                  </a>
                </Link>

                <Link href={`${data.item_path}`}>
                  <a className={classes.img}>
                    <Image
                      src={data.url}
                      alt={data.item_name}
                      width={width}
                      height={height - data.item_order * 100}
                    />
                  </a>
                </Link>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
export default Display2;
