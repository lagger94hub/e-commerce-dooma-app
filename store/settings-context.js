import { createContext, useCallback, useState, useMemo } from "react";
const SettingsContext = createContext({
  siteSettings: [],
  putSettings: () => {},
});
const SettingsContextProvider = (props) => {
  const [siteSettings, setSiteSettings] = useState(null);

  const putSettings = useCallback((siteSettings) => {
    setSiteSettings(siteSettings);
  }, [])

  // this will return contextValue object that we want to send to consumers
  const contextValue = useMemo(() => {
    return { siteSettings, putSettings }
  }, [siteSettings, putSettings])
  return (
    // passing an inline object directly to value is bad practice because every time the context is rendered the object will be different and this will cause all the subscribed components to re-render this is why we usedMemo to save the object data and the object will be the same and the re-rendering will happen only if the data of the object changes
    <SettingsContext.Provider
      value={contextValue}
    >
      {props.children}
    </SettingsContext.Provider>
  );
};

export default SettingsContextProvider;
export { SettingsContext };
