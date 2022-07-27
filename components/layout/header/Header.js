import Link from "next/link";
import { useContext } from "react";

import Logo from "../logo/Logo";
import classes from "./_header.module.scss";
import Nav from "../nav/Nav";
import { SettingsContext } from "../../../store/settings-context";

const Header = () => {
  const siteSettings = useContext(SettingsContext).siteSettings;

  // filtering header settings of all settings
  const headerSettings =
    siteSettings &&
    siteSettings.filter((setting) => {
      return setting.component_id === 0;
    });

  // bring the setting of the logo from the header settings
  const logoSetting =
    headerSettings &&
    headerSettings.find((headerSetting) => {
      return headerSetting.setting_key === "logoPath";
    });

  return (
    <header
      className={`${"flex-row fjust-between falign-center"} ${classes.header}`}
    >
      <Link href="/">
        <a>
          <Logo
            src={logoSetting && logoSetting.setting_value}
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
