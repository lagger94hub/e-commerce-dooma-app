import classes from "./_root-path.module.scss";
import React from "react";
import Link from "next/link";
const RootPath = (props) => {

  const pathsToRoot = props.pathsToRoot;

  return (
    <div className={`${classes.path} flex-row gap-16p`}>
      <Link href={'/'}>
        Homepage |
      </Link>
      {pathsToRoot &&
        pathsToRoot.map((path, index) => {
          return (
            <Link href={path.path_to_root} key={index}>
              {index === pathsToRoot.length - 1 
              ? 
              <a className={classes.active}>{path.name}</a>
              :
              <a>{path.name} |</a>
              }
            </Link>
          );
        })}
    </div>
  );
};
export default RootPath;
