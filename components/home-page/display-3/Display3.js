import Image from "next/legacy/image";
import Link from "next/link";
import classes from "./_display-3.module.scss";
import React, { useState, useRef, useCallback } from "react";
import Button from "../../ui/buttons/Button";
const Display3 = (props) => {
  const width = props.width;
  const height = props.height;
  const dataArray = props.dataArray;

  const initilizeParents = useCallback((dataArray) => {
    let parents = {};
    for (var category of dataArray) {
      let parent = category.item_path.split("/")[2];
      if (!parents[parent]) parents[parent] = true;
    }
    return parents;
  }, [])
  
  const parentsObj = useRef(initilizeParents(dataArray));
  let randomParent = dataArray[0].item_path.split("/")[2];

  const [selectedCategory, setSelectedCategory] = useState(randomParent);

  const selectCategory = useCallback((category) => {
    setSelectedCategory(category);
  }, [])

  return (
    <div
      className={`${classes.wrapper} flex-col gap-32p fjust-center falign-center`}
    >
      <p className={classes.title}>{dataArray[0].display_name}</p>
      <div className={`${classes.featured}`}>
        {dataArray.map((data, index) => {
          let parent = data.item_path.split("/")[2];
          return (
            <React.Fragment key={data.item_id}>
              {selectedCategory === parent && (
                <Link href={`${data.item_path}`} key={data.item_id} className={`${
                  classes[`category-${index % 4}`]
                } flex-col falign-center fjust-center`}>
                    <Image
                      src={data.url}
                      alt={data.item_name}
                      width={width}
                      height={height}
                    />
                    <p>{data.item_name}</p>
                </Link>
              )}

              {index === 0 && (
                <div
                  className={`${classes.control} flex-row falign-center fjust-center gap-8p`}
                >
                  {Object.keys(parentsObj.current).map((parent, index) => {
                    return (
                      <Button
                        onClick={() => {
                          selectCategory(parent);
                        }}
                        key={index}
                        title={parent}
                        styles={['default', 'dark']}
                      />
                    );
                  })}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
export default Display3;
