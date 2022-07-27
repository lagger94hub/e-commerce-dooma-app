import { createContext, useState } from "react";
const SettingsContext = createContext({
  siteSettings: [],
  putSettings: () => {},
});
const SettingsContextProvider = (props) => {
  const [siteSettings, setSiteSettings] = useState(null);
  const putSettings = (siteSettings) => {
    setSiteSettings(siteSettings);
  };
  return (
    <SettingsContext.Provider
      value={{
        siteSettings,
        putSettings,
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
};

export default SettingsContextProvider;
export { SettingsContext };
