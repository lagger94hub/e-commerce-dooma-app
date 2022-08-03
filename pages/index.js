import { useContext, useEffect } from "react";
import { NavCategoriesContext } from "../store/nav-categories-context";
import { SettingsContext } from "../store/settings-context";

import getProps from "../back-end/PropsGetters/home-page";
import Showcase from "../components/home-page/showcase/Showcase";
import ElementWrapper from "../components/layout/element-wrapper/ElementWrapper";
import Display0 from "../components/home-page/display-0/Display0";
import Display1 from "../components/home-page/display-1/Display1";
import Display2 from "../components/home-page/display-2/Display2";
import Display3 from "../components/home-page/display-3/Display3";

export default function Home(props) {
  
  const putNavCategories = useContext(NavCategoriesContext).putNavCategories;
  const putSettings = useContext(SettingsContext).putSettings

  
  // get categories
  const navCategories = props.navCategories

  // get settings
  const siteSettings = props.siteSettings

  // dispaly0 data
  const display0_dataArray = props.display0;

  // dispaly1 data
  const display1_dataArray = props.display1;

  // dispaly2 data
  const display2_dataArray = props.display2;

  // dispaly3 data
  const display3_dataArray = props.display3;

  // showcase photos array
  const showcasePhotos = siteSettings && siteSettings.filter((setting) => {
    return setting.component_id === 2
  })


  useEffect(() => {
    if (navCategories) putNavCategories(navCategories);
    if (siteSettings) putSettings(siteSettings)
  }, [putNavCategories, putSettings, siteSettings, navCategories]);

  return (
    <>
      {/* showcase */}
      <ElementWrapper>
        <Showcase imagesUrlArray={showcasePhotos}/>
      </ElementWrapper>

      {/* display 0 */}
      <ElementWrapper>
        <Display0 width={400} height={500} dataArray={display0_dataArray} />
      </ElementWrapper>

      {/* display 1 */}
      <ElementWrapper>
        <Display1 width={300} height={400} dataArray={display1_dataArray}/>
      </ElementWrapper>

      {/* display 2 */}
      <ElementWrapper>
        <Display2 width={300} height={950} dataArray={display2_dataArray} />
      </ElementWrapper>

      {/* display 3 */}
      <ElementWrapper>
        <Display3 width={100} height={100} dataArray={display3_dataArray} />
      </ElementWrapper>
    </>
  );
}

export async function getStaticProps() {
  try {
    // get main page props and categories
    const props = await getProps();
    return {
      props,
    };
  } catch (e) {
    console.log(e.message);
    return {
      notFound: true,
    };
  }
}
