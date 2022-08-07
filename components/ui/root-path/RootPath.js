import classes from "./_root-path.module.scss";
import React from "react";
import Link from "next/link";
const RootPath = (props) => {

  const paramsArr = props.paramsArr;
  let path = '/categories'

  return (
    <section className={classes.path}>
      {paramsArr &&
        paramsArr.map((pathSegment, index) => {
          let subSegments;
          path += '/' + pathSegment
          if (index === paramsArr.length - 1) {
            subSegments = pathSegment.split("-");
            subSegments.pop();
          }
          return (
            <React.Fragment key={index}>
              {index === paramsArr.length - 1 ? (
                <Link href={path}>
                  <a>{subSegments.join(" ")}</a>
                </Link>
              ) : (
                <Link href={path}>
                  <a>{pathSegment} | </a>
                </Link>
              )}
            </React.Fragment>
          );
        })}
    </section>
  );
};
export default RootPath;
