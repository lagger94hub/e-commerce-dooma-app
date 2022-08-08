import { useContext, useEffect } from "react";

import Display0 from "../components/home-page/display-0/Display0";
import Display1 from "../components/home-page/display-1/Display1";
import Display2 from "../components/home-page/display-2/Display2";
import Display3 from "../components/home-page/display-3/Display3";
import Showcase from "../components/home-page/showcase/Showcase";
import SectionWrapper from "../components/layout/element-wrapper/SectionWrapper";

import { NavCategoriesContext } from "../store/nav-categories-context";
import { SettingsContext } from "../store/settings-context";

import getProps from "../back-end/PropsGetters/SSG/home-page";
import { logError, FRIENDLY_ERROR_500 } from '../back-end/utils/errorsLib'

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


  // update the store 
  useEffect(() => {
    if (navCategories) putNavCategories(navCategories);
    if (siteSettings) putSettings(siteSettings)
  }, [putNavCategories, putSettings, siteSettings, navCategories]);

  return (
    <>
      {/* showcase */}
      <SectionWrapper>
        <Showcase imagesUrlArray={showcasePhotos}/>
      </SectionWrapper>

      {/* display 0 */}
      <SectionWrapper>
        <Display0 width={400} height={500} dataArray={display0_dataArray} />
      </SectionWrapper>

      {/* display 1 */}
      <SectionWrapper>
        <Display1 width={300} height={400} dataArray={display1_dataArray}/>
      </SectionWrapper>

      {/* display 2 */}
      <SectionWrapper>
        <Display2 width={300} height={950} dataArray={display2_dataArray} />
      </SectionWrapper>

      {/* display 3 */}
      <SectionWrapper>
        <Display3 width={100} height={100} dataArray={display3_dataArray} />
      </SectionWrapper>
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
    logError('getStaticProps', e.message)
    throw new Error(FRIENDLY_ERROR_500)
  }
}
