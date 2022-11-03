import Link from "next/link";
import { useContext, useMemo } from "react";
import Logo from "../logo/Logo";
import classes from './_header.module.scss'
import { SettingsContext } from "../../../store/settings-context";

const Header = (props) => {
  // to change the header section width if it is used in an admin page
  const mode = props.mode
  const siteSettings = useContext(SettingsContext).siteSettings;

  // filtering header settings of all settings
  const headerSettings = useMemo(() => {
    if (!siteSettings) return
    return siteSettings.filter((setting) => {
      return setting.component_id === 0;
    })
  }, [siteSettings])
    

  // bring the setting of the logo from the header settings
  const logoSetting = useMemo(() => {
    if (!headerSettings) return
    return headerSettings.find((headerSetting) => {
      return headerSetting.setting_key === "logoPath";
    });
  }, [headerSettings])

  return (
    <header
      className={`${"flex-row fjust-between falign-center"} ${classes[`header-${mode}`]}`}
    >
      <Link href="/">
          <Logo
            src={logoSetting && logoSetting.setting_value}
            alt={"site logo"}
            height={200}
            width={200}
            className={"logo"}
          />
      </Link>

      {props.children}
    </header>
  );
};
export default Header;
