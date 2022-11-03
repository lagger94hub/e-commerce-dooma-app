/* eslint-disable react/display-name */
import Link from "next/link";
import classes from "./_button.module.scss";
import React from "react";
const Button = React.forwardRef((props, ref) => {
  const title = props.title;
    const clickHandler = props.onClick;
    const className =
      props.styles && props.styles.map((style) => classes[style]).join(" ");
    const to = props.to;

  return to ? (
    // link button
    <Link href={to} className={classes.to}>
      <button className={className}>{title}</button>
    </Link>
  ) : (
    // normal button
    <button className={className} onClick={clickHandler} ref={ref}>
      {title}
    </button>
  );
});
export default Button;
