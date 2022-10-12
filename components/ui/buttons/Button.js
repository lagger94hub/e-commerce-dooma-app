import Link from "next/link";
import classes from "./_button.module.scss";
const Button = (props) => {
  const title = props.title;
  const clickHandler = props.onClick;
  const className =
    props.styles && props.styles.map((style) => classes[style]).join(" ");
  const to = props.to;
  return to ? (
    // link button
    <Link href={to}>
      <button className={className}>
        {title}
      </button>
    </Link>
  ) : (
    // normal button
    <button className={className} onClick={clickHandler}>
      {title}
    </button>
  );
};
export default Button;
