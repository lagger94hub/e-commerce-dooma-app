import { useContext, useEffect } from "react";
import getProps from "../back-end/PropsGetters/home-page";
import HomeCarousel from "../components/carousels/home-page-carousel/HomeCarousel";
import Showcase from "../components/home-page/showcase/Showcase";
import { CategoriesContext } from "../store/categories-context";
import { SettingsContext } from "../store/settings-context";

export default function Home(props) {
  
  const putCategoreis = useContext(CategoriesContext).putCategories;
  const putSettings = useContext(SettingsContext).putSettings

  
  // get categories
  const categories = props.categories

  // get settings
  const siteSettings = props.siteSettings

  // first carousal data
  const dataArray = props.carousal0;

  // showcase photos array
  const showcasePhotos = siteSettings && siteSettings.filter((setting) => {
    return setting.component_id === 2
  })


  useEffect(() => {
    if (categories) putCategoreis(categories);
    if (siteSettings) putSettings(siteSettings)
  }, [putCategoreis, putSettings, siteSettings, categories]);

  return (
    <>
      {/* showcase */}
      <Showcase imagesUrlArray={showcasePhotos}/>
      {/* carousal 0 */}
      <HomeCarousel width={400} height={500} dataArray={dataArray} />
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
