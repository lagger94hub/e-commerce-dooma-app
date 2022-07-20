import Link from "next/link";

import Logo from "../logo/Logo";
import classes from "./_header.module.scss";
import Nav from "../nav/Nav";

const Header = () => {
  return (
    <header className={`${"flex-row fjust-between falign-center"} ${classes.header}`}>
      <Link href="/">
        <a>
          <Logo
            src={"/images/site/logo-dark.png"}
            alt={"site logo"}
            height={200}
            width={200}
            className={"logo"}
          />
        </a>
      </Link>

      <Nav />

    </header>
  );
};
export default Header;
